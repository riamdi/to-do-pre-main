let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  if (JSON.parse(localStorage.getItem("nameOfTasks")))
    return JSON.parse(localStorage.getItem("nameOfTasks"));
  else return items;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");
  textElement.textContent = item;
  deleteButton.addEventListener("click", function (evt) {
    clone.remove();
    saveTasks(getTasksFromDOM());
  });
  duplicateButton.addEventListener("click", function (evt) {
    listElement.prepend(createItem(textElement.textContent));
    saveTasks(getTasksFromDOM());
  });
  editButton.addEventListener("click", function (evt) {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  });
  textElement.addEventListener("blur", function (evt) {
    textElement.setAttribute("contenteditable", "false");
    saveTasks(getTasksFromDOM());
  });
  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach(function (item) {
    tasks.push(item.textContent);
  });
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("nameOfTasks", JSON.stringify(tasks));
}
//отрисовка задач на старте
loadTasks().forEach(function (item) {
  listElement.append(createItem(item));
});

//добавление новой задачи
formElement.addEventListener("submit", function (evt) {
  // запрещаем перезагрузку страницы
  evt.preventDefault(); 
  listElement.prepend(createItem(inputElement.value));
  inputElement.value = "";
  saveTasks(getTasksFromDOM());
});

