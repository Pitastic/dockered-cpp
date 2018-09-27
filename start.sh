#!/bin/bash

PFAD_AUF_HOST=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
PFAD_IN_DOCKER="/root/project"

docker run -it --rm --name=CompilePolyfillPack \
-v $PFAD_AUF_HOST/convert.sh:$PFAD_IN_DOCKER/convert.sh \
-v $PFAD_AUF_HOST/gulpfile.js:$PFAD_IN_DOCKER/gulpfile.js \
-v $PFAD_AUF_HOST/.babelrc:$PFAD_IN_DOCKER/.babelrc \
-v $PFAD_AUF_HOST/input:$PFAD_IN_DOCKER/input \
-v $PFAD_AUF_HOST/output:$PFAD_IN_DOCKER/output \
dockered_cpp:latest
