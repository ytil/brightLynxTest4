class ChessCell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // ----+---+---+---+----
  // |   | 7 |   | 8 |   |
  // +-------------------+
  // | 6 |   |   |   | 1 |
  // +-------------------+
  // |   |   | N |   |   |
  // +-------------------+
  // | 5 |   |   |   | 2 |
  // +-------------------+
  // |   | 4 |   | 3 |   |
  // ----+---+---+---+----
  getAllPossibleKnightMoves() {
    const moves = [];
    moves.push({ x: this.x + 2, y: this.y - 1 });
    moves.push({ x: this.x + 2, y: this.y + 1 });
    moves.push({ x: this.x + 1, y: this.y + 2 });
    moves.push({ x: this.x - 1, y: this.y + 2 });
    moves.push({ x: this.x - 2, y: this.y + 1 });
    moves.push({ x: this.x - 2, y: this.y - 1 });
    moves.push({ x: this.x - 1, y: this.y - 2 });
    moves.push({ x: this.x + 1, y: this.y - 2 });

    const legalMoves = moves.filter((move) => {
      const { x, y } = move;
      return x >= 0 && x <= 7 && y >= 0 && y <= 7;
    });

    return legalMoves;
  }
}

const board = document.getElementById('game-board');

let lastTargetCell = null;
let lastKnightCells = null;

// reset bg on the previous action cells
function resetLastActionCells() {
  if (lastKnightCells === null) return;

  lastTargetCell.style.backgroundColor = '';
  lastKnightCells.forEach((cell) => {
    const tableCell = board.rows[cell.y].cells[cell.x];
    tableCell.style.backgroundColor = '';
  });
}

board.addEventListener('click', (event) => {
  resetLastActionCells();

  // if target is not TD return
  let target = event.target;
  while (target !== this) {
    if (target.tagName === 'TD') break;
    target = target.parentNode;
  }
  if (target.tagName === 'TABLE') return;

  // set bg to blue on the target cell
  target.style.backgroundColor = 'blue';
  lastTargetCell = target;

  const coordX = target.cellIndex;
  const coordY = target.parentNode.rowIndex;

  // initialize chess cell from current coords and calculate knight moves
  const targetChessCell = new ChessCell(coordX, coordY);
  const knightMoves = targetChessCell.getAllPossibleKnightMoves();

  // set bg to green on the knight cells
  knightMoves.forEach((coords) => {
    const tableCell = board.rows[coords.y].cells[coords.x];
    tableCell.style.backgroundColor = 'green';
  });

  // memoize knight cells
  lastKnightCells = knightMoves;
});
