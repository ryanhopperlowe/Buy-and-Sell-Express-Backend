import express from "express";
import { Server } from 'http';
import dotenv from 'dotenv';
dotenv.config();
import { listingsRouter } from "./routes/listings";
import { db } from "./database";

let server: Server;

function run() {
  const app = express();
  const port = 8080;

  db.connect();

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
  db.end();
  process.exit(1);
})

process.on('SIGINT', async () => {
  console.log('Stopping Server...');
  await server.close(() => {
    db.end();
    console.log('Server Stopped');
    process.exit(0);
  });
})

run();