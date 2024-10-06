# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the application with logging
RUN npm run build && echo "Build completed successfully!" || (echo "Build failed!" && exit 1)

# Expose the port (if applicable)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
