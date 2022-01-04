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


function play() {
    alert("clicked")
}

function showRules() {
    if(rules.firstChild) {
        rules.removeChild(rules.firstChild)
        return;
    } 
    let howToPlay = document.createElement("p")
    howToPlay.textContent = "A random number is chosen between 1-100. Compete against the computer to guess the number. Whoever guesses the number first, gets a point. Whoever reaches 5 points first, wins."
    rules.appendChild(howToPlay)
}


playBtn.addEventListener("click", play)
rulesBtn.addEventListener("click", showRules)
