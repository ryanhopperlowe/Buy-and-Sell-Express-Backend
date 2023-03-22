import { createConnection, Connection } from "mysql";
import { QueryResponse } from "../model";

export class RootService {
  private static _instance: RootService;

  public static get instance() {
    if (!this._instance) {
      this._instance = new RootService();
    }
    return this._instance;
  }

  private connection: Connection;

  constructor() {
    this.connection = createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      socketPath: process.env.DB_SOCKET
    });
  }

  async end() {
    this.connection.end();
  }

  // should be run at the very beginning at index.js
  async init() {
    return new Promise<void>((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) reject(err);
        console.log('App is connected to DB');
        resolve();
      });
    })
  }

  query<T = unknown>(queryString: string, escapedValues?: string[]) {
    return new Promise<QueryResponse<T>>((res, rej) => {
      this.connection.query(queryString, escapedValues, (error, results, field) => {
        if (error) rej(error);
        res({ results, field });
      })
    })
  }
}