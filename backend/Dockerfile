FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

# Use nodemon for development
CMD ["npm", "run", "start:dev"] 