// 타이머 기능, 최근 공부한 시간 볼 수 있는 기능 코드 js
const $timeStart = document.querySelector('#start');
const $timeStop = document.querySelector('#stop');
const $timeReset = document.querySelector('#reset');
const $timeSave = document.querySelector('#save');
const $time = document.querySelector('#time');
const $timeRank = document.querySelector('#timeRank');
const $currentTimeRank = document.querySelector('#currentTimeRank');

const $oneDayAgo = document.querySelector('#oneDayAgo');
const $twoDayAgo = document.querySelector('#twoDayAgo');
const $threeDayAgo = document.querySelector('#threeDayAgo');

let hour = 0;
let min = 0;
let second = 0;
let timerKey;
let localStorageRememberTime = [];

function clickStartButton() {
  timerKey = setInterval(() => {
    second += 1;
    if (second === 60) {
      min += 1;
      second = 0;
    }
    if (min === 60) {
      hour += 1;
      min = 0;
    }

    $time.textContent = `${String(hour).padStart(2, '0')}:${String(
      min
    ).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  }, 1000);
}
$timeStart.addEventListener('click', clickStartButton);
function clickStopButton() {
  clearInterval(timerKey);
}
$timeStop.addEventListener('click', clickStopButton);

function clickResetButton() {
  clearInterval(timerKey);
  $time.textContent = '00:00:00';
  hour = 0;
  min = 0;
  second = 0;
}
$timeReset.addEventListener('click', clickResetButton);

function clickSaveButton() {
  localStorageRememberTime.push($time.textContent);
  if (localStorageRememberTime.length > 3) {
    localStorageRememberTime = localStorageRememberTime.splice(1, 3);
  }
  localStorage.setItem(
    'userTimeRank',
    JSON.stringify(localStorageRememberTime)
  );

  localStorageRememberTime.forEach((element, index) => {
    if (index === 0) {
      $oneDayAgo.textContent = `1일 전 : ${element}`;
    } else if (index === 1) {
      $twoDayAgo.textContent = `2일 전 : ${element}`;
    } else if (index === 2) {
      $threeDayAgo.textContent = `3일 전 : ${element}`;
    }
  });
}
$timeSave.addEventListener('click', clickSaveButton);

function clickCurrentTimeRankButton() {
  $timeRank.classList.toggle('displayChange');
}

$currentTimeRank.addEventListener('click', clickCurrentTimeRankButton);

const localStoragUserGetTimeRank = JSON.parse(
  localStorage.getItem('userTimeRank')
);

if (localStoragUserGetTimeRank) {
  localStorageRememberTime = localStoragUserGetTimeRank;
  localStoragUserGetTimeRank.forEach((element, index) => {
    console.log(element);
    if (index === 0) {
      $oneDayAgo.textContent = `1일 전 : ${element}`;
    } else if (index === 1) {
      $twoDayAgo.textContent = `2일 전 : ${element}`;
    } else if (index === 2) {
      $threeDayAgo.textContent = `3일 전 : ${element}`;
    }
  });
}
