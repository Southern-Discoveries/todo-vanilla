import $ from "jquery";
import "./middleware";

$(function () {
  let count = 0;
  let genCard = [];
  //Card info

  const date = new Date();
  const dateUpdate =
    date.getHours() +
    ":" +
    date.getUTCMinutes() +
    " - " +
    date.getDay() +
    "/" +
    date.getMonth() +
    "/" +
    date.getFullYear();

  //Todo card
  function getInputValue() {
    let todoCard = "";
    for (let i = 0; i < genCard.length; i++) {
      todoCard += `
                            <li class="flex justify-between items-center p-4 bg-[#313439] rounded-[12px]">
                            <div class="flex gap-4 items-center">
                            <input id="checkBox" type="checkbox" class=" h-5 w-5 cursor-pointer bg-[#313439] accent-[#3EB08F]">
                            <div class="flex flex-col">
                                <div id="cardContent" class="text-[16px] font-normal text-white">${genCard[i]}</div>
                                <h6 class="text-[12px] font-light text-[#9EA0A8]">${dateUpdate}</h6>
                            </div>
                            </div>
                            <img src="Icon/Trash.png" alt="Trash" class="w-6 h-6 rounded-[4px]">
                        </li>
                `;
      $("#cardContainer").html(todoCard);
    }
  }
  //Input condition
  $("#myInput").on("input", () => {
    if ($("#myInput").val()) {
      $("#createBtn").prop("disabled", false).css("opacity", "1");
    } else {
      $("#createBtn").prop("disabled", true).css("opacity", "0.35");
    }
  });
  //Create Btn

  $("#createBtn").on("click", () => {
    genCard.push($("#myInput").val());
    getInputValue();

    $("#countList").text((count += 1));
    $("#createBtn").prop("disabled", true).css("opacity", "0.35");
    $("#myInput").val("");
  });

  //Reset Btn

  $("#resetBtn").on("click", () => {
    $("#myInput").val("");
    $("#createBtn").prop("disabled", true).css("opacity", "0.35");
  });
  //Checkbox State

  //   removeBtn.on("click", () => {
  //     console.log("Hello Guys");
  //   });
});
