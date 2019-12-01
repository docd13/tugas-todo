const defaultTodos = [
  { text: "not complete", completed: false },
  { text: "not complete", completed: false },
  { text: "complete", completed: true }
];

const todos = [...(JSON.parse(localStorage.getItem("todos")) || defaultTodos)];

const elements = {
  todoList: document.getElementById("todo-list"),
  todoInput: document.getElementById("todo-input"),
  addButton: document.getElementById("add-todo"),
  resetButton: document.getElementById("reset-todo")
};

///////////////////////////////////////////////////////////////////////////////

function renderTodoList() {
  elements.todoList.innerHTML = null;
  todos.forEach(function(todo, index) {
    const newTodo   = document.createElement("tr");
    const tdFirst   = document.createElement('td')
    const tdSecond  = document.createElement('td')
    const nbsp      = document.createTextNode('\u00A0')

    tdFirst.innerText = todo.text.toUpperCase();
    if (todo.completed) {
      // tdFirst.classList.add("complete")
      const label = document.createElement('span')
            label.classList.add("label", "label-success")
            label.innerHTML = "<i class='glyphicon glyphicon-ok'></i>"
      tdFirst.append(" ", label)
    } else {
      const completeButton = document.createElement("button")
      const iconCheck = document.createElement("i")
            iconCheck.classList.add("glyphicon", "glyphicon-ok")
      completeButton.classList.add("btn", "btn-sm", "btn-success")
      
      completeButton.append(iconCheck, nbsp,"Komplit")
      completeButton.addEventListener("click", function() {
        completeTodo(index);
      });
      
      tdSecond.append(completeButton, " | ")
    }

    const deleteButton = document.createElement("button");
    const iconDelete = document.createElement("i")
          iconDelete.classList.add("glyphicon", "glyphicon-remove")
    deleteButton.classList.add("btn", "btn-sm", "btn-danger");

    deleteButton.append(iconDelete, nbsp,"Hapus")
    deleteButton.addEventListener("click", function() {
      deleteTodo(index);
    });

    tdSecond.append(deleteButton);
    newTodo.append(tdFirst, tdSecond);
    elements.todoList.appendChild(newTodo);
  });
}

function isInputFilled() {
  return elements.todoInput.value.length > 0;
}

function addTodo() {
  if (isInputFilled()) {
    const todoText = elements.todoInput.value;
    todos.push({ text: todoText.toUpperCase(), completed: false });
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodoList();
    elements.todoInput.value = "";
    elements.todoInput.focus();
  }
}

function completeTodo(index) {
  todos[index].completed = true;
  localStorage.setItem("todos", JSON.stringify(todos));

  renderTodoList();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodoList();
}

///////////////////////////////////////////////////////////////////////////////

elements.todoInput.addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    addTodo();
  }
});

elements.addButton.addEventListener("click", function() {
  addTodo();
});

elements.resetButton.addEventListener("click", function() {
  localStorage.clear();
  window.location.reload();
});

///////////////////////////////////////////////////////////////////////////////

renderTodoList();
elements.todoInput.focus();
