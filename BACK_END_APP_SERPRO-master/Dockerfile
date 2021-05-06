FROM node:12.18.4

COPY ["package.json", "package-lock.json", "/usr/src/back-serpro/"]

WORKDIR /usr/src/back-serpro

RUN npm install

COPY [".", "/usr/src/back-serpro"]

EXPOSE 3000

CMD ["npm", "start"]
