const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = 'X';
let gameActive = true;
const cells = [];

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent) {
      gameActive = false;
      status.textContent = `Player ${cells[a].textContent} wins! 🎉`;
      return;
    }
  }
  if ([...cells].every(cell => cell.textContent)) {
    gameActive = false;
    status.textContent = "It's a draw!";
  }
}

function handleCellClick(e) {
  if (!gameActive || e.target.textContent) return;
  e.target.textContent = currentPlayer;
  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Current Turn: ${currentPlayer}`;
  }
}

function resetGame() {
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Current Turn: ${currentPlayer}`;
}

// Initialize board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', handleCellClick);
  board.appendChild(cell);
  cells.push(cell);
}

resetBtn.addEventListener('click', resetGame);
