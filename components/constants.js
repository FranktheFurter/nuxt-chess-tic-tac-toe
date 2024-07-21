export const EMPTY = "EMPTY";
export const PAWN = "pawn";
export const ROOK = "rook";
export const BISHOP = "bishop";
export const KNIGHT = "knight";
export const QUEEN = "queen";
export const KING = "king";

export const WHITE = "white";
export const BLACK = "black";

export const initialBoard = Array(3)
  .fill()
  .map(() => Array(3).fill(null));

export const initialPieces = {
  [WHITE]: {
    [PAWN]: 2,
    [ROOK]: 2,
    [BISHOP]: 2,
    [KNIGHT]: 2,
    [QUEEN]: 1,
    [KING]: 1,
  },
  [BLACK]: {
    [PAWN]: 2,
    [ROOK]: 2,
    [BISHOP]: 2,
    [KNIGHT]: 2,
    [QUEEN]: 1,
    [KING]: 1,
  },
};
