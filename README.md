- How to Create REST API Project using Express.ts Framework

      1. Execute this command(s) on terminal project

               npm init -y

               npm install express

               npm install -D typescript ts-node nodemon @types/node @types/express

               <!-- npm install -D jest ts-jest @types/jest supertest @types/supertest -->

      2. Create `tsconfig.json` file

               npx tsc --init

      3. Replace all configuration on `tsconfig.json` file and replace with this configuration

               {
                  "compilerOptions": {
                     "target": "ES6",
                     "module": "commonjs",
                     "outDir": "./dist",
                     "rootDir": "./src",
                     "strict": true,
                     "esModuleInterop": true,
                     "skipLibCheck": true
                  }
               }

      4. Add this at `package.json` file inside `scripts props`

               "dev": "nodemon",
               "build": "tsc",
               "start": "node dist/index.js",
               <!-- "test": "jest" -->

      5. Init `jest` config

               npx ts-jest config:init

      6. Add this configuration at `jest.config.js`

               module.exports = {
                  preset: 'ts-jest',
                  testEnvironment: 'node',
                  testMatch: ['**/__tests__/**/*.test.ts']
               };

- How to Install Redis on Windows?

      1.  Install WSL using Powershell (Admin)

                  wsl --install

      2.  Execute this Command

                  sudo apt update

                  sudo apt install redis-server

      3.  Running Redis Server

                  sudo service redis-server start

      4.  Test Redis

                  redis-cli ping

- How to Configure Redis on Project?

      1.  Install Redis

                  npm install ioredis

      2.  Create Configuration File on Directory Config, and Add this Configuration Code:

                  import Redis from 'ioredis';

                  const redis = new Redis({
                     host: process.env.REDIS_HOST || '127.0.0.1',
                     port: parseInt(process.env.REDIS_PORT || '6379'),
                     password: process.env.REDIS_PASSWORD || undefined,
                     db: parseInt(process.env.REDIS_DB || '0'),

                  // Optional: reconnect strategy
                  retryStrategy: (times) => Math.min(times * 50, 2000),
                  });

                  redis.on('connect', () => console.log('🔌 Connected to Redis'));
                  redis.on('error', (err) => console.error('❌ Redis Error:', err));

                  export default redis;

- How to Configure Logging using Winston on Project?

      1.  Install Dependency

                  npm install winston

- How to Dockerize Application

      -  Dockerize MySql

               1.      Pull MySql Image from Docker Hub. You can Execute this Command on Terminal Admin

                        docker pull mysql

               2.      Create MySql Container Based on MySql Image

                        bash> docker run --name [CONTAINER_NAME] -p [CONTAINER_PORT]:[MYSQL_PORT] -e MYSQL_ROOT_PASSWORD=[YOUR_PASSWORD] -d mysql:tag

                                 docker run --name mysql-container -p 3306:3306 -e MYSQL_ROOT_PASSWORD=abc12345 -d mysql:latest

               3.      To Access MySql Server on MySql Container using Terminal

                                 docker exec -it mysql-container bash

                                 mysql -u root -p

      -  Dockerize Express.ts Project

               1.      Create New File with Name `Dockerfile`

               2.      Add this Configuration to `Dockerfile`

                                 # __FOR DEVELOPMENT PURPOSES__

                                 # Base Image: Where our app will running
                                 FROM node:20

                                 # Set Working Directory: Where our app will be placed
                                 WORKDIR /app

                                 # Copy `package.json` into Working Directory
                                 COPY package*.json ./

                                 # Install Dependencies
                                 RUN npm install

                                 # Copy All File(s) into Working Directory
                                 COPY . .

                                 # Prisma Generate
                                 RUN npx prisma generate

                                 # Following Port on `index.ts` File
                                 EXPOSE 4000

                                 # Install Nodemon for Hot-Reloading during Development Phase
                                 RUN npm install -g nodemon

                                 # Command to Run the App using Nodemon
                                 CMD ["npm", "run", "dev"]

               3.      Modify `nodemon.json` File, and Add `legacyWatch` Props

                                 "legacyWatch": true

               4.      Create New File with Name `.dockerignore`, and Add this Configuration

                                 node_modules/

               5.      Create New File with Name `docker-compose.yml`

                                 version: '3.8'
                                 services:
                                 api:
                                    build: .
                                    ports:
                                       - '4000:4000'
                                    volumes:
                                       - .:/app
                                       - /app/node_modules
                                    environment:
                                       - PORT=4000

               6.      Change DATABASE_URL on `.env` File

                                    DATABASE_URL="mysql://root:abc12345@[MYSQL-CONTAINER-NAME]:3306/[DATABASE-NAME]"

               7.      Execute Docker Compose

                                    docker-compose up --build        (Build for The First Time)

                                    docker-compose down -v           (Delete Docker Container and Volumes)

      -  How to Connect Express.ts Container and MySql Container?

               1.       Create New Network

                                    docker network create test-01-network

               2.       Connect Both Container into Newest Container

                                    docker network connect test-01-network mysql-container

                                    docker network connect test-01-network scheduling-logging-caching-api-1