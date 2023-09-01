<template>
  <div v-if="isLoading" class="text-center">
    <span class="loading loading-spinner loading-lg align-top py-16"></span>
  </div>
  <table v-else class="table">
    <thead>
      <tr>
        <th>Ranking</th>
        <th>Name</th>
        <th>Correct Picks</th>
        <th>Correct %</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="leaderboardRow in leaderboardRows" :key="leaderboardRow.user.id">
        <td>{{ leaderboardRow.ranking }}</td>
        <td>{{ leaderboardRow.user.firstName }} {{ leaderboardRow.user.lastName }}</td>
        <td>{{ leaderboardRow.correctPicks }}</td>
        <td>{{ leaderboardRow.correctPicksPercentage }}%</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Leaderboard } from '@/models/leaderboard';
import { LeaderboardService } from '@/services/leaderboardService';
import { onMounted, ref } from 'vue';

const isLoading = ref<boolean>(false);
const leaderboardRows = ref<Leaderboard[]>([]);

const fetchLeaderboard = async () => {
  try {
    isLoading.value = true;
    leaderboardRows.value = await LeaderboardService.fetch();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchLeaderboard();
});
</script>
