FROM node:8

RUN mkdir /root/babel-project
WORKDIR /root/babel-project

RUN npm install --save-dev @babel/core @babel/cli @babel/preset-env
RUN npm install --save @babel/polyfill

ENTRYPOINT ["bash", "./res/convert.sh"]
