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
	@babel/core \
	@babel/preset-env \
	@babel/polyfill

RUN npm install --save-dev \
	@babel/polyfill

ENTRYPOINT ["bash", "./convert.sh"]
