import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.APP_ENV}` });
import express from "express";
import admin, { ServiceAccount } from 'firebase-admin';
import { Server } from 'http';
import { listingsRouter } from "./routes/listingRouter";
import { RootService } from './service';
import * as credentials from '../firebase-credentials.json';

admin.initializeApp({
  credential: admin.credential.cert(credentials as ServiceAccount)
})

let server: Server;

async function run() {
  const app = express();
  const port = 8080;

  await RootService.instance.init();

  app.use(listingsRouter)

  app.get('/', (req, res) => {
    res.end('Hello World!');
  });

  server = app.listen(port, () => {
    console.log(`App listening on localhost:${port}`)
  });
}

process.on('unhandledRejection', (error) => {
  console.log(error);
  RootService.instance.end();
  process.exit(1);
})

process.on('SIGINT', async () => {
  console.log('Stopping Server...');
  await server.close(() => {
    RootService.instance.end();
    console.log('Server Stopped');
    process.exit(0);
  });
})

run();