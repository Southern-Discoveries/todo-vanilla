(async function () {
  // const req = await fetch("http://localhost:3000/user/register?son=1", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     username: "1",
  //     password: "123",
  //   }),
  // });

  // const req = await fetch("http://localhost:3000/user/profile/synasapmob", {
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

  const req = await fetch("http://localhost:3000/todo/reset", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      creator: "alexpham",
    }),
  });

  const json = await req.json();

  console.log(req);
  console.log(json);
})();
