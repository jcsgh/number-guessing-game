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


// connect other elements to js
const rules = document.getElementById("rules")
const playerScore = document.getElementById("playerScore")
const computerScore = document.getElementById("computerScore")
const guessLabel = document.getElementById("guessLabel")
const guessInput = document.getElementById("guessInput")

// disables player from inputting a number
guessInput.disabled = true;

let randNum = Math.floor(Math.random() * 100)

function play() {

    playBtn.disabled = true;
    guessInput.disabled = false;
    if(rules.firstChild) {
        rules.removeChild(rules.firstChild);
    }

    console.log(randNum)

    // computer chooses random number
    // player types random number into input and stores value
    // if number that player chooses is greater than random number
    // say that the number is smaller
    // else if the number the player chooses is less than the rand num
    // say that the num is larger
    // else if either computer or user picks the correct number
    // add points to points 
    // 
}

function showRules() {
    if(rules.firstChild) {
        rules.removeChild(rules.firstChild);
        return;
    } 
    let howToPlay = document.createElement("p")
    howToPlay.textContent = "A random number is chosen between 1-100. Compete against the computer to guess the number. Whoever guesses the number first, gets a point. Whoever reaches 5 points first, wins."
    rules.appendChild(howToPlay)
}

function hide() {
    playerScore.style.display = "none";
    computerScore.style.display = "none";
    guessInput.style.display = "none";
    guessLabel.style.display = "none";
}

function show() {
    playerScore.style.display = "block";
    computerScore.style.display = "block";
    guessInput.style.display = "block";
    guessLabel.style.display = "block";
}


playBtn.addEventListener("click", play)
rulesBtn.addEventListener("click", showRules)
