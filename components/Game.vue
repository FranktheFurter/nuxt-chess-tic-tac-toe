<template>
  <div class="flex flex-col items-center">
    <div v-if="winner" class="text-xl font-bold mb-4">{{ winner }} wins!</div>
    <div v-else class="text-xl mb-4">{{ currentPlayer }}'s turn</div>
    <Board
      :board="board"
      :selectedCell="selectedCell"
      :currentPlayer="currentPlayer"
      @cell-click="handleCellClick"
    />
    <PieceSelector
      :playerPieces="playerPieces[currentPlayer]"
      :selectedPiece="selectedPiece"
      :currentPlayer="currentPlayer"
      :mode="mode"
      @select-piece="setSelectedPiece"
    />
    <ModeSelector :mode="mode" @set-mode="setMode" />
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import Board from "./Board.vue";
import PieceSelector from "./PieceSelector.vue";
import ModeSelector from "./ModeSelector.vue";
import { WHITE, BLACK, initialBoard, initialPieces } from "./constants";
import { isValidMove, checkWin } from "./gameLogic";

export default {
  components: {
    Board,
    PieceSelector,
    ModeSelector,
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
        currentPlayer.value = currentPlayer.value === WHITE ? BLACK : WHITE;
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
        currentPlayer.value = currentPlayer.value === WHITE ? BLACK : WHITE;
      }
    }

    function handleCellClick(row, col) {
      if (mode.value === "place") {
        placePiece(row, col);
      } else if (mode.value === "move") {
        if (selectedCell.value) {
          movePiece(selectedCell.value[0], selectedCell.value[1], row, col);
        } else if (
          board.value[row][col] &&
          board.value[row][col].color === currentPlayer.value
        ) {
          selectedCell.value = [row, col];
        }
      }
    }

    function checkWinState() {
      winner.value = checkWin(board.value);
    }

    function setSelectedPiece(piece) {
      selectedPiece.value = piece;
    }

    function setMode(newMode) {
      mode.value = newMode;
    }

    return {
      board,
      currentPlayer,
      selectedPiece,
      selectedCell,
      playerPieces,
      winner,
      mode,
      WHITE,
      BLACK,
      handleCellClick,
      setSelectedPiece,
      setMode,
    };
  },
};
</script>
