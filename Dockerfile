FROM node:16.14.2

COPY . .

RUN npm install

CMD ["npm", "start"]