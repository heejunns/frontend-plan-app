const $todolistform = document.querySelector('#todoListForm');
const $todoInput = document.querySelector('#todoInput');
const $todolist = document.querySelector('#todolist');
const $errorMessage = document.querySelector('#errorMessage');
let localStorageRemember = [];

function clickDeleteButton(event) {
  event.preventDefault();
  console.log(event.target.parentElement);
  event.target.parentElement.remove();
  localStorageRemember = localStorageRemember.filter(
    (element) => element.id !== parseInt(event.target.parentElement.id)
  );
  saveLocal(localStorageRemember);
  console.log(localStorageRemember);
}
function saveLocal(localStorageRemember) {
  localStorage.setItem('userTodo', JSON.stringify(localStorageRemember));
}
function drawList(input) {
  console.log(input.text);
  const list = document.createElement('li');
  const listSpan = document.createElement('span');
  const span = document.createElement('span');
  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', clickDeleteButton);
  listSpan.textContent = '🧑‍💻';
  deleteButton.textContent = '🗑️';
  list.id = input.id;
  list.classList.add('list-item');
  span.textContent = input.text;
  list.append(listSpan, span, deleteButton);
  $todolist.append(list);
  console.log(localStorageRemember);
}
function clickSubmitButton(event) {
  event.preventDefault();
  if (Object.is(parseInt($todoInput.value), NaN)) {
    const input = {
      id: Date.now(),
      text: $todoInput.value,
    };
    drawList(input);
    localStorageRemember.push(input);
    saveLocal(localStorageRemember);
    $todoInput.value = '';
  } else {
    $todoInput.value = '';
    $errorMessage.style.display = 'block';
    setTimeout(() => {
      $errorMessage.style.display = 'none';
    }, 2000);
  }
}
$todolistform.addEventListener('submit', clickSubmitButton);

const localStoragUserGet = JSON.parse(localStorage.getItem('userTodo'));
if (localStoragUserGet) {
  localStorageRemember = localStoragUserGet;
  if (localStoragUserGet.length > 0) {
    localStoragUserGet.forEach(drawList);
  }
}
