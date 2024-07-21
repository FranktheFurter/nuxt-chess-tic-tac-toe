<template>
  <div
    class="w-20 h-20 border border-gray-400 flex items-center justify-center cursor-pointer"
    :class="{ 'bg-yellow-200': isSelected }"
    @click="$emit('click')"
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
</template>

<script>
import { defineComponent } from 'vue';
import { WHITE } from './constants';

export default defineComponent({
  props: ['cell', 'isSelected'],
  setup() {
    return { WHITE };
  },
});
</script>