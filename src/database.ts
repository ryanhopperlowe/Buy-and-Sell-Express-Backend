import mysql, { Connection, FieldInfo, Query } from 'mysql';

let connection: Connection;

interface QueryResponse<T = unknown> {
  results: T;
  field?: FieldInfo[];
}

export const db = {
  connect: () => {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      socketPath: process.env.DB_SOCKET
    });

    connection.connect();
  },
  query: <T = unknown>(queryString: string, escapedValues?: string[]) => 
    new Promise<QueryResponse<T>>((res, rej) => {
      connection.query(queryString, escapedValues, (error, results, field) => {
        if (error) rej(error);
        res({ results, field })
      })
    }),
  end: () => connection.end()
}