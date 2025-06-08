import { Client } from "pg";

const clientPG = new Client({
  user: "postgres",
  password: "admin",
  host: "localhost",
  database: "postgres",
  port: 5432,
});

clientPG
  .connect()
  .then(() => {
    console.log("connect to postgresql successfuly");
  })
  .catch(() => {
    console.log("connect to postgresql failed");
  });

export default clientPG;
