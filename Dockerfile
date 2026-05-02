FROM node:18-alpine

WORKDIR /app

# Install dependencies first for caching
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Cloud Run sets the PORT environment variable
# The server.js falls back to 8080 if not set
EXPOSE 8080

CMD ["npm", "start"]
