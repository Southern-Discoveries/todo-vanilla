import $ from "jquery";
import { RANDOM_CHARACTER } from "../../utils/index";

export const toastRender = (message) => {
  const random = RANDOM_CHARACTER();

  const toast_message = $(
    toast({
      id: random,
      message,
    })
  );

  $("body").append(toast_message);

  $(`#close-${random}`).on("click", () => {
    toast_message.remove();
  });
};

const toast = (props) => {
  const containerID = props?.id ? `id="container-${props.id}"` : "";
  const closeID = props?.id ? `id="close-${props.id}"` : "";

  // auto close toast after 3 seconds
  if (containerID?.length) {
    setTimeout(() => {
      $(`#container-${props.id}`).remove();
    }, 3000);
  }

  return `<div ${containerID} class="flex p-4 max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg fixed top-0 right-0 mt-4 mr-4 ${props.class}" role="alert" tabindex="-1" aria-labelledby="hs-toast-normal-example-label">
    <div class="shrink-0">
      <svg class="shrink-0 size-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
      </svg>
    </div>

    <div class="ms-3">
      <p id="hs-toast-normal-example-label" class="text-sm text-gray-700">${props.message}</p>
    </div>

    <div class="ms-auto">
          <button ${closeID} type="button" class="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-gray-700" aria-label="Close">
            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
</div>`;
};

export default toast;
