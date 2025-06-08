import { Client, Pool } from "pg";

// const poolPG = new Pool({
//   connectionString: process.env.DATABASE_URL, // from Render or your .env file
//   ssl: {
//     rejectUnauthorized: false, // Required for Render external connection
//   },
// });

const clientPG = new Client(
  process.env.NODE_ENV === "development"
    ? {
        user: "postgres",
        password: "admin",
        host: "localhost",
        database: "postgres",
        port: 5432,
      }
    : {
        connectionString:
          "postgresql://todo_postgresql_sugt_user:nW9BOrLVJigqmyez6F8ir3gh8YbYs2m0@dpg-d12ji33e5dus73cietjg-a.oregon-postgres.render.com/todo_postgresql_sugt",
        ssl: {
          rejectUnauthorized: false, // Required for Render external connection
        },
      }
);

clientPG
  .connect()
  .then(() => {
    console.log("connect to postgresql successfuly");
  })
  .catch(() => {
    console.log("connect to postgresql failed");
  });

export default clientPG;
