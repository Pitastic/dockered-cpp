FROM node:8

RUN apt update && apt install tree -y

RUN mkdir /root/project
WORKDIR /root/project
COPY ./build-config/package.json .

RUN npm install -g \
	gulp \
	@babel/core \
	@babel/cli

RUN npm install --save-dev \
	gulp \
	gulp-babel \
	gulp-uglify \
	gulp-sourcemaps \
	@babel/core \
	@babel/preset-env \
	@babel/polyfill \
	babelify \
	browserify \
	vinyl-source-stream \
	vinyl-buffer

RUN npm install --save-dev \
	@babel/polyfill

ENTRYPOINT ["bash", "./convert.sh"]
