import $ from "jquery";
import "./middleware";

$(document).ready(function () {
  //Card info

  const date = new Date();
  const dateUpdate =
    date.getHours() +
    ":" +
    date.getUTCMinutes() +
    " - " +
    date.getDay() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear();

  //Add task

  function addTask() {
    let countTask = Math.random()
      .toString(36)
      .substring(2, 2 + 16);

    let textInput = $("#myInput").val();

    const todoCard = $(
      `
       <li id="todo-card" class="flex justify-between items-center p-4 bg-[#313439] rounded-[12px]">
                      <div id="hidePart" class="flex gap-4 items-center opacity-100">
                          <input id="checkBox" type="checkbox"
                              class=" h-5 w-5 cursor-pointer bg-[#313439] accent-[#3EB08F]">
                          <div class="flex flex-col">
                              <div id="cardContent" class="text-[16px] font-normal text-white">${textInput}</div>
                              <h6 class="text-[12px] font-light text-[#9EA0A8]">${dateUpdate}</h6>
                          </div>
                      </div>
                      <div class="flex gap-2 ">
                          <img id="removeBtn-${countTask}" src="Icon/Trash.svg" class="w-6 h-6 rounded-[4px]">
                          <img id="editBtn" src="Icon/Edit.svg" class="w-6 h-6 rounded-[4px]">
                      </div>
                  </li>
      `
    );

    //Import to main
    $("#cardContainer").append(todoCard);

    //Remove task
    $(`#removeBtn-${countTask}`).on("click", (e) => {
      todoCard.remove();
    });

    $("#editBtn").on("click", (e) => {
      $("#hidePart").hide();
      $("#todo-card").append(
        `
        <input class="items-start" value="${textInput}">
        `
      );
    });

    //Clear input
    $("#myInput").val("");

    //Reset createBtn
    $("#createBtn").prop("disabled", true).css("opacity", "0.35");

    //remove textCta
    $("#textCta").remove();

    //Count task
  }

  //Edit task
  function editTask() {}

  //Check createBtn states
  $("#myInput").on("input", () => {
    let textInput = $("#myInput").val();
    if (textInput) {
      $("#createBtn").prop("disabled", false).css("opacity", "1");
    } else {
      $("#createBtn").prop("disabled", true).css("opacity", "0.35");
    }
  });

  //Enter keypress
  $("#myInput").on("keypress", (e) => {
    if (e.which === 13) {
      addTask();
    }
  });

  //Add task function
  $("#createBtn").on("click", (event) => {
    addTask();
  });

  //EDIT TEXT FEATURE

  //Edit text

  function editTask() {
    const editHtml = `

  `;
  }
});
