const STORAGE_ACCOUNT = "account";
// const GET_API = "http://localhost:3000";
const GET_API = "https://todo-vanilla-sb13.onrender.com";
const BASE_PATH = process.env.NODE_ENV === "production" ? "todo-vanilla" : "";

export default {
  STORAGE_ACCOUNT,
  GET_API,
  BASE_PATH,
};
