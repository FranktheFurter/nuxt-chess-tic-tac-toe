<template>
  <div class="flex mb-4">
    <button
      class="mx-2 p-2 border"
      :class="{ 'bg-green-200': mode === 'place' }"
      @click="$emit('set-mode', 'place')"
    >
      Place Mode
    </button>
    <button
      class="mx-2 p-2 border"
      :class="{ 'bg-green-200': mode === 'move' }"
      @click="$emit('set-mode', 'move')"
    >
      Move Mode
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['mode'],
  emits: ['set-mode'],
});
</script>