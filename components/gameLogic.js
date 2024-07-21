import { PAWN, ROOK, BISHOP, KNIGHT, QUEEN } from "./constants";

export function isValidMove(from, to, piece) {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  switch (piece) {
    case PAWN:
      return rowDiff === 1 && colDiff === 0;
    case ROOK:
      return (rowDiff === 0 && colDiff > 0) || (colDiff === 0 && rowDiff > 0);
    case BISHOP:
      return rowDiff === colDiff;
    case KNIGHT:
      return (
        (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)
      );
    case QUEEN:
      return (
        (rowDiff === 0 && colDiff > 0) ||
        (colDiff === 0 && rowDiff > 0) ||
        rowDiff === colDiff
      );
    default:
      return false;
  }
}

export function checkWin(board) {
  const lines = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (
      board[a[0]][a[1]] &&
      board[a[0]][a[1]].color === board[b[0]][b[1]]?.color &&
      board[a[0]][a[1]].color === board[c[0]][c[1]]?.color
    ) {
      return board[a[0]][a[1]].color;
    }
  }

  return null;
}
