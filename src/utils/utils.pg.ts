import { Client } from "pg";

const clientPG = new Client({
  user: "todo_postgresql_sugt_user",
  password: "nW9BOrLVJigqmyez6F8ir3gh8YbYs2m0",
  host: "dpg-d12ji33e5dus73cietjg-a",
  database: "todo_postgresql_sugt",
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
