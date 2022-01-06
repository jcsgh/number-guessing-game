// how to play
// there is a random number chosen between 1-100
// the player and computer (or second player?) are playing against each other to guess the number
//  (optional) the players have a limited amount of tries (determined by difficulty level) to guess the number
// if the player guesses the numberbefore the computer does, than the player gets a point
// if the player and the computer both guess the number in the same amount of tries than none get points
// if the computer guesses before the player does, the computer gets a point
// whoever gets five points first, wins 
// ask if the player wants to play again

// connect elements to javascript
const playBtn = document.getElementById("playBtn");
const rulesBtn = document.getElementById("rulesBtn");
const guessBtn = document.getElementById("guessBtn");

const rules = document.getElementById("rules");
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");
const guessLabel = document.getElementById("guessLabel");
const guessInput = document.getElementById("guessInput");
const highOrLow = document.getElementById("highOrLow");

// score variables
let pScore = 0;
let compScore = 0;
let score1 = document.createElement("p");
let score2 = document.createElement("p");
score1.textContent = pScore;
score2.textContent = compScore;
playerScore.appendChild(score1);
computerScore.appendChild(score2);

// other variables
let usedNums = [];
let randNum = Math.floor(Math.random() * 100);
let computerGuess;
let max = 100;
let min = 1;
let message = document.createElement("p")

// disables player from inputting a number
guessInput.disabled = true;
guessBtn.disabled = true;

function play() {

    playBtn.disabled = true;
    guessInput.disabled = false;
    guessBtn.disabled = false;
    if (rules.firstChild) {
        rules.removeChild(rules.firstChild);
    }

}

function playerGuess() {

    let guess = guessInput.value;

    removeDisplay()
    checkGameOver()

    if (guess === "") {
        removeDisplay()
        displayMessage("Try again!")
        return;
    } else if (guess > randNum) {
        computerGuesses()
        removeDisplay()
        displayMessage("Guess lower")
        return;
    } else if (guess < randNum) {
        computerGuesses()
        removeDisplay()
        displayMessage("Guess higher")
        return;
    } else if (guess == randNum) {
        removeDisplay()
        displayMessage("You got a point! Enter a new number.")

        pScore++;
        score1.textContent = pScore;
        playerScore.appendChild(score1)
        randNum = Math.floor(Math.random() * 100)
        computerGuess = Math.floor(Math.random() * 100);
        max = 100;
        min = 1;
        guessInput.value = "";
        usedNums = []
        removeDisplay()
        checkGameOver()
        return;
    } else {
        removeDisplay()
        displayMessage("Try again!")
        return;
    }
}


function computerGuesses() {

    // x and y
    // if the num that the computer guesses is greater than the random number 
    // let x be the new max num?
    // if lower, let y be the new min?


    removeDisplay()
    checkGameOver()

    computerGuess = Math.floor(Math.random() * (max - min) - min);
    console.log(`Min: ${min}, Max: ${max}`)
    console.log("Random number: " + randNum)

    if (computerGuess > randNum) {

        console.log("current computer guess: " + computerGuess)

        if (usedNums.includes(computerGuess)) {
            console.log(computerGuess + " already used")
            usedNums.splice(-1)
            computerGuess = Math.floor(Math.random() * (max + min) / 2);
            computerGuesses()
        }

        usedNums.push(computerGuess)
        console.log(usedNums)

        max = computerGuess;

    }
    if (computerGuess < randNum) {

        console.log("current computer guess: " + computerGuess)


        if (usedNums.includes(computerGuess)) {
            console.log(computerGuess + " already used")
            usedNums.splice(-1)
            computerGuess = Math.floor(Math.random() * (max + min) / 2);
            computerGuesses()
        }

        usedNums.push(computerGuess)
        console.log(usedNums)

        min = computerGuess;


        //     computerGuess = Math.floor(Math.random() * (max - min + 1) + min);
        //     console.log("next computer guess: " + computerGuess)
        //     console.log(randNum)

    }

    if (computerGuess === randNum) {

        console.log("current computer guess: " + computerGuess)

        compScore++;
        alert("Computer got a point")
        score2.textContent = compScore;
        computerScore.appendChild(score2)
        randNum = Math.floor(Math.random() * 100)
        computerGuess = Math.floor(Math.random() * 100);
        max = 100;
        min = 1;
        guessInput.value = "";
        usedNums = []

        removeDisplay()
        checkGameOver()

    }

}

function checkGameOver() {
    if (pScore === 5 || compScore === 5) {
        alert("game over")
        guessInput.disabled = true;
        guessBtn.disabled = true;
        return;
    }
}

function displayMessage(msg) {
    setTimeout(function () {
        message.textContent = msg;
        highOrLow.appendChild(message)
    }, 100)
}

function removeDisplay() {
    if (highOrLow.firstChild) {
        highOrLow.removeChild(highOrLow.firstChild)
    }

}

function showRules() {
    if (rules.firstChild) {
        rules.removeChild(rules.firstChild);
        return;
    }
    let howToPlay = document.createElement("p")
    howToPlay.textContent = "A random number is chosen between 1-100. Compete against the computer to guess the number. Whoever guesses the number first, gets a point. Whoever reaches 5 points first, wins."
    rules.appendChild(howToPlay)
}

// function hide() {
//     playerScore.style.display = "none";
//     computerScore.style.display = "none";
//     guessInput.style.display = "none";
//     guessLabel.style.display = "none";
// }

// function show() {
//     playerScore.style.display = "block";
//     computerScore.style.display = "block";
//     guessInput.style.display = "block";
//     guessLabel.style.display = "block";
// }


playBtn.addEventListener("click", play)
rulesBtn.addEventListener("click", showRules)
guessBtn.addEventListener("click", playerGuess)

