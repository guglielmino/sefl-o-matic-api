FROM ubuntu:latest

# make sure apt is up to date
RUN apt-get update

# install nodejs and npm
RUN apt-get install -y nodejs nodejs-legacy npm git git-core

WORKDIR /opt/
RUN git clone http://root:d8r6cosca@gitlab.gumino.com/node-apps/self-o-matic-api.git selfomatic-api
WORKDIR /opt/selfomatic-api

RUN npm install

EXPOSE  9000

#ENV NODE_ENV production

CMD ["node", "/opt/selfomatic-api/server/app.js"] 
