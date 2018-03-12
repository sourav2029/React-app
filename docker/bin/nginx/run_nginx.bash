#!/bin/bash

2>&1
exec nginx -c $EP_CONFIG_DIRECTORY/nginx/nginx.conf
