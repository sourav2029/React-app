#!/bin/bash

2>&1

# Detemplatising configs
MUSTACHE_UTIL=/opt/inmobi/commons/mustache-util/render-template
DATA_FILE=$EP_DATA_DIRECTORY/ep_settings.yaml

YAML_DATA_SECTION="default $IDP_ENVIRONMENT.$IDP_CLUSTER"
echo "Generating configs using data file: ${DATA_FILE} and yaml data sections: ${YAML_DATA_SECTION}"

# Turning on globstar. This will enable no directory and recursive directory matching for **
shopt -s globstar

failures=false
# For more info regarding config generation, refer to https://github.corp.inmobi.com/platform-pe/mustache-util
for FILE in ${EP_TEMPLATES_DIRECTORY}/**/*.mustache
do
    # Generating the output file location by removing ${EP_TEMPLATES_DIRECTORY} and '.mustache' and moving to $EP_CONFIG_DIRECTORY
    # while keeping the inner directory structures intact
    TEMP=${FILE/"$EP_TEMPLATES_DIRECTORY"}
    OUTPUT_FILE="$EP_CONFIG_DIRECTORY"${TEMP/'.mustache'}

    echo "Generating $OUTPUT_FILE (from ${FILE})";

    # Creating output directories
    mkdir -p `dirname $OUTPUT_FILE`

    # Merging templates with the yaml data file and environment variables
    $MUSTACHE_UTIL --template $FILE --data $DATA_FILE --yaml_data_section $YAML_DATA_SECTION --output $OUTPUT_FILE --addenvvars=True

    # Merging templates with environment variables again so as to enable 2-step replacements
    $MUSTACHE_UTIL --template $OUTPUT_FILE --output $OUTPUT_FILE --addenvvars=True

    # Setting owner of configs files to nobody
    chown nobody:nogroup $OUTPUT_FILE

    # Checking for errors
    if [ "$?" != 0 ]
    then
        failures=true
    fi
done

# Exiting if there are any detemplatisation errors
if [ "$failures" == "true" ]
then
    echo "Exiting as detemplatisation of config files failed."
    exit -1;
else
    echo "Detemplatisation successful".
fi
