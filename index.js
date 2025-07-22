document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
      todos.push({ text, completed: false });
      input.value = "";
      saveTodos();
      renderTodos();
    }
  });

  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className = "todo-item" + (todo.completed ? " completed" : "");
      li.innerHTML = `
        <span class="todo-text">${todo.text}</span>
        <div class="todo-controls">
          <button onclick="toggleComplete(${index})">
            ${todo.completed ? "Undo" : "Done"}
          </button>
          <button onclick="deleteTodo(${index})">Delete</button>
        </div>
      `;
      todoList.appendChild(li);
    });
  }

  window.toggleComplete = function (index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
  };

  window.deleteTodo = function (index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  };

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  renderTodos();
});
