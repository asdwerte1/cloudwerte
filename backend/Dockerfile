# Use official Node.js LTS image as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy backend files
COPY . .

# Expose API port
EXPOSE 5000

# Start backend server
CMD ["sh", "-c", "node server.js"]
