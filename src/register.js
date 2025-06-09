import $ from "jquery";
import utilsConstants from "../utils/utils.constants";
import "./middleware";
import spiner from "./components/spiner";
import { catchProperties } from "../utils";
import toast from "./components/toast";

$.ready(
  (function () {
    const inputText = $(".login-input");
    const btnSignup = $("#login-signup");
    const inputError = $("#login-input-error");

    // handler input
    {
      inputText.on("keypress", (event) => {
        if (event.key === "Enter") {
          btnSignup.trigger("click");
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
      btnSignup.on("click", async () => {
        try {
          inputError.attr("hidden", "true");
          btnSignup.html(spiner({ class: "m-auto" }));

          const [username, password, password_confirm] = inputText;

          const isOmit = catchProperties({
            username: !username?.value,
            password: !password?.value,
            password_confirm: !password_confirm?.value,
          });

          if (password.value !== password_confirm.value) {
            throw "password it not matching";
          }

          if (isOmit?.length) throw `required field ${isOmit}`;

          const request = await fetch(
            `${utilsConstants.GET_API}/user/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username.value,
                password: password.value,
              }),
            }
          );

          const json = await request.json();

          if (request.status !== 200) throw json.statusText;

          // handler toast
          {
            const toast_message = $(
              toast({
                id: "register_success",
                message: json.statusText,
              })
            );

            $("body").append(toast_message);

            $("#close-register_success").on("click", () => {
              toast_message.remove();
            });
          }

          // reset form
          for (const element of inputText) {
            element.value = "";

            // just focus in username
            if (element.placeholder.includes("username")) {
              element.focus();
            }
          }
        } catch (error) {
          inputError.removeAttr("hidden").text(error);
        } finally {
          btnSignup.text("Sign up");
        }
      });
    }
  })()
);
