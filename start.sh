#!/bin/bash

PFAD_AUF_HOST="/home/primic/NodeDocker"
PFAD_IN_DOCKER="/root/babel-project"

docker run -it --rm --name=BabelNode \
-v $PFAD_AUF_HOST/babel.config.js:$PFAD_IN_DOCKER/babel.config.js \
-v $PFAD_AUF_HOST/input:$PFAD_IN_DOCKER/input \
-v $PFAD_AUF_HOST/output:$PFAD_IN_DOCKER/output \
-v $PFAD_AUF_HOST/res/:$PFAD_IN_DOCKER/res \
babelnode:latest