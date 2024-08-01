<template>
  <div class="mb-4">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="flex">
      <Cell
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :cell="cell"
        :isSelected="isSelectedCell(rowIndex, colIndex)"
        :currentPlayer="currentPlayer"
        :mode="mode"
        @click="handleCellClick(rowIndex, colIndex)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Cell from "./Cell.vue";

export default defineComponent({
  components: { Cell },
  props: ["board", "selectedCell", "currentPlayer", "mode"],
  emits: ["cell-click", "switch-to-move"],
  setup(props, { emit }) {
    const isSelectedCell = (rowIndex, colIndex) => {
      return (
        props.selectedCell &&
        props.selectedCell[0] === rowIndex &&
        props.selectedCell[1] === colIndex
      );
    };

    const handleCellClick = (rowIndex, colIndex) => {
      const cell = props.board[rowIndex][colIndex];
      if (
        cell &&
        cell.color === props.currentPlayer &&
        props.mode === "place"
      ) {
        emit("switch-to-move", rowIndex, colIndex);
      } else {
        emit("cell-click", rowIndex, colIndex);
      }
    };

    return { isSelectedCell, handleCellClick };
  },
});
</script>
