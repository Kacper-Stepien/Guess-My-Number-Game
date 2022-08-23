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
let game_on;
let trials;
let highscore;
let randomNumber;

const startNewGame = function () {
    inputNumber.disabled = false;
    game_on = true;
    trials = 20;
    randomNumber = Math.floor(Math.random() * 100) + 1;
    highscore = localStorage.getItem('guess-number-highscore') === null ? 0 : localStorage.getItem('guess-number-highscore');

    message.textContent = "🛫 Start guessing...";
    scoreInfo.textContent = `💯 Score: ${trials}`;
    highscoreInfo.textContent = `🥇 Highscore: ${highscore}`;

    inputNumber.value = "";
    hiddenNumberText.textContent = "?";
    hiddenNumberBox.style.backgroundColor = '#3a86ff';
    title.style.color = '#fff'
};

const handleTheGame = function () {
    if (!game_on) return;

    if (inputNumber.value === '') {
        message.textContent = 'Enter a number from 1 to 100';
        return;
    }

    if (Number(inputNumber.value) === randomNumber) {
        trials--;
        handleTheWin();
        return;
    }

    if (Number(inputNumber.value) > randomNumber) {
        message.textContent = "Too High!";
        trials--;
    }

    if (Number(inputNumber.value) < randomNumber) {
        message.textContent = "Too Low!";
        trials--;
    }

    if (trials === 0) handleTheLose();

    scoreInfo.textContent = `💯 Score: ${trials}`;

};

const handleTheWin = function () {
    inputNumber.disabled = true;
    game_on = false;
    hiddenNumberText.textContent = randomNumber;
    hiddenNumberBox.style.backgroundColor = '#55a630';
    title.style.color = '#55a630'
    message.textContent = "You won! Congratulations!"

    if (trials > highscore) {
        saveHighscoreInLocalStorage();
        highscoreInfo.textContent = `🥇 Highscore: ${highscore}`;
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
    localStorage.setItem('guess-number-highscore', trials);
};

// Event Listeners
againBtn.addEventListener('click', startNewGame);

checkBtn.addEventListener('click', handleTheGame);


startNewGame();