#!/bin/bash

PWD=`pwd`
BLACKLIST=("*.css *.js not-this-file.js")

# Output leeren
rm -rf $PWD/output/*

echo
echo "Compile JS mit Babel (mit babel.config.js)"
$PWD/node_modules/.bin/babel $PWD/input --out-dir $PWD/output

echo
echo "Minify JS (mit javascript-minifier.com)"
# Loop über JS Output Ordner
for js_files in $PWD/output/*.js; do
	js_file=`basename $js_files`
	if [[ " ${BLACKLIST[*]} " == *" $js_file "* ]]; then
		echo "- $js_file wird ausgelassen"
	else
		echo "+ sende $js_file"
		wget -q --post-data="input=`cat output/$js_file`" --output-document=output/$js_file https://javascript-minifier.com/raw
	fi
done

echo
echo "Minify CSS (mit css-minifier.com)"
# Loop über CSS Ordner
for css_files in $PWD/input/*.css; do
	css_file=`basename $css_files`
	if [[ " ${BLACKLIST[*]} " == *" $css_file "* ]]; then
		echo "- $css_file wird ausgelassen"
	else
		echo "+ sende $css_file"
		wget -q --post-data="input=`cat $PWD/input/$css_file`" --output-document=$PWD/output/$css_file https://cssminifier.com/raw
	fi
done

echo
echo "Konvertierung abgeschlossen !"
echo
echo "========================================================"
echo "Die Ergebnisse befinden sich unter $PWD/output/"
echo "--------------------------------------------------------"
echo "Vergiss nicht den Eingabeordner $PWD/input/ zu leeren !"
echo "========================================================"
echo