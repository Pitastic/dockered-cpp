# Dockered C(ompile) P(olyfill) P(ack)

...is an easy to use workflow which uses a docker container with <a href="https://gulpjs.com/">gulpjs</a> and some modules like <a href="https://babeljs.io">babel</a>, <a href="https://browserify.org">browserify</a> and <a href="https://github.com/gulpjs/vinyl">vinyl</a> in a <a href="https://nodejs.org/">NodeJS</a> environment.

Compile, transform, polyfill and pack your js/css/scss code as you like for your dist.

## Setup

### Requirements

- just <a href="https://docker.io">docker</a>

### Install

If you have a running docker instance on your system the 'installation' breaks down in just these four steps:

1. clone this repo: `git clone`
2. (optional) configure `packe-json.js` with information about your project (<a href="https://docs.npmjs.com/files/package.json">you may read the docs</a>)
3. build the docker-image with the script `build.sh`
4. (optional) configure the gulpfile.js to edit/add/remove tasks (see below) and rebuild the image with `build.sh`

### Usage

1. copy your file in the given folders `input/*`
2. run the `start.sh`
3. look at the `output/*` folders (the results are also mentioned in your terminal)

### Configure

The `package-json` and `gulpfile.js` (execept for ***AUTO_MODE***) are not change at container runtime. You can edit your files as you like.

#### gulpfile.js

The task `js-ac` in the `gulpfile.js` is taken from a great tutorial from <a href="https://www.youtube.com/watch?v=ax0ykSVPufs">Alessandro Castellani</a> (THANKS !). It gives a good overview what's possible and useful. However the `js-pitastic` task is my preferred way. Your're welcome to create your own.

You can edit/add/remove tasks in the `gulpfile.js`. You can also specify which tasks to run at the end of the script. Just pass the task names into the array

```javascript
gulp.task('default', ["__HERE__"])
```

You can also watch some files for changing and automatically run tasks on changes with adding a line

```javascript
gulp.watch(__FILENAME__, [__TASKS TO RUN__])
```

in this section.

##### AUTO_MODE

At the beginning of the file the modules and filenames are defined. At every startup process a script is searching for a jsFiles or cssFiles definition. If you define `AUTO_MODE` the js-array will be replaced with a list of files (with the right extension) from the input folder. Take care of that if you want to specify others files or just some files instead.

I needn't to use the filelist. Use the source folder (e.g. `jsFolder`) variable like this:

```javascript
gulp.src( jsFolder + "**/*.js" )
```

#### more modules

If you want to use more modules you have to install them in the container during the build process. Therefore you have to add the install command (or just the package name) in the right section of the`Dockerfile`. You have to choose by yourself under consideration if the module has to be installed globally first (`-g` flag) and if it's a production dependency (`--save`) or a dev-dependency (`--save-dev`).

After changing the `Dockerfile` you have to run the `build.sh` script again.

## Debugging

For debugging it is sometimes easier to jump into the container and try things out. If you would like to do that comment-out the last line in the `Dockerfile`

```
#ENTRYPOINT [_ENTRY-COMMANDS-GOES-HERE_]
```

Edit the `start.sh` and put a `bash` at the end of the last line. Rebuild the image with `build.sh` and run the `start.sh`. You will now get right into the container on startup.

**Don't forget to change back this things and build the image again**

If you want to fugure out what is causing an error or why your output is empty put the following line **directly behind** the function in question:

```javascript
.on('error', console.error.bind(console))
```
