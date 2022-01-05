// how to play
// there is a random number chosen between 1-100
// the player and computer (or second player?) are playing against each other to guess the number
//  (optional) the players have a limited amount of tries (determined by difficulty level) to guess the number
// if the player guesses the numberbefore the computer does, than the player gets a point
// if the player and the computer both guess the number in the same amount of tries than none get points
// if the computer guesses before the player does, the computer gets a point
// whoever gets five points first, wins 
// ask if the player wants to play again

// connect buttons to javascript
const playBtn = document.getElementById("playBtn");
const rulesBtn = document.getElementById("rulesBtn");
const guessBtn = document.getElementById("guessBtn");

// connect other elements to js
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

    // removes message if there is one
    if (highOrLow.firstChild) {
        highOrLow.removeChild(highOrLow.firstChild)
    }
    // ends game if anyone gets 5 points
    if (pScore === 5 || compScore === 5) {
        alert("game over")
        guessInput.disabled = true;
        guessBtn.disabled = true;
        return;
    }

    let message = document.createElement("p")

    if (guess === "") {

        if (highOrLow.firstChild) {
            highOrLow.removeChild(highOrLow.firstChild)
        }
        setTimeout(function () {
            message.textContent = "Try again!"
            highOrLow.appendChild(message)
        }, 100)
        return;

    } else if (guess > randNum) {

        computerGuesses()

        if (highOrLow.firstChild) {
            highOrLow.removeChild(highOrLow.firstChild)
        }
        setTimeout(function () {
            message.textContent = "Guess lower"
            highOrLow.appendChild(message)
        }, 100)

    } else if (guess < randNum) {

        computerGuesses()

        if (highOrLow.firstChild) {
            highOrLow.removeChild(highOrLow.firstChild)
        }
        setTimeout(function () {
            message.textContent = "Guess higher"
            highOrLow.appendChild(message)
        }, 100)

    } else if (guess == randNum) {

        if (highOrLow.firstChild) {
            highOrLow.removeChild(highOrLow.firstChild)
        }
        setTimeout(function () {
            pScore++;
            alert("You got a point!")
            score1.textContent = pScore;
            playerScore.appendChild(score1)
            randNum = Math.floor(Math.random() * 100)
            computerGuess = Math.floor(Math.random() * 100);
            max = 100;
            min = 1;
            guessInput.value = "";
            usedNums = []

            if (highOrLow.firstChild) {
                highOrLow.removeChild(highOrLow.firstChild)
            }

            if (pScore === 5 || compScore === 5) {
                alert("game over")
                guessInput.disabled = true;
                guessBtn.disabled = true;
                return;
            }
        }, 150)

    } else {
        if (highOrLow.firstChild) {
            highOrLow.removeChild(highOrLow.firstChild)
        }
        setTimeout(function () {
            message.textContent = "Try again!"
            highOrLow.appendChild(message)
        }, 100)
        return;

    }
}


function computerGuesses() {

    if (highOrLow.firstChild) {
        highOrLow.removeChild(highOrLow.firstChild)
    }

    if (pScore === 5 || compScore === 5) {
        alert("game over")
        guessInput.disabled = true;
        guessBtn.disabled = true;
        return;
    }

    computerGuess = Math.floor(Math.random() * (max - min) + min);
    console.log(`Min: ${min}, Max: ${max}`)
    console.log("Random number: " + randNum)

    if (min === max) {
        min = 0;
        max = 100;
    }

    if (computerGuess > randNum) {

        console.log("current computer guess: " + computerGuess)

        if (usedNums.includes(computerGuess)) {
            console.log(computerGuess + " already used")
            usedNums.splice(-1)
            computerGuess = Math.floor(Math.random() * (max - min) + min);
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
            computerGuess = Math.floor(Math.random() * (max - min) + min);
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

        if (highOrLow.firstChild) {
            highOrLow.removeChild(highOrLow.firstChild)
        }

        if (pScore === 5 || compScore === 5) {
            alert("game over")
            guessInput.disabled = true;
            guessBtn.disabled = true;
            return;
        }

    }

}



//
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

