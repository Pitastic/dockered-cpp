# Dockered C(ompile) P(olyfill) P(ack)

Ein Dockercontainer für einen einfachen Workflow beim Deploy !

CPP nutzt <a href="https://gulpjs.com/">gulpjs</a> und <a href="https://babeljs.io">babeljs</a> in einem Dockercontainer mit <a href="https://nodejs.org/">NodeJS</a> um Javascript Code in ältere Standards zu übersetzen (compile), ggf. nicht vorhandene Funktionen nachliefert (polyfill) und packt alle Abhängigkeiten zu diesen Code in so wenig Dateien wie möglich (pack).

Außerdem werden `js` und `css` Dateien noch minified.

Über die Configdatei `package.json` ist der Workflow und der Dockercontainer schnell erweiterbar.

# Setup

## Vorraussetzungen

- docker

## Installation

1. Repository klonen `git clone`
2. Konfigurieren der Abhängikeiten in `package.json` (<a href="https://docs.npmjs.com/files/package.json">mehr dazu in den docs</a>)
3. Dockerimage herstellen mit Hilfe des Skripts `bash build.sh`
4. (optional) weitere Abhängikeiten hinzufügen (Schritt 2) und Docker-Image erneut builden (Schritt 3)

# Usage

1. Konfigurieren der durchzuführenden Aktionen in `gulpfile.js` (<a href="https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md">mehr dazu in den docs</a>)
2. work in progress...
