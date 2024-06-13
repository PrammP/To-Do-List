const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const deadlineDateInput = document.getElementById("deadline-date");

function addTask() {
  if (inputBox.value === "") {
    alert("Le champ est vide !");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let dateElement = document.createElement("p");
    dateElement.classList.add("date-created");
    dateElement.innerHTML = getTodayDate() + getTodayHour();
    li.appendChild(dateElement);

    if (deadlineDateInput.value) {
      let remainingDaysElement = document.createElement("p");
      remainingDaysElement.classList.add("remaining-days");
      remainingDaysElement.innerHTML =
        "Temps restant: " +
        calculateRemainingDays(deadlineDateInput.value) +
        " jours";
      li.appendChild(remainingDaysElement);
    }

    let spanDelete = document.createElement("span");
    spanDelete.innerHTML = "\u00d7";
    spanDelete.classList.add("delete");
    li.appendChild(spanDelete);

    let spanEdit = document.createElement("span");
    spanEdit.innerHTML = "\u270E";
    spanEdit.classList.add("edit");
    li.appendChild(spanEdit);

    listContainer.appendChild(li);
  }
  inputBox.value = "";
  deadlineDateInput.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (
      e.target.tagName === "SPAN" &&
      e.target.classList.contains("delete")
    ) {
      e.target.parentElement.remove();
      saveData();
    } else if (
      e.target.tagName === "SPAN" &&
      e.target.classList.contains("edit")
    ) {
      editTask(e.target.parentElement);
    }
  },
  false
);

function editTask(li) {
  let currentText = li.childNodes[0].nodeValue;
  let currentDeadline = li.querySelector(".deadline-date")
    ? li.querySelector(".deadline-date").innerText.replace("Deadline: ", "")
    : "";

  let inputText = document.createElement("input");
  inputText.type = "text";
  inputText.value = currentText;
  inputText.classList.add("edit-input");

  let inputDate = document.createElement("input");
  inputDate.type = "date";
  inputDate.value = currentDeadline;
  inputDate.classList.add("edit-date-input");

  li.innerHTML = "";
  li.appendChild(inputText);
  li.appendChild(inputDate);
  inputText.focus();

  inputText.addEventListener("keydown", function () {
    if (event.key === "Enter" || event.keyCode === 13) {
      updateTask(li, inputText.value, inputDate.value);
    }
  });

  inputDate.addEventListener("keydown", function () {
    if (event.key === "Enter" || event.keyCode === 13) {
      updateTask(li, inputText.value, inputDate.value);
    }
  });
}

function updateTask(li, newText, newDeadline) {
  li.innerHTML = newText;

  let dateElement = document.createElement("p");
  dateElement.classList.add("date-created");
  dateElement.innerHTML = getTodayDate() + getTodayHour();
  li.appendChild(dateElement);

  if (newDeadline) {
    let remainingDaysElement = document.createElement("p");
    remainingDaysElement.classList.add("remaining-days");
    remainingDaysElement.innerHTML =
      "Temps restant: " + calculateRemainingDays(newDeadline) + " jours";
    li.appendChild(remainingDaysElement);
  }

  let spanDelete = document.createElement("span");
  spanDelete.innerHTML = "\u00d7";
  spanDelete.classList.add("delete");
  li.appendChild(spanDelete);

  let spanEdit = document.createElement("span");
  spanEdit.innerHTML = "\u270E";
  spanEdit.classList.add("edit");
  li.appendChild(spanEdit);

  saveData();
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

function getTodayDate() {
  let today = new Date();
  let day = String(today.getDate()).padStart(2, "0");
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let year = today.getFullYear();

  return `${day}-${month}-${year}`;
}

function getTodayHour() {
  let today = new Date();
  let hours = String(today.getHours());
  let minutes = String(today.getMinutes()).padStart(2, "0");

  return ` ${hours}:${minutes}`;
}

function calculateRemainingDays(deadline) {
  let today = new Date();
  let deadlineDate = new Date(deadline);
  let timeDiff = deadlineDate - today;
  let daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff >= 0 ? daysDiff : 0;
}

showTask();
