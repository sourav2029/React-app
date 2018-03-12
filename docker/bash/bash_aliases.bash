#!/bin/bash

# Supervisord aliases
alias supervisorctl='supervisorctl -c /etc/supervisor/supervisord.conf'
alias supervisord='supervisord -c /etc/supervisor/supervisord.conf'

# Fixes 'terminal is not fully functional error while using less'
export TERM=xterm

# This function takes 3 parameters
# $1 : [required] Name of the alias
# $2 : [required, Alias command
# $3 : [required] Alias introduction text
function createAlias {
    alias ${1}="${2}"
    echo "${1} -> ${3}"
}

# Creating useful aliases
echo "Useful shortcuts:"

createAlias logs "cd $EP_LOG_DIRECTORY" "To go to the ep logs directory"
createAlias configs "cd $EP_CONFIG_DIRECTORY" "To go to the ep configs directory"
createAlias bin "cd $EP_BIN_DIRECTORY" "To go to the ep scripts/binaries directory"
createAlias templates "cd $EP_TEMPLATES_DIRECTORY" "To go to the ep config templates directory"
createAlias data "cd $EP_DATA_DIRECTORY" "To go to the ep yaml data directory"
createAlias rawcode "cd $EP_CODE_DIRECTORY" "To go to the ep raw code directory"
createAlias gencode "cd $EP_GEN_CODE_DIRECTORY" "To go to the ep generated code directory"
