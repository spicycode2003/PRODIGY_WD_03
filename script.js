document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    const playerVsPlayerButton = document.getElementById('playerVsPlayer');
    const playerVsAIButton = document.getElementById('playerVsAI');

    let currentPlayer = 'X';
    let gameActive = false;
    let againstAI = false;
    const boardState = Array(9).fill(null);

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (boardState[cellIndex] !== null || !gameActive) {
            return;
        }

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (againstAI && gameActive && currentPlayer === 'O') {
            aiMove();
        }
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            message.textContent = `Player ${currentPlayer} has won!`;
            gameActive = false;
            return;
        }

        if (!boardState.includes(null)) {
            message.textContent = "It's a draw!";
            gameActive = false;
            return;
        }

        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    function aiMove() {
        const emptyCells = boardState
            .map((cell, index) => (cell === null ? index : null))
            .filter(index => index !== null);

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        boardState[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        checkResult();
        currentPlayer = 'X';
    }

    function resetGame() {
        currentPlayer = 'X';
        gameActive = false;
        againstAI = false;
        boardState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        message.textContent = '';
    }

    function startGame(againstAIOption) {
        againstAI = againstAIOption;
        gameActive = true;
        currentPlayer = 'X';
        boardState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    playerVsPlayerButton.addEventListener('click', () => startGame(false));
    playerVsAIButton.addEventListener('click', () => startGame(true));
});
