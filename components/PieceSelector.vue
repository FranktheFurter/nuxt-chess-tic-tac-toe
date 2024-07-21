<template>
  <div class="flex mb-4">
    <button
      v-for="(count, piece) in playerPieces"
      :key="piece"
      class="m-1 p-2 border"
      :class="{
        'bg-blue-200': selectedPiece === piece,
        'opacity-50 cursor-not-allowed': count === 0 || mode === 'move',
      }"
      @click="$emit('select-piece', piece)"
      :disabled="count === 0 || mode === 'move'"
    >
      <ChessPiece :type="piece" :color="currentPlayer" />
      <div>{{ count }}</div>
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { WHITE } from "./constants";
import ChessPiece from "./ChessPiece.vue";

export default defineComponent({
  components: { ChessPiece },
  props: ["playerPieces", "selectedPiece", "currentPlayer", "mode"],
  emits: ["select-piece"],
  setup() {
    return { WHITE };
  },
});
</script>

<style>
.button {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
