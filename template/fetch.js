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

  const req = await fetch(`${getURL.toString()}user/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "new",
      // subname: "son ne la sao",
      // avatar: "",
    }),
  });
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
  //     // comment: "",
  //     // index: 0,
  //   }),
  // });

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

  const json = await req.json();

  console.log(req);
  console.log(json);
})();

// const ha = bcrypt.hashSync("my password", 10);

// const gen = bcrypt.genSaltSync(10);
// console.log(gen);

// const com = bcrypt.compareSync(
//   "my password",
//   "$2b$10$X9HB.SoDQOpI2ZhEwau59OiB/HLnucnB3Wj2/NUoo1tt/mvUk42Yq"
// );

// console.log(com, ha);
