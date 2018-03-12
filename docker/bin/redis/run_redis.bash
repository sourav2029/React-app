#!/bin/bash

2>&1
exec redis-server $EP_CONFIG_DIRECTORY/redis/redis.conf
