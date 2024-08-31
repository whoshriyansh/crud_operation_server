# Use the official Node.js image
FROM node:16.20.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the app dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Expose the port the app will run on
EXPOSE 4000

# Define environment variables (these will be overwritten by the GitHub Actions secrets)
ENV PORT=4000
ENV MONGO_URI=mongodb+srv://shriyanshlohia0:QRxdKSqZVpUOfH7K@cluster0.sbjfy.mongodb.net/
ENV JWT_SECRET=secrethellohieyehaga

# Start the application
CMD ["node", "index.js"]
