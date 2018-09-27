#!/bin/bash

docker_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P ) # Pfad zum Script
docker build -f $docker_path/build-config/Dockerfile -t dockered_cpp $docker_path