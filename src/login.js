import $ from "jquery";
import utilsConstants from "../utils/utils.constants";

$.ready(
  (function () {
    // logged but trying to join this page
    if (localStorage.getItem(utilsConstants.STORAGE_ACCOUNT)) {
      window.location = "/";

      return;
    }

    const queryInput = $(".login-input");
    const btnSignup = $("#login-signup");

    // handler input
    queryInput.on("input", () => {
      for (const element of queryInput) {
        if (element.value.length) {
          btnSignup.removeAttr("disabled");
        } else {
          btnSignup.attr("disabled", true);
        }
      }
    });

    // handler signup
    {
      // first time don't have any input
      btnSignup.attr("disabled", true);

      // should login
      $("#login-signup").on("click", async () => {
        try {
          const [username, password] = queryInput;

          const request = await fetch(`${utilsConstants.GET_API}/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username.value,
              password: password.value,
            }),
          });

          const json = await request.json();

          if (json?.statusText) throw json.statusText;

          localStorage.setItem(utilsConstants.STORAGE_ACCOUNT, json.username);
          window.location = "/";
        } catch (error) {
          console.log("error", error);

          alert(JSON.stringify(error));
        }
      });
    }
  })()
);
