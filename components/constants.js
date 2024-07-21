export const EMPTY = "EMPTY";
export const PAWN = "P";
export const ROOK = "R";
export const BISHOP = "B";
export const KNIGHT = "N";
export const QUEEN = "Q";

export const WHITE = "WHITE";
export const BLACK = "BLACK";

export const initialBoard = Array(3)
  .fill()
  .map(() => Array(3).fill(null));

export const initialPieces = {
  [WHITE]: { [PAWN]: 2, [ROOK]: 2, [BISHOP]: 2, [KNIGHT]: 2, [QUEEN]: 1 },
  [BLACK]: { [PAWN]: 2, [ROOK]: 2, [BISHOP]: 2, [KNIGHT]: 2, [QUEEN]: 1 },
};
