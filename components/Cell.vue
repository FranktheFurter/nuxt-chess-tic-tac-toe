<template>
  <div
    class="w-20 h-20 border border-gray-400 flex items-center justify-center cursor-pointer"
    :class="{
      'bg-yellow-200': isSelected,
      // 'bg-green-200': isSelectable,
    }"
    @click="$emit('click')"
  >
    <ChessPiece v-if="cell" :type="cell.piece" :color="cell.color" />
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { WHITE } from "./constants";
import ChessPiece from "./ChessPiece.vue";

export default defineComponent({
  components: { ChessPiece },
  props: ["cell", "isSelected", "currentPlayer", "mode"],
  setup(props) {
    const isSelectable = computed(() => {
      return (
        props.mode === "place" &&
        props.cell &&
        props.cell.color === props.currentPlayer
      );
    });

    return { WHITE, isSelectable };
  },
});
</script>
