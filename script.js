const playBtn = document.getElementById("playBtn");
const rulesBtn = document.getElementById("rulesBtn");
const guessBtn = document.getElementById("guessBtn");
const yesBtn = document.getElementById("yes")
const noBtn = document.getElementById("no")

const rules = document.getElementById("rules");
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");
const guessLabel = document.getElementById("guessLabel");
const guessInput = document.getElementById("guessInput");
const higherOrLower = document.getElementById("higherOrLower");
const round = document.getElementById("round")
const computerStatus = document.getElementById("computerStatus")

let status = document.createElement("p");

// score variables
let pScore = 0;
let compScore = 0;
let score1 = document.createElement("p");
let score2 = document.createElement("p");
score1.textContent = pScore;
score2.textContent = compScore;
playerScore.appendChild(score1);
computerScore.appendChild(score2);

let element = document.createElement("p")
let rounds = 0;
element.textContent = rounds;
round.appendChild(element)

// other variables
let max = 100;
let min = 1;

let randNum = Math.floor(Math.random() * 100);
let computerGuess = Math.floor(Math.random() * max) + min;

let usedNums = [];
let message = document.createElement("p")

// disables player from inputting a number
guessInput.disabled = true;
guessBtn.disabled = true;

hideYesAndNoBtns()

function play() {

    pScore = 0;
    compScore = 0;
    rounds = 0;
    element.textContent = rounds;
    score1.textContent = pScore;
    score2.textContent = compScore;
    max = 100;
    min = 1;
    randNum = Math.floor(Math.random() * 100);
    computerGuess = Math.floor(Math.random() * max) + min;
    usedNums = [];
    guessInput.value = "";

    removeDisplayMessage()
    hideYesAndNoBtns()
    computerGuesses()

    playBtn.disabled = true;
    guessInput.disabled = false;
    guessBtn.disabled = false;
    if (rules.firstChild) {
        rules.removeChild(rules.firstChild);
    }

}

// add win streak 

function playerGuess() {

    let guess = guessInput.value;

    removeDisplayMessage()
    checkGameOver()

    if (guess === "") {
        removeDisplayMessage()
        displayMessage("Try again!")
        return;
    } else if (guess > randNum) {
        computerGuesses()
        removeDisplayMessage()
        displayMessage("Guess lower")
        return;
    } else if (guess < randNum) {
        computerGuesses()
        removeDisplayMessage()
        displayMessage("Guess higher")
        return;
    } else if (guess == randNum) {
        updatePlayerScore()
        removeDisplayMessage()
        setTimeout(function() {
            displayMessage(`You got a point! The number was ${randNum}. Enter a new number.`)
        }, 100)
        setTimeout(function() {
            randNum = Math.floor(Math.random() * 100)
        }, 110)
        

        computerGuess = Math.floor(Math.random() * 100);
        max = 100;
        min = 1;
        guessInput.value = "";
        usedNums = []
        removeDisplayMessage()
        checkGameOver()
        updateRound()
        return;
    } else {
        removeDisplayMessage()
        displayMessage("Try again!")
        return;
    }
}


function computerGuesses() {


    removeDisplayMessage()
    checkGameOver()
    displayComputerStatus()
  
    

    console.log("Computer Guess: " + computerGuess)

    console.log(`Min: ${min}, Max: ${max}`)
    console.log("Random number: " + randNum)

    if (computerGuess > randNum) {
    
        max = Math.floor(computerGuess)
        usedNums.push(computerGuess)
        console.log(usedNums)

        checkRandNum()

    }
    if (computerGuess < randNum) {

        min = Math.floor(computerGuess)
        console.log("Min: " + min)
        usedNums.push(computerGuess)
        console.log(usedNums)
        checkRandNum()
    
    }

    if (computerGuess === randNum) {
        updateComputerScore()
        removeDisplayMessage()
        setTimeout(function() {
            displayMessage(`The computer guessed correctly. The number was ${randNum}. Enter a new number!`)
        }, 100)
        setTimeout(function() {
            randNum = Math.floor(Math.random() * 100)
        }, 110)
        
        computerGuess = Math.floor(Math.random() * max) + min;
        max = 100;
        min = 1;
        usedNums = []
        guessInput.value = "";
        updateRound()
        checkGameOver()

    }

}

function checkRandNum() {
    computerGuess = Math.floor(Math.random() * max / 2) + min;
    for(let i = 0; i <= usedNums.length; i++) {
        if (usedNums[i] === computerGuess || computerGuess > 100) {
            computerGuess = Math.floor(Math.random() * max / 2) + min;
        }
    }
    return computerGuess;
}

function checkGameOver() {
    if (pScore === 5) {
        setTimeout(function() {
            displayMessage("You won! Game over. Would you like to play again?")
        }, 100)
        showYesAndNoBtns()
        guessInput.disabled = true;
        guessBtn.disabled = true;
        return;
    } else if (compScore === 5) {
        setTimeout(function() {
            displayMessage("The computer won. Game over. Would you like to play again?")
        }, 100)
        showYesAndNoBtns()
        guessInput.disabled = true;
        guessBtn.disabled = true;
        return;
    }
}

function displayMessage(msg) {
    setTimeout(function () {
        message.textContent = msg;
        higherOrLower.appendChild(message)
    }, 10)
}

function removeDisplayMessage() {
    if (higherOrLower.firstChild) {
        higherOrLower.removeChild(higherOrLower.firstChild)
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

function updateRound() {
    rounds++;
    element.textContent = rounds;
    round.appendChild(element)
}

function updatePlayerScore() {
    pScore++;
    score1.textContent = pScore;
    playerScore.appendChild(score1)
}

function updateComputerScore() {
    compScore++;
    score2.textContent = compScore;
    computerScore.appendChild(score2)
}

function displayComputerStatus() {
    let randTime = Math.floor(Math.random() * 2000)
    status.textContent = "Computer is thinking...";
    computerStatus.appendChild(status);
    setTimeout(function() {
        status.textContent = "Computer chose a number.";
        computerStatus.appendChild(status);
    }, randTime)
}

function hideYesAndNoBtns() {
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
}

function showYesAndNoBtns() {
    yesBtn.style.display = "block";
    noBtn.style.display = "block";
}

function endGame() {
    displayMessage("Hope you had fun!")
    hideYesAndNoBtns()
}

playBtn.addEventListener("click", play)
rulesBtn.addEventListener("click", showRules)
guessBtn.addEventListener("click", playerGuess)
yesBtn.addEventListener("click", play)
noBtn.addEventListener("click", endGame)

