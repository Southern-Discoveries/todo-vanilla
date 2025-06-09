const STORAGE_ACCOUNT = "account";
const GET_API = "https://todo-vanilla-sb13.onrender.com";
const BASE_PATH =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://southern-discoveries.github.io/todo-vanilla";
// : "todo-vanilla";

export default {
  STORAGE_ACCOUNT,
  GET_API,
  BASE_PATH,
};
