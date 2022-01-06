// connect elements to html
const playBtn = document.getElementById("playBtn");
const rulesBtn = document.getElementById("rulesBtn");
const guessBtn = document.getElementById("guessBtn");

const rules = document.getElementById("rules");
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");
const guessLabel = document.getElementById("guessLabel");
const guessInput = document.getElementById("guessInput");
const highOrLow = document.getElementById("highOrLow");
const round = document.getElementById("round")

// score variables
let pScore = 0;
let compScore = 0;
let score1 = document.createElement("p");
let score2 = document.createElement("p");
score1.textContent = pScore;
score2.textContent = compScore;
playerScore.appendChild(score1);
computerScore.appendChild(score2);


// specify the number of rounds a user wants to play?
// increase each time there's a next round
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
        setTimeout(function() {
            displayMessage("You got a point! Enter a new number.")
        }, 100)
        

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
        updateRound()
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

    // max can't go over 100 and min can't go below 1
    // has to check whether the number has been used
    // if it has, choose another random num

    removeDisplay()
    checkGameOver()

    // have computer guess max divided by half
    // while (usedNums.includes(max) || usedNums.includes(min)) {
    //     //choose new random num
    //     computerGuess = Math.floor(Math.random() * max) + min;
    //     break;
    // } 
    

    console.log("Computer Guess: " + computerGuess)

    console.log(`Min: ${min}, Max: ${max}`)
    console.log("Random number: " + randNum)

    if (computerGuess > randNum) {

        // if (usedNums.includes(computerGuess)) {
        //     console.log(computerGuess + " already used")
        //     usedNums.splice(-1)
        //     computerGuess = Math.floor(Math.random() * (max + min) / 2);
        //     computerGuesses()
        // }

        // tell computer the number it entered is greater than random number

        max = Math.floor(computerGuess)
        usedNums.push(computerGuess)
        console.log(usedNums)

        checkNum()

       

    }
    if (computerGuess < randNum) {


        // if (usedNums.includes(computerGuess)) {
        //     console.log(computerGuess + " already used")
        //     usedNums.splice(-1)
        //     computerGuess = Math.floor(Math.random() * (max + min) / 2);
        //     computerGuesses()
        // }

        min = Math.floor(computerGuess)
        console.log("Min: " + min)
        usedNums.push(computerGuess)
        console.log(usedNums)
        checkNum()
        

        //     computerGuess = Math.floor(Math.random() * (max - min + 1) + min);
        //     console.log("next computer guess: " + computerGuess)
        //     console.log(randNum)

    }

    if (computerGuess === randNum) {

        compScore++;
        removeDisplay()
        setTimeout(function() {
            displayMessage("The computer guessed correctly. Enter a new number!")
        }, 100)
        score2.textContent = compScore;
        computerScore.appendChild(score2)
        randNum = Math.floor(Math.random() * 100)
        computerGuess = Math.floor(Math.random() * max) + min;
        max = 100;
        min = 1;
        usedNums = []
        guessInput.value = "";
        updateRound()
        checkGameOver()

    }

}

function checkNum() {
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
        guessInput.disabled = true;
        guessBtn.disabled = true;
        return;
    } else if (compScore === 5) {
        setTimeout(function() {
            displayMessage("The computer won. Game over. Would you like to play again?")
        }, 100)
        guessInput.disabled = true;
        guessBtn.disabled = true;
        return;
    }
}

function displayMessage(msg) {
    setTimeout(function () {
        message.textContent = msg;
        highOrLow.appendChild(message)
    }, 10)
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

function updateRound() {
    rounds++;
    element.textContent = rounds;
    round.appendChild(element)
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

