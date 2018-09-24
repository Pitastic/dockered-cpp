# mini-poly-fier
Auto Mini- und Polyfier in einer Dockerumgebung über

- babeljs.io (Polyfill)
- javascript-minifier.com (jsminify)
- css-minifier.com (cssminify)

Beim Start des Dockercontainers werden passende Dateien aus `input` in diesen drei Schritten bearbeitet und bei `output` wieder abgelegt.

Die JS-minifier parsen erst den Code und geben ihn gekürtzt wieder zurück. Je nachdem nach welchem Standard programmiert wurde, kann es hilfreich sein, einzelne Dateien vom jsminifier auszuschließen (und Fehler beim Parsen zu verhinden). Dafür gibt es eine Blacklist im Skript `convert.sh`.

# Setup

## Vorraussetzungen

- docker

## Installation

1. Repository klonen `git clone`
2. Dockerimage herstellen mit Hilfe des Skripts `bash build.sh`
3. Konfigurieren des Polyfills `babel.config.js` (<a href="https://babeljs.io/docs/en/options">mehr dazu in den docs</a>)
4. Ggf. Dateien in der Blacklist aufnehmen in `convert.sh` (Leerzeichen getrennt)

# Usage

1. Dateien in den `input` Ordner verschieben
2. `bash start.sh` aufrufen
3. Dateien aus dem `output` Ordner entnehmen und beide Ordner leeren
