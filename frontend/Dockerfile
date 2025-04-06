FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the application
RUN npm run build

EXPOSE 3001

# Start the application
CMD ["npm", "start"] 