const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Le champ est vide !");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span1 = document.createElement("p");
    span1.innerHTML = getTodayDate() + getTodayHour();
    li.appendChild(span1);
    let span2 = document.createElement("span");
    span2.innerHTML = "\u00d7";
    li.appendChild(span2);
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
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

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
