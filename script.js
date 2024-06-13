const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Le champ est vide !");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let Date = document.createElement("p");
    Date.innerHTML = getTodayDate() + getTodayHour();
    li.appendChild(Date);

    let spanDelete = document.createElement("span");
    spanDelete.innerHTML = "\u00d7";
    spanDelete.classList.add("delete");
    li.appendChild(spanDelete);

    let spanEdit = document.createElement("span");
    spanEdit.innerHTML = "\u270E";
    spanEdit.classList.add("edit");
    li.appendChild(spanEdit);
  }
  inputBox.value = "";
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
  let input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("edit-input");

  li.innerHTML = "";
  li.appendChild(input);
  input.focus();

  input.addEventListener("blur", function () {
    li.innerHTML = input.value;
    let spanDelete = document.createElement("span");
    spanDelete.innerHTML = "\u00d7";
    spanDelete.classList.add("delete");
    li.appendChild(spanDelete);

    let spanEdit = document.createElement("span");
    spanEdit.innerHTML = "\u270E";
    spanEdit.classList.add("edit");
    li.appendChild(spanEdit);

    let Date = document.createElement("p");
    Date.innerHTML = getTodayDate() + getTodayHour();
    li.appendChild(Date);

    saveData();
  });
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
  let minutes = String(today.getMinutes());

  return ` ${hours}:${minutes}`;
}

showTask();
