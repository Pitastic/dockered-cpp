#!/bin/bash

PWD=`pwd`

# Output leeren
rm -rf $PWD/output/*

echo
echo "--> Compile, Polyfill and Pack (gulp 'n babel)"

echo
echo "Input:"
tree -sh $PWD/input
echo

gulp

echo
echo "Output:"
tree $PWD/output
echo