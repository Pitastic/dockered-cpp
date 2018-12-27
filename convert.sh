#!/bin/bash

PWD=`pwd`

# Output leeren
rm -rf $PWD/output/*

echo
echo "--> Compile, Polyfill and Pack (gulp 'n babel)"

# Read filelist for CSS
CONCAT_CSS="["
CSS_FILES="$(find ${PWD}/input/css -name '*.css' -type f)"
for css in $CSS_FILES; do
	CONCAT_CSS+=" '${css}',"
done
CONCAT_CSS+=" ]"

# Read filelist for JS
CONCAT_JS="["
JS_FILES="$(find ${PWD}/input/js -name '*.js' -type f | cut -sd '/' -f6-)"
for js in $JS_FILES; do
	CONCAT_JS+=" '${js}',"
done
CONCAT_JS+=" ]"

# Replacements for filelists in gulpfile.js
echo
echo "Replace file list for AUTO_MODE (css)"
#echo "${CONCAT_CSS}"
sed -E -e "s|var auto_cssFiles[[:blank:]]?=.*|var auto_cssFiles = ${CONCAT_CSS}|" $PWD/gulpfile.js > /tmp/gulp.tmp && cp /tmp/gulp.tmp $PWD/gulpfile.js

echo
echo "Replace file list for AUTO_MODE (js)"
#echo "${CONCAT_JS}"
sed -E -e "s|var auto_jsFiles[[:blank:]]?=.*|var auto_jsFiles = ${CONCAT_JS}|" $PWD/gulpfile.js > /tmp/gulp.tmp && cp /tmp/gulp.tmp $PWD/gulpfile.js

# Show IN, start gulp and show OUT
echo
echo "input (folders) :"
tree -d $PWD/input | grep -v "\/root\/project"
du -sh input/*
echo

gulp

echo
echo "output (folders):"
tree -shd $PWD/output | grep -v "\/root\/project"
du -sh output/*
echo

# Fix permissions
chown -R "${OWNER_USER}":"${OWNER_GROUP}" $PWD/output/*

# Input leeren
rm -rf $PWD/input/css/*
rm -rf $PWD/input/js/*


exit 0
