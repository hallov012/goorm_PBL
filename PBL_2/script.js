const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

/* todo 추가 */
const addTodo = (todo, idx) => {
  const todoWrap = document.createElement("li");
  todoWrap.classList.add("todo-wrap");
  todoWrap.id = idx;

  /* left 영역 */
  const todoLeft = document.createElement("div");
  todoLeft.classList.add("todo-left");

  const todoCheck = document.createElement("input");
  todoCheck.type = "checkbox";
  todoCheck.checked = todo.checked;
  todoCheck.classList.add("todo-check");
  todoCheck.id = `todo-check-${idx}`;

  const todoCheckLabel = document.createElement("label");
  todoCheckLabel.classList.add("todo-check-label");
  todoCheckLabel.htmlFor = `todo-check-${idx}`;

  const todoText = document.createElement("span");
  todoText.classList.add("todo-text");
  todoText.innerText = todo.text;

  todoLeft.appendChild(todoCheck);
  todoLeft.appendChild(todoCheckLabel);
  todoLeft.appendChild(todoText);

  /* right 영역 */
  const todoRight = document.createElement("div");
  todoRight.classList.add("todo-right");

  const todoEdit = document.createElement("i");
  todoEdit.classList = "fa-solid fa-pencil edit-btn";

  const todoDelete = document.createElement("i");
  todoDelete.classList = "fa-solid fa-circle-minus remove-btn";

  todoRight.appendChild(todoEdit);
  todoRight.appendChild(todoDelete);

  /* todoWrap에 left, right 영역 추가 */
  todoWrap.appendChild(todoLeft);
  todoWrap.appendChild(todoRight);

  /* todoList에 todoWrap 추가 */
  todoList.appendChild(todoWrap);
};

/* todoList에 todo 추가 */
const renderTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo, idx) => {
    addTodo(todo, idx);
  });
};

/* ㅣocalStorage에 todos 저장 */
const saveTodo = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const savedTodo = localStorage.getItem("todos");
const todos = saveTodo ? JSON.parse(savedTodo) : [];
renderTodos();

/* 새로운 todo 추가 */
addBtn.addEventListener("click", () => {
  const newData = {
    text: "새로운 할 일",
    checked: false,
  };

  todos.push(newData);
  saveTodo();
  renderTodos();
});

const removeTodo = (idx) => {
  todos.splice(idx, 1);
  saveTodo();
  renderTodos();
};

const editBtnHandler = (target) => {
  const todoTextArea = target.parentNode.parentNode.childNodes[0].childNodes[2];
  const todoText = todoTextArea.innerHTML;
  const editBtn = target.parentNode.childNodes[0];

  /* input으로 변경 */
  todoTextArea.innerHTML = "";

  const input = document.createElement("input");
  input.type = "text";
  input.value = todoText;
  input.classList.add("todo-input");

  todoTextArea.appendChild(input);

  /* editBtn 변경 */
  editBtn.classList = "fa-solid fa-check edit-save-btn";
};

const editSaveHandler = (idx, target) => {
  const todoText = target.parentNode.parentNode.childNodes[0].childNodes[2];
  const editBtn = target.parentNode.childNodes[0];

  /* 변경내용 저장 */
  todos[idx].text = todoText.childNodes[0].value;
  saveTodo();
  renderTodos();

  /* editBtn 변경 */
  editBtn.classList = "fa-solid fa-pencil edit-btn";
};

const todoCheck = (idx, target) => {
  todos[idx].checked = target.checked;
  saveTodo();
  renderTodos();
};

/* todo 수정 or 삭제 */
todoList.addEventListener("click", (e) => {
  const target = e.target;
  const idx = target.parentNode.parentNode.id;
  if (target.classList.contains("remove-btn")) {
    removeTodo(idx);
  } else if (target.classList.contains("edit-btn")) {
    editBtnHandler(target);
  } else if (target.classList.contains("edit-save-btn")) {
    editSaveHandler(idx, target);
  } else if (target.classList.contains("todo-check")) {
    todoCheck(idx, target);
  }
});
