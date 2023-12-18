FROM node
WORKDIR /app/client
COPY public /app/client/public
COPY package.json /app/client
COPY src /app/client/src
RUN npm install
CMD ["npm", "start"]

