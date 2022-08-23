'use strict';

const againBtn = document.getElementById('start-again-btn');
const inputNumber = document.getElementById('guess-input');
const checkBtn = document.getElementById('check-btn');
const message = document.getElementById('message');
const scoreInfo = document.getElementById('score-label');
const highscoreInfo = document.getElementById('highscore-label');
const hiddenNumberBox = document.getElementById('hidden-number');
const hiddenNumberText = document.getElementById('hidden-number-text');
const title = document.getElementById('header-title');


// Global variables
let trials = 20;
let game_on;
let score;
let highscore;
let randomNumber;

const startNewGame = function () {
    inputNumber.disabled = false;
    game_on = true;
    score = trials;
    randomNumber = Math.floor(Math.random() * trials) + 1;
    highscore = localStorage.getItem('guess-number-highscore') === null ? 0 : localStorage.getItem('guess-number-highscore');

    hiddenNumberBox.classList.remove('hidden-number-win');
    message.textContent = "🛫 Start guessing...";
    updateUI();

    inputNumber.value = "";
    hiddenNumberText.textContent = "?";
    hiddenNumberBox.style.backgroundColor = '#3a86ff';
    title.style.color = '#fff'
};

const updateUI = function () {
    highscoreInfo.textContent = `🥇 Highscore: ${highscore}`;
    scoreInfo.textContent = `💯 Score: ${score}`;
};

const handleTheGame = function () {
    if (!game_on) return;

    if (inputNumber.value === '') {
        message.textContent = 'Enter a number from 1 to 100';
        return;
    }

    if (Number(inputNumber.value) === randomNumber) {
        score--;
        updateUI();
        handleTheWin();
        return;
    }

    if (Number(inputNumber.value) > randomNumber) {
        message.textContent = "Too High!";
        score--;
    }

    if (Number(inputNumber.value) < randomNumber) {
        message.textContent = "Too Low!";
        score--;
    }

    if (score === 0) handleTheLose();

    updateUI();

};

const handleTheWin = function () {
    inputNumber.disabled = true;
    game_on = false;
    hiddenNumberText.textContent = randomNumber;
    hiddenNumberBox.style.backgroundColor = '#55a630';
    hiddenNumberBox.classList.add('hidden-number-win');
    title.style.color = '#55a630'
    message.textContent = "You won! Congratulations!"
    updateUI();

    if (score > highscore) {
        saveHighscoreInLocalStorage();
    }
};

const handleTheLose = function () {
    inputNumber.disabled = true;
    game_on = false;
    hiddenNumberText.textContent = randomNumber;
    hiddenNumberBox.style.backgroundColor = '#d52941';
    title.style.color = '#d52941'
    message.textContent = "😥 You Lost! Try again!"
};

const saveHighscoreInLocalStorage = function () {
    localStorage.setItem('guess-number-highscore', score);
};

// Event Listeners
againBtn.addEventListener('click', startNewGame);

checkBtn.addEventListener('click', handleTheGame);


startNewGame();