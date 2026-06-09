'use strict';

const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const numberEl = document.querySelector('.number');
const guessEl = document.querySelector('.guess');

const bodyEl = document.body;
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const highscoreEl = document.querySelector('.highscore');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let gameOver = false;
let score = 20;
let highscore = Number(localStorage.getItem('highscore')) || 0;
highscoreEl.textContent = highscore;

const displayMessage = function (message) {
  messageEl.textContent = message;
};

checkBtn.addEventListener('click', function () {
  if (gameOver) return;

  const guess = Number(guessEl.value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');
    return;

    // Range validation
  } else if (guess < 1 || guess > 20) {
    displayMessage('🚫 Enter a number between 1 and 20');
    return;

    // When player wins
  } else if (guess === secretNumber) {
    gameOver = true;

    displayMessage('🎉 Correct Number!');
    numberEl.textContent = secretNumber;

    bodyEl.style.backgroundColor = '#60b347';
    numberEl.style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore;
      localStorage.setItem('highscore', highscore);
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      scoreEl.textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      scoreEl.textContent = 0;
      gameOver = true;
    }
  }
});

againBtn.addEventListener('click', function () {
  gameOver = false;

  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage('Start guessing...');
  scoreEl.textContent = score;
  numberEl.textContent = '?';
  guessEl.value = '';

  bodyEl.style.backgroundColor = '#222';
  numberEl.style.width = '15rem';
});

guessEl.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    checkBtn.click();
  }

  if (['e', 'E', '.', '-'].includes(e.key)) {
    e.preventDefault();
  }
});
