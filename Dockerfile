# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set environment variables
ENV PORT=3000
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# migrations
# RUN npx prisma migrate deploy

# Start the application
CMD [ "npx", "prisma", "migrate", "deploy" ]

