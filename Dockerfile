FROM node
RUN apt-get update && apt-get install -y python3 default-jdk
RUN ln -sf $(which python3) /usr/bin/python
WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]