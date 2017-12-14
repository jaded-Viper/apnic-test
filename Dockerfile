FROM node:9

WORKDIR /app
ADD . /app

#RUN apt-get update
#RUN apt-get install -y curl

RUN npm install node-libcurl --build-from-source
RUN npm install

EXPOSE 80

CMD ["npm", "start"]