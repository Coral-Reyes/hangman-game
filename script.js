const words = [
    "sheriff", "cowboy", "saloon", "bandit", "desperado",
    "outlaw", "cactus", "buffalo", "spurs", "stagecoach",
    "revolver", "mustang", "saddle", "lasso", "tumbleweed"
];
let selectedWord = "";
let displayedWord = "";
let attempts = 7; 
const wordDisplay = document.getElementById("wordDisplay");
const messageDisplay = document.getElementById("message");
const hangmanImage = document.getElementById("hangmanImage");

function initializeGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = "_".repeat(selectedWord.length);
    wordDisplay.innerText = displayedWord.split("").join(" ");
    messageDisplay.innerText = `Attempts remaining: ${attempts}`;
    document.getElementById("keyboard").innerHTML = "";
    attempts = 7; // Reset attempts to 7
    updateHangmanImage();

    // Generate keyboard buttons
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.innerText = letter;
        button.onclick = () => handleGuess(letter.toLowerCase());
        document.getElementById("keyboard").appendChild(button);
    }
}

function handleGuess(letter) {
    if (selectedWord.includes(letter)) {
        let newDisplay = "";
        for (let i = 0; i < selectedWord.length; i++) {
            newDisplay += selectedWord[i] === letter ? letter : displayedWord[i];
        }
        displayedWord = newDisplay;
        wordDisplay.innerText = displayedWord.split("").join(" ");
        if (!displayedWord.includes("_")) {
            messageDisplay.innerText = "Yeehaw! You guessed it!";
            disableButtons();
        }
    } else {
        attempts--;
        messageDisplay.innerText = `Attempts remaining: ${attempts}`;
        updateHangmanImage();
        if (attempts <= 0) {
            messageDisplay.innerText = `Game Over, Partner! The word was "${selectedWord}".`;
            disableButtons();
        }
    }
}

function disableButtons() {
    const buttons = document.getElementById("keyboard").getElementsByTagName("button");
    for (let button of buttons) {
        button.disabled = true;
    }
}

function updateHangmanImage() {
    hangmanImage.innerHTML = `<img src="images/western_hangman${7 - attempts}.png" alt="Hangman Image">`;
}

document.getElementById("submitGuess").onclick = () => {
    const input = document.getElementById("guessInput").value.toLowerCase();
    if (input) {
        handleGuess(input);
        document.getElementById("guessInput").value = "";
    }
};

document.getElementById("newGame").onclick = () => {
    initializeGame();
};

initializeGame();
