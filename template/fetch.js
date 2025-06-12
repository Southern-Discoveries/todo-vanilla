function parseJWT(token) {
  if (!token) return null;

  const arr = token.split(".");
  if (arr.length < 2) return null;

  try {
    const base64Payload = arr[1].replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
      atob(base64Payload)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Failed to decode JWT", err);
    return null;
  }
}

(async function () {
  // const getURL = new URL(`https://todo-vanilla-sb13.onrender.com`);
  const getURL = new URL(`http://localhost:3000`);

  // const req = await fetch(
  //   `https://api.render.com/deploy/srv-d12jjiumcj7s73fe6mq0?key=yCX26dSAnLQ`
  // );

  // const newBlob = new Blob(require("./download.jpeg"));
  // const file = new File(["foo"], require("./download.jpeg"));
  // console.log(file);
  // const form = new FormData();
  // form.append("username", "hello");
  // form.append("file", new File(["file content"], "file.txt"));

  // const req = await fetch(`${getURL.toString()}user/edit`, {
  //   method: "POST",
  //   body: form,
  // });

  // const req = await fetch(`${getURL.toString()}user/profile`, {
  //   method: "GET",
  //   headers: {
  //     // "Content-Type": "application/json",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN5bmFzYXBtb2IiLCJzdWJuYW1lIjoidGhpZXQgbHVvIiwiYXZhdGFyIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vc3luYXNhcG1vYi9pbWFnZS91cGxvYWQvdjE3NDk3MTExNzcvNzFiNWttdFpkOExfY2JhYXR6LmpwZyIsImNyZWF0ZWRBdCI6MTc0OTYyOTYyNywiaWF0IjoxNzQ5NzE2MDUwLCJleHAiOjE3NDk3MTk2N",
  //   },
  //   // body: JSON.stringify({
  //   //   username: "synasapmob",
  //   //   password: "12",
  //   //   // subname: "son ne la sao",
  //   //   // avatar: "",
  //   // }),
  // });
  // const req = await fetch(`${getURL.toString()}user/profile/synasapmob`, {
  //   method: "GET",
  // });

  // const req = await fetch("http://localhost:3000/todo/create", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     creator: "alexpham",
  //     status: "progress",
  //     task_name: "khoc nua nak",
  //   }),
  // });
  // console.log(req);

  // const newURL = new URL("http://localhost:3000/todo/delete");

  // newURL.searchParams.append("id", "10");
  // newURL.searchParams.append("creator", "synasapmob");

  // const req = await fetch(newURL.toString(), {
  //   method: "DELETE",
  // });

  // const req = await fetch("http://localhost:3000/todo/reset", {
  //   method: "DELETE",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     creator: "alexpham",
  //   }),
  // });

  const req_login = await fetch(`${getURL.toString()}user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "synasapmob",
      password: "12",
    }),
  });

  const req_login_json = await req_login.json();

  console.log(new Date(parseJWT(req_login_json.REFRESH_TOKEN).exp * 1000));
  console.log(new Date(parseJWT(req_login_json.ACCESS_TOKEN).exp * 1000));
  console.log(new Date());

  // for (const [key, value] of Object.entries(req_login_json)) {
  //   console.log(value);
  // }

  // const req_profile = await fetch(`${getURL.toString()}user/profile`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${req_login_json.statusText}`,
  //   },
  // });

  // const req_profile_json = await req_profile.json();
  // console.log(req_profile_json);
})();

// const ha = bcrypt.hashSync("my password", 10);

// const gen = bcrypt.genSaltSync(10);
// console.log(gen);

// const com = bcrypt.compareSync(
//   "my password",
//   "$2b$10$X9HB.SoDQOpI2ZhEwau59OiB/HLnucnB3Wj2/NUoo1tt/mvUk42Yq"
// );

// console.log(com, ha);
