const statusElement = document.querySelector('.game__status');

let gameInProgress = true;
let currentTurn = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

const winMessage = () => `Player ${currentTurn} has won!`;
const tieMessage = () => `The game ended in a tie!`;
const turnMessage = () => `It's ${currentTurn}'s turn`;

statusElement.innerHTML = turnMessage();

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function cellPlayed(clickedCell, cellIndex) {
    boardState[cellIndex] = currentTurn;
    clickedCell.innerHTML = currentTurn;
}

function switchTurn() {
    currentTurn = currentTurn === "X" ? "O" : "X";
    statusElement.innerHTML = turnMessage();
}

function validateResult() {
    let isWon = false;
    for(let i = 0; i <= 7; i++) {
        const winCase = winConditions[i];
        const a = boardState[winCase[0]];
        const b = boardState[winCase[1]];
        const c = boardState[winCase[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            isWon = true;
            break
        }
    }

    if(isWon) {
        statusElement.innerHTML = winMessage();
        gameInProgress = false;
        return;
    }

    const isTie = !boardState.includes("");
    if(isTie) {
        statusElement.innerHTML = tieMessage();
        gameInProgress = false;
        return;
    }

    switchTurn();
}

function cellClicked(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if(boardState[cellIndex] !== "" || !gameInProgress)
        return;

    cellPlayed(clickedCell, cellIndex);
    validateResult();
}

function restartGame() {
    gameInProgress = true;
    currentTurn = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    statusElement.innerHTML = turnMessage();
    document.querySelectorAll('.game__cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.game__cell').forEach(cell => cell.addEventListener('click', cellClicked));
document.querySelector('.game__reset').addEventListener('click', restartGame);
