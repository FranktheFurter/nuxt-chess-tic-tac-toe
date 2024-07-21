<template>
  <div
    class="w-20 h-20 border border-gray-400 flex items-center justify-center cursor-pointer"
    :class="{ 'bg-yellow-200': isSelected }"
    @click="$emit('click')"
  >
    <ChessPiece v-if="cell" :type="cell.piece" :color="cell.color" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { WHITE } from "./constants";
import ChessPiece from "./ChessPiece.vue";

export default defineComponent({
  components: { ChessPiece },
  props: ["cell", "isSelected"],
  setup() {
    return { WHITE };
  },
});
</script>
