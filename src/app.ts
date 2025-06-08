import express from "express";
import userRouter from "./routes/userRouter";
import todoRouter from "./routes/todoRouter";

const app = express();
const port = 3000;

// use that can be get params/body
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

// watch
app.listen(port, () => {
  console.clear();

  console.log(`Example app listening on port ${port}`);
});

export default app;
