import { PAWN, ROOK, BISHOP, KNIGHT, QUEEN, WHITE, BLACK } from "./constants";

export function isValidMove(from, to, piece, color, board) {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  const absRowDiff = Math.abs(rowDiff);
  const absColDiff = Math.abs(colDiff);

  // Check if the destination square is occupied by a piece of the same color
  if (board[toRow][toCol] && board[toRow][toCol].color === color) {
    return false;
  }

  switch (piece) {
    case PAWN:
      if (color === WHITE) {
        // White pawns move up (negative row difference)
        if (rowDiff === -1 && colDiff === 0 && !board[toRow][toCol]) {
          return true; // Regular move
        }
        if (rowDiff === -1 && absColDiff === 1 && board[toRow][toCol]) {
          return true; // Capture diagonally
        }
      } else {
        // Black pawns move down (positive row difference)
        if (rowDiff === 1 && colDiff === 0 && !board[toRow][toCol]) {
          return true; // Regular move
        }
        if (rowDiff === 1 && absColDiff === 1 && board[toRow][toCol]) {
          return true; // Capture diagonally
        }
      }
      return false;

    case ROOK:
      return (
        ((absRowDiff === 0 && absColDiff > 0) ||
          (absColDiff === 0 && absRowDiff > 0)) &&
        !isPathBlocked(from, to, board)
      );

    case BISHOP:
      return absRowDiff === absColDiff && !isPathBlocked(from, to, board);

    case KNIGHT:
      return (
        (absRowDiff === 2 && absColDiff === 1) ||
        (absRowDiff === 1 && absColDiff === 2)
      );

    case QUEEN:
      return (
        ((absRowDiff === 0 && absColDiff > 0) ||
          (absColDiff === 0 && absRowDiff > 0) ||
          absRowDiff === absColDiff) &&
        !isPathBlocked(from, to, board)
      );

    default:
      return false;
  }
}

function isPathBlocked(from, to, board) {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const rowStep = Math.sign(toRow - fromRow);
  const colStep = Math.sign(toCol - fromCol);

  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;

  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol]) {
      return true; // Path is blocked
    }
    currentRow += rowStep;
    currentCol += colStep;
  }

  return false; // Path is clear
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
