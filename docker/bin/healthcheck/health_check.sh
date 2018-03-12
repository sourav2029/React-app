#!/bin/bash

NGINX_PORT=${IDP_CONTAINER_PORT_0:=8201}
REDIS_PORT=${IDP_CONTAINER_PORT_2:=6379}

# EP Validation via nginx
NGINX_EXPECTED_RESPONSES="200 OK"
NGINX_RESPONSE_SUCCESSFUL=`wget --spider --server-response --timeout=1 http://localhost:${NGINX_PORT}/lbstatus 2>&1 | grep -cE "${NGINX_EXPECTED_RESPONSES}"`

# Redis Validation
REDIS_EXPECTED_RESPONSE="PONG"
REDIS_PING_SUCCESSFUL=`redis-cli -h localhost -p ${REDIS_PORT} ping 2>&1 | grep -cE "${REDIS_EXPECTED_RESPONSE}"`

if [ 1 = "$NGINX_RESPONSE_SUCCESSFUL" ] && [ 1 = "$REDIS_PING_SUCCESSFUL" ] ; then
    exit 0
else
    exit 1
fi
