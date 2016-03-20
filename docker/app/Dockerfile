FROM nodesource/trusty:latest

ADD package.json package.json
RUN npm install
ADD ../../ .

EXPOSE 8081

CMD ["node", "server/app.js"]

