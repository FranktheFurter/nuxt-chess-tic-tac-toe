<template>
  <div class="mb-4">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="flex">
      <Cell
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :cell="cell"
        :isSelected="isSelectedCell(rowIndex, colIndex)"
        @click="$emit('cell-click', rowIndex, colIndex)"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Cell from "./Cell.vue";

export default defineComponent({
  components: { Cell },
  props: ["board", "selectedCell", "currentPlayer"],
  emits: ["cell-click"],
  setup(props) {
    const isSelectedCell = (rowIndex, colIndex) => {
      return (
        props.selectedCell &&
        props.selectedCell[0] === rowIndex &&
        props.selectedCell[1] === colIndex
      );
    };

    return { isSelectedCell };
  },
});
</script>
