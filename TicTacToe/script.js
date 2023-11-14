const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            cells[a].textContent &&

            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            gameActive = false;
            status.textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent)) {
        gameActive = false;
        status.textContent = "It's a draw!";
    }
}

function handleCellClick(e) {
    const cell = e.target;

    if (cell.textContent || !gameActive) return;

    cell.textContent = currentPlayer;
    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
