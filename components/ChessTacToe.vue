<template>
  <div class="flex flex-col items-center">
    <div v-if="winner" class="text-xl font-bold mb-4">{{ winner }} wins!</div>
    <div v-else class="text-xl mb-4">{{ currentPlayer }}'s turn</div>
    <div class="mb-4">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="flex">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="w-20 h-20 border border-gray-400 flex items-center justify-center cursor-pointer"
          :class="{
            'bg-yellow-200':
              selectedCell &&
              selectedCell[0] === rowIndex &&
              selectedCell[1] === colIndex,
          }"
          @click="handleCellClick(rowIndex, colIndex)"
        >
          <div
            v-if="cell"
            :class="`text-3xl ${
              cell.color === WHITE ? 'text-blue-500' : 'text-red-500'
            }`"
          >
            {{ cell.piece }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex mb-4">
      <button
        v-for="(count, piece) in playerPieces[currentPlayer]"
        :key="piece"
        class="m-1 p-2 border"
        :class="{
          'bg-blue-200': selectedPiece === piece,
          'opacity-50 cursor-not-allowed': count === 0 || mode === 'move',
        }"
        @click="setSelectedPiece(piece)"
        :disabled="count === 0 || mode === 'move'"
      >
        <div
          :class="`text-2xl ${
            currentPlayer === WHITE ? 'text-blue-500' : 'text-red-500'
          }`"
        >
          {{ piece }}
        </div>
        <div>{{ count }}</div>
      </button>
    </div>
    <div class="flex mb-4">
      <button
        class="mx-2 p-2 border"
        :class="{ 'bg-green-200': mode === 'place' }"
        @click="setMode('place')"
      >
        Place Mode
      </button>
      <button
        class="mx-2 p-2 border"
        :class="{ 'bg-green-200': mode === 'move' }"
        @click="setMode('move')"
      >
        Move Mode
      </button>
    </div>
  </div>
</template>

<script>
const EMPTY = "EMPTY";
const PAWN = "P";
const ROOK = "R";
const BISHOP = "B";
const KNIGHT = "N";
const QUEEN = "Q";

const WHITE = "WHITE";
const BLACK = "BLACK";

const initialBoard = Array(3)
  .fill()
  .map(() => Array(3).fill(null));

const initialPieces = {
  [WHITE]: { [PAWN]: 2, [ROOK]: 2, [BISHOP]: 2, [KNIGHT]: 2, [QUEEN]: 1 },
  [BLACK]: { [PAWN]: 2, [ROOK]: 2, [BISHOP]: 2, [KNIGHT]: 2, [QUEEN]: 1 },
};

export default {
  data() {
    return {
      board: initialBoard,
      currentPlayer: WHITE,
      selectedPiece: null,
      selectedCell: null,
      playerPieces: initialPieces,
      winner: null,
      mode: "place",
      WHITE,
      BLACK,
    };
  },
  methods: {
    isValidMove(from, to, piece) {
      const [fromRow, fromCol] = from;
      const [toRow, toCol] = to;
      const rowDiff = Math.abs(toRow - fromRow);
      const colDiff = Math.abs(toCol - fromCol);

      switch (piece) {
        case PAWN:
          return rowDiff === 1 && colDiff === 0;
        case ROOK:
          return (
            (rowDiff === 0 && colDiff > 0) || (colDiff === 0 && rowDiff > 0)
          );
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
    },
    placePiece(row, col) {
      if (
        this.board[row][col] === null &&
        this.selectedPiece &&
        this.playerPieces[this.currentPlayer][this.selectedPiece] > 0
      ) {
        this.board[row][col] = {
          piece: this.selectedPiece,
          color: this.currentPlayer,
        };
        this.playerPieces[this.currentPlayer][this.selectedPiece]--;
        this.selectedPiece = null;
        this.checkWin();
        this.currentPlayer = this.currentPlayer === WHITE ? BLACK : WHITE;
      }
    },
    movePiece(fromRow, fromCol, toRow, toCol) {
      const piece = this.board[fromRow][fromCol];
      if (
        piece &&
        piece.color === this.currentPlayer &&
        this.isValidMove([fromRow, fromCol], [toRow, toCol], piece.piece)
      ) {
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        this.selectedCell = null;
        this.checkWin();
        this.currentPlayer = this.currentPlayer === WHITE ? BLACK : WHITE;
      }
    },
    handleCellClick(row, col) {
      if (this.mode === "place") {
        this.placePiece(row, col);
      } else if (this.mode === "move") {
        if (this.selectedCell) {
          this.movePiece(this.selectedCell[0], this.selectedCell[1], row, col);
        } else if (
          this.board[row][col] &&
          this.board[row][col].color === this.currentPlayer
        ) {
          this.selectedCell = [row, col];
        }
      }
    },
    checkWin() {
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
          this.board[a[0]][a[1]] &&
          this.board[a[0]][a[1]].color === this.board[b[0]][b[1]]?.color &&
          this.board[a[0]][a[1]].color === this.board[c[0]][c[1]]?.color
        ) {
          this.winner = this.board[a[0]][a[1]].color;
          return;
        }
      }
    },
    setSelectedPiece(piece) {
      this.selectedPiece = piece;
    },
    setMode(newMode) {
      this.mode = newMode;
    },
  },
};
</script>
