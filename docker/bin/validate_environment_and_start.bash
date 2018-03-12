#!/bin/bash

set -e
2>&1

# All validation/manipulation of IDP environment variables must be done in this file and this file alone.

# This function takes 3 parameters
# $1 : [required] Name of the environment variable to check
# $2 : [optional, default false] Whether to exit if the env variable is not set
# $3 : [optional] Custom message for the scenario specified by $2
function checkEnvironmentVariable {
    if [ "${!1}" ];
    then
        echo "Detected $1: ${!1}";
    else
        local error_msg="Environment variable $1 was not set"
        if [ "$2" = true ];
        then
            if [ "$3" ];
            then
                echo "${error_msg}. Exiting... $3";
            else
                echo "${error_msg}. Exiting... ${3}Please rerun the docker run command with -e $1=<Suitable Value>.";
            fi;
            exit -1;
        else
            if [ "$3" ];
            then
                echo "${error_msg}. $3";
            else
                echo "${error_msg}.";
            fi;
        fi;
    fi;
}
# This function takes 2 parameters
# $1 : [required] Name of the environment variable
# $2 : [required] Value to set for environment variable $1 if it is not already set
function setIfNotSet {
    if [ ! "${!1}" ] && [ "$2" ];
    then
        export $1=$2
        echo "Defaulting $1 to ${2}."
    fi;
}

# IDP_ENVIRONMENT is the only mandatory parameter
checkEnvironmentVariable IDP_ENVIRONMENT true

# All other IDP environment variables are also mandatory unless the IDP_ENVIRONMENT is explicitly set to 'non_prod'
if [ "$IDP_ENVIRONMENT" == "non_prod" ];
then
    checkEnvironmentVariable IDP_CLUSTER false
    checkEnvironmentVariable IDP_SERVICE false
    checkEnvironmentVariable IDP_CONTAINER_NAME false

    setIfNotSet IDP_CLUSTER corp
    setIfNotSet IDP_SERVICE exchange-portal
    setIfNotSet IDP_CONTAINER_NAME dummy

else
    checkEnvironmentVariable IDP_CLUSTER true
    checkEnvironmentVariable IDP_SERVICE true
    checkEnvironmentVariable IDP_CONTAINER_NAME true
fi;

# These ports have been hardcoded for now (with handling for the case where they are already set).
# TODO: Enforce strict checking for dynamic ports after completely moving to mesos.
export IDP_CONTAINER_PORT_0=${IDP_CONTAINER_PORT_0:=8201}
export IDP_CONTAINER_PORT_1=${IDP_CONTAINER_PORT_1:=3000}
export IDP_CONTAINER_PORT_2=${IDP_CONTAINER_PORT_2:=6379}
#export IDP_CONTAINER_PORT_3=${IDP_CONTAINER_PORT_3:=8803}

# Externally exposed ports
export NGINX_PORT=${IDP_CONTAINER_PORT_0}
export METEOR_SERVER_PORT=${IDP_CONTAINER_PORT_1}
export REDIS_PORT=${IDP_CONTAINER_PORT_2}
#export SYNAPSE_LENS_PORT=${IDP_CONTAINER_PORT_2}
#export SYNAPSE_IAM_SERVICE_PORT=${IDP_CONTAINER_PORT_3}

export IDP_CONTAINER_CPU_CORES=${IDP_CONTAINER_CPU_CORES:=1}

export METRICS_RECEIVER_HOST="metrics-relay.cas.${IDP_CLUSTER}.inmobi.com"
echo "Setting Metrics Receiver Host to: ${METRICS_RECEIVER_HOST}";

# Assuming that all mounted directories will be empty on initialisation
rm -rf /var/log/supervisor/* /run/* /tmp/*

# Detemplatise configs
$EP_BIN_DIRECTORY/detemplatise.bash

# Nginx Setup
mkdir -p /var/cache/nginx
mkdir -p /var/log/supervisor/nginx
touch /var/log/supervisor/nginx/error.log

# Supervisord Setup
#mkdir -p $CAS_LOG_DIRECTORY/process

# Nerve Setup
#mkdir -p $NERVE_HEARTBEAT_FILE_DIR
#touch $NERVE_HEARTBEAT_FILE_DIR/progress_file

# Synapse Setup
#mkdir -p $SYNAPSE_STATE_FILE_DIR

# Haproxy Setup
mkdir -p /run/haproxy

# Redis Setup
mkdir -p /tmp/redis/db

# Setting ownership of all logs and configs to nobody:nogroup
chown -R nobody:nogroup /var/log/supervisor /tmp

# Starting supervisord
exec /usr/local/bin/supervisord -c /etc/supervisor/supervisord.conf
