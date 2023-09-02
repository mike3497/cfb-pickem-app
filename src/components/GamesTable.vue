<template>
  <div class="overflow-x-auto">
    <div v-if="isLoading" class="text-center">
      <span class="loading loading-spinner loading-lg align-top py-16"></span>
    </div>
    <table v-else class="table w-full">
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
import { GameService } from '@/services/gameService';
import { onMounted, ref } from 'vue';
import GamesTableRow from './GamesTableRow.vue';
import { PickService } from '@/services/pickService';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const isLoading = ref<boolean>(false);
const games = ref<Game[]>([]);
const picks = ref<Pick[]>([]);

const getPickForGame = (gameId: number) => {
  return picks.value.find((pick) => pick.gameId === gameId);
};

const fetchGames = async () => {
  try {
    isLoading.value = true;
    games.value = await GameService.fetch(2023, 1);
  } catch (error: any) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const fetchPicks = async () => {
  try {
    isLoading.value = true;
    picks.value = await PickService.fetch(authStore.user.id, 2023, 1);
  } catch (error: any) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchGames();
  fetchPicks();
});
</script>
