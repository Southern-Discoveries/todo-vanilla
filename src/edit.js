import $ from "jquery";
import spiner from "./components/spiner";
import utilsConstants from "../utils/utils.constants";
import toast, { toastRender } from "./components/toast";
import { fetchAccount } from "./middleware";

$.ready(
  (async function () {
    const btnUploadFile = $("#edit-upload-file");
    const btnUploadSubmit = $("#edit-upload-submit");
    const previewUploadFile = $("#edit-upload-preview");
    const inputUsername = $("#login-input-username");
    const inputForm = $(".login-input");

    let getAccount = await fetchAccount();

    // handler placeholder for username
    {
      inputUsername[0].value = getAccount.subname;
    }

    // handler update avatar
    {
      if (getAccount?.avatar) {
        previewUploadFile.css({
          background: `var(--color-gray-400) url(${getAccount.avatar}) no-repeat center`,
        });
      }
    }

    // handler preview when users upload
    btnUploadFile.on("change", (event) => {
      const getFiles = event.target.files;

      if (getFiles?.length) {
        const blobToURL = URL.createObjectURL(getFiles[0]);

        previewUploadFile.css({
          background: `var(--color-gray-400) url(${blobToURL}) no-repeat center`,
        });

        // cleanup memory
        setTimeout(() => {
          URL.revokeObjectURL(blobToURL);
        }, 0);
      }
    });

    // handle submit to edit profile
    btnUploadSubmit.on("click", async () => {
      try {
        const params = {
          username: getAccount.username,
        };

        btnUploadSubmit.html(spiner({ class: "m-auto" }));

        // handler avatar
        {
          const getFiles = btnUploadFile[0].files;

          if (getFiles?.length) {
            const form = new FormData();
            form.append("file", getFiles[0]);
            form.append("api_key", "583412573719756");
            form.append("upload_preset", "gafi-app-upload");
            form.append("cloud_name", "synasapmob");

            const request_avatar = await fetch(
              "https://api.cloudinary.com/v1_1/sumitsoni/image/upload",
              {
                method: "POST",
                body: form,
              }
            );

            const json_request_avatar = await request_avatar.json();

            params.avatar = json_request_avatar.secure_url;
            getAccount.avatar = json_request_avatar.secure_url;
          }
        }

        // handler append fields
        {
          for (let field of inputForm) {
            if (field.type === "text" && field.value) {
              params.subname = field.value;
              getAccount.subname = field.value;
            }

            if (field.type === "password" && field.value) {
              params.password = field.value;
            }
          }
        }

        const request_edit = await fetch(
          `${utilsConstants.GET_API}/user/edit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          }
        );

        if (request_edit.status !== 200) throw request_edit.statusText;

        toastRender("edit successfuly");
      } catch (error) {
      } finally {
        btnUploadSubmit.text("Submit");
      }
    });
  })()
);
