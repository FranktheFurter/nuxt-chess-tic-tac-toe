<template>
  <div class="flex flex-col items-center">
    <div v-if="winner" class="text-xl font-bold mb-4">{{ winner }} wins!</div>
    <div v-else class="text-xl mb-4">{{ currentPlayer }}'s turn</div>
    <Board
      :board="board"
      :selectedCell="selectedCell"
      :currentPlayer="currentPlayer"
      :mode="mode"
      @cell-click="handleCellClick"
      @switch-to-move="switchToMoveMode"
    />
    <PieceSelector
      :playerPieces="playerPieces[currentPlayer]"
      :selectedPiece="selectedPiece"
      :currentPlayer="currentPlayer"
      :mode="mode"
      @select-piece="handlePieceSelect"
    />
    <div class="mt-4 text-lg">Current Mode: {{ mode }}</div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import Board from "./Board.vue";
import PieceSelector from "./PieceSelector.vue";
import { WHITE, BLACK, initialBoard, initialPieces } from "./constants";
import { isValidMove, checkWin } from "./gameLogic";

export default {
  components: {
    Board,
    PieceSelector,
  },
  setup() {
    const board = ref(initialBoard);
    const currentPlayer = ref(WHITE);
    const selectedPiece = ref(null);
    const selectedCell = ref(null);
    const playerPieces = reactive(initialPieces);
    const winner = ref(null);
    const mode = ref("place");

    function placePiece(row, col) {
      if (
        board.value[row][col] === null &&
        selectedPiece.value &&
        playerPieces[currentPlayer.value][selectedPiece.value] > 0
      ) {
        board.value[row][col] = {
          piece: selectedPiece.value,
          color: currentPlayer.value,
        };
        playerPieces[currentPlayer.value][selectedPiece.value]--;
        selectedPiece.value = null;
        checkWinState();
        switchPlayer();
      }
    }

    function movePiece(fromRow, fromCol, toRow, toCol) {
      const piece = board.value[fromRow][fromCol];
      if (
        piece &&
        piece.color === currentPlayer.value &&
        isValidMove([fromRow, fromCol], [toRow, toCol], piece.piece)
      ) {
        board.value[toRow][toCol] = piece;
        board.value[fromRow][fromCol] = null;
        selectedCell.value = null;
        checkWinState();
        switchPlayer();
        mode.value = "place";
      }
    }

    function handleCellClick(row, col) {
      if (mode.value === "place") {
        placePiece(row, col);
      } else if (mode.value === "move") {
        if (selectedCell.value) {
          movePiece(selectedCell.value[0], selectedCell.value[1], row, col);
        } else {
          // This shouldn't happen, but just in case
          switchToMoveMode(row, col);
        }
      }
    }

    function switchToMoveMode(row, col) {
      const cell = board.value[row][col];
      if (cell && cell.color === currentPlayer.value) {
        mode.value = "move";
        selectedCell.value = [row, col];
        selectedPiece.value = null;
      }
    }

    function handlePieceSelect(piece) {
      if (mode.value === "move") {
        mode.value = "place";
        selectedCell.value = null;
      }

      selectedPiece.value = selectedPiece.value === piece ? null : piece;
    }

    function checkWinState() {
      winner.value = checkWin(board.value);
    }

    function switchPlayer() {
      currentPlayer.value = currentPlayer.value === WHITE ? BLACK : WHITE;
    }

    return {
      board,
      currentPlayer,
      selectedPiece,
      selectedCell,
      playerPieces,
      winner,
      mode,
      handleCellClick,
      handlePieceSelect,
      switchToMoveMode,
    };
  },
};
</script>
