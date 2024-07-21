<template>
  <img
    v-if="pieceSrc"
    :src="pieceSrc"
    :alt="`${color} ${type}`"
    class="w-full h-full"
  />
</template>

<script>
import pawnW from "~/assets/chess-pieces/pawn-w.svg";
import pawnB from "~/assets/chess-pieces/pawn-b.svg";
import rookW from "~/assets/chess-pieces/rook-w.svg";
import rookB from "~/assets/chess-pieces/rook-b.svg";
import bishopW from "~/assets/chess-pieces/bishop-w.svg";
import bishopB from "~/assets/chess-pieces/bishop-b.svg";
import knightW from "~/assets/chess-pieces/knight-w.svg";
import knightB from "~/assets/chess-pieces/knight-b.svg";
import queenW from "~/assets/chess-pieces/queen-w.svg";
import queenB from "~/assets/chess-pieces/queen-b.svg";
import kingW from "~/assets/chess-pieces/king-w.svg";
import kingB from "~/assets/chess-pieces/king-b.svg";

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    pieceSrc() {
      const pieceMap = {
        pawn: {
          white: pawnW,
          black: pawnB,
        },
        rook: {
          white: rookW,
          black: rookB,
        },
        bishop: {
          white: bishopW,
          black: bishopB,
        },
        knight: {
          white: knightW,
          black: knightB,
        },
        queen: {
          white: queenW,
          black: queenB,
        },
        king: {
          white: kingW,
          black: kingB,
        },
      };

      if (!pieceMap[this.type]) {
        console.error(`Unknown piece type: ${this.type}`);
        return "";
      }

      if (!pieceMap[this.type][this.color]) {
        console.error(`Unknown piece color: ${this.color}`);
        return "";
      }

      return pieceMap[this.type][this.color];
    },
  },
};
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
