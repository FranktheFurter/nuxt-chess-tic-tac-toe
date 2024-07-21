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
</template>

<script>
import { defineComponent } from 'vue';
import { WHITE } from './constants';

export default defineComponent({
  props: ['playerPieces', 'selectedPiece', 'currentPlayer', 'mode'],
  emits: ['select-piece'],
  setup() {
    return { WHITE };
  },
});
</script>