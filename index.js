let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
]

const listElement = document.querySelector(".to-do__list")
const formElement = document.querySelector(".to-do__form")
const inputElement = document.querySelector(".to-do__input")
const storageKey = "nameOfTasks"

function loadTasks() {
  const savedTasks = localStorage.getItem(storageKey)
  if (savedTasks) {
    return JSON.parse(savedTasks)
  }
  return items
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template")
  const clone = template.content.querySelector(".to-do__item").cloneNode(true)

  const textElement = clone.querySelector(".to-do__item-text")
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete")
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate")
  const editButton = clone.querySelector(".to-do__item-button_type_edit")

  textElement.textContent = item

  deleteButton.addEventListener("click", () => {
    clone.remove()
    items = getTasksFromDOM()
    saveTasks(items)
  })
  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent
    const newItem = createItem(itemName)
    listElement.prepend(newItem)
    items = getTasksFromDOM()
    saveTasks(items)
  })
  editButton.addEventListener("click", () => {
    textElement.setAttribute("contenteditable", "true")
    textElement.focus()
  })
  textElement.addEventListener("blur", () => {
    textElement.setAttribute("contenteditable", "false")
    items = getTasksFromDOM()
    saveTasks(items)
  })

  return clone
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text")
  const tasks = []
  itemsNamesElements.forEach((itemElement) => {
    tasks.push(itemElement.textContent)
  })
  return tasks
}

function saveTasks(tasks) {
  localStorage.setItem(storageKey, JSON.stringify(tasks))
}

items = loadTasks()

items.forEach((item) => {
  const taskElement = createItem(item)
  listElement.append(taskElement)
})

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault()

  const taskName = inputElement.value.trim()
  if (!taskName) {
    return
  }

  const newItem = createItem(taskName)
  listElement.prepend(newItem)
  items = getTasksFromDOM()
  saveTasks(items)
  inputElement.value = ""
})
