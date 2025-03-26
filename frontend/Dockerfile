FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with better npm settings
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retries 5 && \
    npm install --loglevel error

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 8080

# Start development server
CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0"] 