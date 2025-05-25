const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      gameActive = false;
      resultMessage.textContent = `${currentPlayer} wins!`;
      resultScreen.style.display = 'block';
      return;
    }
  }

  if (!boardState.includes('')) {
    gameActive = false;
    resultMessage.textContent = 'It\'s a draw!';
    resultScreen.style.display = 'block';
  }
};

const handleCellClick = (index) => {
  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  checkWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

const resetGame = () => {
  gameActive = true;
  currentPlayer = 'X';
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  statusDiv.textContent = '';
  resultScreen.style.display = 'none';
};

const newGame = () => {
  resetGame();
  resultScreen.style.display = 'none';
};
