#!/bin/bash

2>&1

function handleGracefulShutdown {
  echo "Killing Exchange Portal"
  kill ${EP_PID}
#    echo "Disabling lbstatus and waiting 20 seconds for the Load Balancer to stop sending traffic"
#    wget --output-document=/dev/null --quiet --timeout=5 http://localhost:${CAS_PORT}/disablelbstatus
#    # If disablelbstatus fails (for eg: if cas is not up), then the service and all it's dependencies are killed
#    sleep 20
#    echo "Killing Cas and it's dependencies(Dummy Bidder, Haproxy and Synapse)"
#    kill $CAS_PID $DUMMY_BIDDER_PID $HAPROXY_PID $SYNAPSE_PID
#    echo "Waiting 5 more seconds for Scribe to finish"
#    sleep 5
#    echo "Killing Scribe"
#    kill $SCRIBE_PID
#    echo "Killing Flume"
#    . ${CAS_BIN_DIRECTORY}/flume/stop_flume.bash
#    echo "Waiting 5 more seconds for Scribe Metrics Emitter to finish"
#    sleep 5
#    echo "Killing Scribe Metrics Emitter"
#    kill $SCRIBE_STATS_PID
#    echo "Killing Flume Metrics Emitter"
#    kill $FLUME_STATS_PID
#    ## Please ensure that the total delay must be smaller than the stopwaitsecs sueprvisord property for cas
}

function indiscriminatelyKillServices {
  echo ""
#    echo "Killing cas and it's dependencies indiscriminantly"
#    kill $CAS_PID
#    kill $DUMMY_BIDDER_PID
#    kill $HAPROXY_PID
#    kill $SYNAPSE_PID
#    kill $SCRIBE_PID
#    kill $SCRIBE_STATS_PID
#    . ${CAS_BIN_DIRECTORY}/flume/stop_flume.bash
#    kill $FLUME_STATS_PID
}

echo Starting Exchange-Portal
. $EP_BIN_DIRECTORY/ep/run_ep.bash &
EP_PID=$!


#echo Graceful shutdown for only prod environments
#if ! [ "$IDP_ENVIRONMENT" == "non_prod" ]
#then
#    echo Graceful Shutdown disabled;
#    trap handleGracefulShutdown SIGTERM SIGINT
#
#else
#    echo Graceful Shutdown disabled;
#    trap indiscriminatelyKillServices SIGTERM SIGINT
#fi

## Now wait for signals
read < /tmp/fifo & wait
