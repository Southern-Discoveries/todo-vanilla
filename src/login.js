import $ from "jquery";
import utilsConstants from "../utils/utils.constants";
import "./middleware";
import spiner from "./components/spiner";
import { catchProperties } from "../utils";

$.ready(
  (function () {
    const inputText = $(".login-input");
    const btnSignup = $("#login-signup");
    const inputError = $("#login-input-error");

    // handler input
    {
      inputText.on("keypress", (event) => {
        if (event.key === "Enter") {
          $("#login-signup").trigger("click");
        }
      });

      inputText.on("input", () => {
        for (const element of inputText) {
          if (element.value.length) {
            btnSignup.removeAttr("disabled");
          } else {
            btnSignup.attr("disabled", true);
          }
        }
      });
    }

    // handler signup
    {
      // first time don't have any input
      btnSignup.attr("disabled", true);

      // should login
      $("#login-signup").on("click", async () => {
        try {
          inputError.attr("hidden", "true");
          btnSignup.html(spiner({ class: "m-auto" }));

          const [username, password] = inputText;

          const isOmit = catchProperties({
            username: !username?.value,
            password: !password?.value,
          });

          if (isOmit?.length) throw `required field ${isOmit}`;

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
          window.location = `/${utilsConstants.BASE_PATH}`;
        } catch (error) {
          inputError.removeAttr("hidden").text(error);
          btnSignup.text("Sign up");
        }
      });
    }
  })()
);
