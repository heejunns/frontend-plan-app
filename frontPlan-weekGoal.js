const $weeklistform = document.querySelector('#weekListForm');
const $weekInput = document.querySelector('#weekInput');
const $weeklist = document.querySelector('#weeklist');
// const $errorMessage = document.querySelector('#errorMessage');
let localStorageRememberWeekGoal = [];

function clickDeleteButtonWeek(event) {
  event.preventDefault();
  event.target.parentElement.remove();
  localStorageRememberWeekGoal = localStorageRememberWeekGoal.filter(
    (element) => element.id !== parseInt(event.target.parentElement.id)
  );
  saveLocalWeek(localStorageRememberWeekGoal);
}
function saveLocalWeek(localStorageRememberWeekGoal) {
  localStorage.setItem(
    'userWeek',
    JSON.stringify(localStorageRememberWeekGoal)
  );
}
function drawListWeek(input) {
  console.log(input.text);
  const list = document.createElement('li');
  const listSpan = document.createElement('span');
  const span = document.createElement('span');
  const deleteButton = document.createElement('button');
  deleteButton.addEventListener('click', clickDeleteButtonWeek);
  listSpan.textContent = '💪';
  deleteButton.textContent = '🗑️';
  list.id = input.id;
  list.classList.add('list-item');
  span.textContent = input.text;
  list.append(listSpan, span, deleteButton);
  $weeklist.append(list);
}
function clickSubmitButtonWeek(event) {
  event.preventDefault();
  if (Object.is(parseInt($weekInput.value), NaN)) {
    const input = {
      id: Date.now(),
      text: $weekInput.value,
    };
    drawListWeek(input);
    localStorageRememberWeekGoal.push(input);
    saveLocalWeek(localStorageRememberWeekGoal);
    $weekInput.value = '';
  } else {
    $weekInput.value = '';
    $errorMessage.classList.toggle('displayChange');
    setTimeout(() => {
      $errorMessage.classList.toggle('displayChange');
    }, 2000);
  }
}

$weeklistform.addEventListener('submit', clickSubmitButtonWeek);

const localStoragUserGetWeek = JSON.parse(localStorage.getItem('userWeek'));
if (localStoragUserGetWeek) {
  localStorageRememberWeekGoal = localStoragUserGetWeek;
  if (localStoragUserGetWeek.length > 0) {
    localStoragUserGetWeek.forEach(drawListWeek);
  }
}
