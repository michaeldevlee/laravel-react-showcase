FROM node:20-alpine
WORKDIR /react-frontend/
COPY public/ /react-frontend/public
COPY src/ /react-frontend/src
COPY package.json /react-frontend/
RUN npm install
CMD ["npm", "start"]
