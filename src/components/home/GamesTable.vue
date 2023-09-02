<template>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Date</th>
          <th>Home</th>
          <th>Away</th>
        </tr>
      </thead>
      <tbody>
        <GamesTableRow
          v-for="game in games"
          :key="game.id"
          :game="game"
          :pick="getPickForGame(game.id)"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Game } from '@/models/game';
import type { Pick } from '@/models/pick';
import { type PropType } from 'vue';
import GamesTableRow from '@/components/home/GamesTableRow.vue';

const props = defineProps({
  games: {
    type: Object as PropType<Game[]>,
    required: true
  },
  picks: {
    type: Object as PropType<Pick[]>,
    required: true
  }
});

const getPickForGame = (gameId: number) => {
  return props.picks.find((pick) => pick.gameId === gameId);
};
</script>
