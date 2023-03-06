// 오늘 할일 입력해서 기록하는 todolist 기능 js 코드
const $todolistform = document.querySelector('#todoListForm');
const $todoInput = document.querySelector('#todoInput');
const $todolist = document.querySelector('#todolist');
const $errorMessage = document.querySelector('#errorMessage');
let localStorageRememberTodo = [];

function clickDeleteButtonTodo(event) {
  event.preventDefault();
  console.log(event.target.parentElement);
  event.target.parentElement.remove();
  localStorageRememberTodo = localStorageRememberTodo.filter(
    (element) => element.id !== parseInt(event.target.parentElement.id)
  );
  saveLocalTodo(localStorageRememberTodo);
  console.log(localStorageRememberTodo);
}
function saveLocalTodo(localStorageRememberTodo) {
  localStorage.setItem('userTodo', JSON.stringify(localStorageRememberTodo));
}
function drawListTodo(input) {
  console.log(input.text);
  const list = document.createElement('li');
  const listSpan = document.createElement('span');
  const span = document.createElement('span');
  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', clickDeleteButtonTodo);
  listSpan.textContent = '🧑‍💻';
  deleteButton.textContent = '🗑️';
  list.id = input.id;
  list.classList.add('list-item');
  span.textContent = input.text;
  list.append(listSpan, span, deleteButton);
  $todolist.append(list);
}
function clickSubmitButtonTodo(event) {
  event.preventDefault();
  if (Object.is(parseInt($todoInput.value), NaN)) {
    const input = {
      id: Date.now(),
      text: $todoInput.value,
    };
    drawListTodo(input);
    localStorageRememberTodo.push(input);
    saveLocalTodo(localStorageRememberTodo);
    $todoInput.value = '';
  } else {
    $todoInput.value = '';
    $errorMessage.classList.toggle('displayChange');
    setTimeout(() => {
      $errorMessage.classList.toggle('displayChange');
    }, 2000);
  }
}

$todolistform.addEventListener('submit', clickSubmitButtonTodo);

const localStoragUserGetTodo = JSON.parse(localStorage.getItem('userTodo'));
if (localStoragUserGetTodo) {
  localStorageRememberTodo = localStoragUserGetTodo;
  if (localStoragUserGetTodo.length > 0) {
    localStoragUserGetTodo.forEach(drawListTodo);
  }
}
