# Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose app port (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
