const todos = [];
const RENDER_EVENT = "render-todo";
document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
  });
});

function addTodo() {
  const teksTodo = document.getElementById("title").value;
  const timeStamp = document.getElementById("date").value;

  const generatedId = generateId();
  const todoObject = generateTodoObject(
    generatedId,
    teksTodo,
    timeStamp,
    false
  );
  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
  return +new Date();
}
function generateTodoObject(id, teks, timestamp, isCompleted) {
  return {
    id,
    teks,
    timestamp,
    isCompleted,
  };
}

document.addEventListener(RENDER_EVENT, function () {
  // console.log(todos);

  const uncompletedTODOist = document.getElementById("todos");
  uncompletedTODOist.innerHTML = "";

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted) {
      uncompletedTODOist.append(todoElement);
    }
  }
});

function makeTodo(todoObject) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = todoObject.teks;

  const timeStamp = document.createElement("p");
  timeStamp.innerText = todoObject.timestamp;

  const teksContainer = document.createElement("div");
  teksContainer.classList.add("inner");
  teksContainer.append(textTitle, timeStamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(teksContainer);
  container.setAttribute("id", "todo-${todoObject.id}");

  if (todoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", function () {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", function () {
      removeTaskFromComplete(todoObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      addTaskCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  return container;
}

// fungsi button
function addTaskCompleted(todoId) {
  const todotarget = findTodo(todoId);

  if (todotarget == null) return;

  todotarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodo(todoId) {
  for (const todoItem of todos) {
    if (todoItem.id == todoId) {
      return todoItem;
    }
  }
  return null;
}
