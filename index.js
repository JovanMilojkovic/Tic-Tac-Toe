// Constants
const playerX = "X";
const playerO = "O";
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// DOM Elements
const boxes = Array.from(document.querySelectorAll(".box"));
const playerDisplay = document.querySelector(".display-player");
const resetButton = document.querySelector("#reset");
const playerVsAiButton = document.querySelector("#ai");
const winnerText = document.querySelector(".message");
const winnerModel = document.querySelector(".model");
const restartGameButton = document.querySelector("#restartGame");

// Game State
let currentPlayer = playerX;
let boxClickedCounter = 0;

// Event Listeners
resetButton.addEventListener("click", resetGame);
playerVsAiButton.addEventListener("click", getRandomAiMove);
restartGameButton.addEventListener("click", restartGame);

// Functions
function startGame(boxes) {
    boxes.forEach((box) =>
        box.addEventListener("click", () => boxClicked(box))
    );
}

function boxClicked(box) {
    if (box.innerText === "") {
        updateGame(box);
    }
}

function updateGame(box) {
    boxClickedCounter++;
    box.innerText = currentPlayer;
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
    box.style.color = currentPlayer === playerX ? "green" : "red";
    playerDisplay.innerText = currentPlayer;

    if (checkWinner()) {
        gameOver(box.innerText);
    } else if (boxClickedCounter === 9 && !checkWinner()) {
        gameTied();
    }
}

function checkWinner() {
    return winningCombination.some((combination) => {
        const [a, b, c] = combination;
        return (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        );
    });
}

function gameTied() {
    displayMessage("It's tied, please try again 🙃");
}

function gameOver(player) {
    displayMessage(`Congratulation Player ${player}`);
}

function displayMessage(message) {
    winnerText.innerHTML = `<h3 class="message">${message}</h3>`;
    winnerModel.classList.add("visible");
    resetButton.classList.add("model-visible");
    resetButton.disabled = true;
    playerVsAiButton.classList.add("model-visible");
    playerVsAiButton.disabled = true;
}

function resetGame() {
    boxes.forEach((box) => (box.innerText = ""));
    currentPlayer = playerX;
    playerDisplay.innerText = playerX;
    boxClickedCounter = 0;
}

function restartGame() {
    resetGame();
    winnerModel.classList.remove("visible");
    resetButton.classList.remove("model-visible");
    resetButton.disabled = false;
    playerVsAiButton.classList.remove("model-visible");
    playerVsAiButton.disabled = false;
}

function getRandomAiMove() {
    const emptyBoxes = boxes.filter((box) => box.innerText === "");
    if (emptyBoxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        updateGame(emptyBoxes[randomIndex]);

        if (boxClickedCounter === 9 && !checkWinner()) {
            gameTied();
        }
    }
}

startGame(boxes);
