FROM node:8

RUN mkdir /root/project
WORKDIR /root/project
COPY ./build-config/package.json .

RUN npm install -g gulp
RUN npm install --save-dev \
	gulp \
	gulp-babel \
	@babel/core \
	@babel/preset-env

#RUN npm install --save-dev @babel/core 
#RUN npm install --save @babel/polyfill

#ENTRYPOINT ["bash", "./res/convert.sh"]
