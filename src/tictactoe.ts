type Player = 1 | 2;
type Cell = Player | null;
type Row = Cell[];
type Columns = Cell[];
type Diagonals = Cell[];
type Board = Row[];

const initialBoard: Board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function getDiagonals(board: Board): Diagonals[] {
  return [board.map((row, y) => row[y]), board.map((row, y) => row[2 - y])];
}
function getColumns(board: Board): Columns[] {
  return board.map((row, y) => row.map((_, x) => board[x][y]));
}
function getRows(board: Board): Row[] {
  return board;
}

function getOwner(cells: Cell[]): Player | null {
  return cells.every((cell) => cell !== null && cell === cells[0])
    ? cells[0]
    : null;
}

function getWinner(board: Board): Player | null {
  const diagonals = getDiagonals(board);
  const columns = getColumns(board);
  const rows = getRows(board);

  return [...diagonals, ...columns, ...rows].reduce<Player | null>(
    (winner, cells) => {
      return winner || getOwner(cells);
    },
    null
  );
}

function isEven(n: number): boolean {
  return n % 2 === 0;
}

function getNextPlayer(board: Board): Player {
  const getEmptyCellCount = (row: Row): number =>
    row.filter((cell) => cell === null).length;

  const emptyCellsCount = board.reduce(
    (sum, row) => sum + getEmptyCellCount(row),
    0
  );

  return isEven(emptyCellsCount) ? 2 : 1;
}

function play(board: Board, x: number, y: number): Board {
  if (!getWinner(board) && !board[y][x]) {
    return board.map((row, rowY) =>
      rowY === y
        ? row.map((cell, cellX) => (cellX === x ? getNextPlayer(board) : cell))
        : row
    );
  }
  return board;
}

export { initialBoard, play, getNextPlayer, Row, Cell, Board, getWinner };
