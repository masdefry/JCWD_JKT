1. npm init -y
2. npm install express
3. npm install -D typescript ts-node nodemon @types/node @types/express
4. npm install -D jest ts-jest @types/jest supertest @types/supertest
5. npx tsc --init
6. Add this at `tsconfig.json` file
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

7. Add this at `package.json` file inside `scripts props`
   "dev": "nodemon",
   "build": "tsc",
   "start": "node dist/index.js",
   "test": "jest"

8. Init `jest` config
npx ts-jest config:init

9. Add this at `jest.config.js`
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts']
};
