FROM dockerhub.corp.inmobi.com/idp/docker-ubuntu-14.04-phat:20161010_7
MAINTAINER dcp-engg@inmobi.com

# Creating useful aliases
COPY docker/bash/bash_aliases.bash /root/.bash_aliases

# Using a newer version of supervisor for environment variable substitution support in configs and better log handling
RUN pip install supervisor==3.3.1

ENV EP_LOG_DIRECTORY /var/log/supervisor
ENV EP_CONFIG_DIRECTORY /tmp/ep/conf

# Read-only directories
ENV EP_CODE_DIRECTORY /opt/inmobi/ep/code/raw
ENV EP_GEN_CODE_DIRECTORY /opt/inmobi/ep/code
ENV EP_BIN_DIRECTORY /opt/inmobi/ep/bin
ENV EP_TEMPLATES_DIRECTORY /opt/inmobi/ep/templates
ENV EP_DATA_DIRECTORY /opt/inmobi/ep/data

WORKDIR $EP_LOG_DIRECTORY

# Add the official nginx repo to apt-get sources
COPY docker/nginx/nginx_signing.key $EP_CONFIG_DIRECTORY/nginx/nginx_signing.key
RUN echo "deb http://nginx.org/packages/ubuntu/ trusty nginx" >> /etc/apt/sources.list && \
  apt-key add $EP_CONFIG_DIRECTORY/nginx/nginx_signing.key

RUN apt-get update && apt-get -yq install \
  curl \
  build-essential \
  git-all \
  nginx=1.10.3-1~trusty

ENV METEOR_VER=1.4.2.7 \
    NODE_MAJOR_VER=4 \
    REDIS_VER=3.2.8 \
    METEOR_ALLOW_SUPERUSER=true

# Adding the nodesource apt-get repo (for node) and installing node
RUN curl -sL "https://deb.nodesource.com/setup_${NODE_MAJOR_VER}.x" | bash - \
    && apt-get -y install nodejs

# Installing meteor
RUN curl -sL "https://install.meteor.com/?release=${METEOR_VER}"  | bash -

# Installing redis
RUN cd /tmp && wget http://download.redis.io/releases/redis-${REDIS_VER}.tar.gz && \
  tar -xvzf redis-${REDIS_VER}.tar.gz && rm redis-${REDIS_VER}.tar.gz && cd redis-${REDIS_VER} && make && make install

# Supervisord Setup
RUN rm /etc/supervisor/conf.d/sshd.conf
COPY docker/supervisor /etc/supervisor/conf.d

# Scripts
COPY docker/bin $EP_BIN_DIRECTORY
RUN chmod +x -R $EP_BIN_DIRECTORY

# Config templates and yaml data files
COPY docker/templates $EP_TEMPLATES_DIRECTORY
COPY docker/data $EP_DATA_DIRECTORY

# IDP health check
RUN mkdir -p /opt/inmobi/usr/deployment && ln -s $EP_BIN_DIRECTORY/healthcheck/health_check.sh /opt/inmobi/usr/deployment/validate

# Fetch and install npm packages
COPY package.json $EP_CODE_DIRECTORY/
COPY iam-idl-4.0.6.tgz $EP_CODE_DIRECTORY/
RUN cd $EP_CODE_DIRECTORY && meteor npm install

# Copy code
COPY . $EP_CODE_DIRECTORY

# Remove dev-only meteor packages, build the meteor artifact, clean up npm packages which are no longer required and remove meteor
RUN cd $EP_CODE_DIRECTORY && meteor remove hot-code-push && meteor build $EP_GEN_CODE_DIRECTORY --directory --server-only && \
  rm -rf $EP_CODE_DIRECTORY && rm /usr/local/bin/meteor && rm -rf ~/.meteor

# Fetch and install the packages required by the meteor artifact to run
RUN cd $EP_GEN_CODE_DIRECTORY/bundle/programs/server && npm install

# Setting ownership to nobody:nogroup
RUN chown -R nobody:nogroup $EP_BIN_DIRECTORY && \
  chown -R nobody:nogroup $EP_TEMPLATES_DIRECTORY && \
  chown -R nobody:nogroup $EP_DATA_DIRECTORY && \
  chown -R nobody:nogroup $EP_GEN_CODE_DIRECTORY

# Default execution point
CMD ["bash", "-c", "$EP_BIN_DIRECTORY/validate_environment_and_start.bash"]

# TODO
# IDP health checks
# Graceful shutdown
# Supervisord
# Logging
