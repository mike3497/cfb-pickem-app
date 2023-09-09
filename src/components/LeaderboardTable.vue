<template>
  <div class="overflow-x-auto">
    <div v-if="isLoading" class="text-center">
      <span class="loading loading-spinner loading-lg align-top py-16"></span>
    </div>
    <table v-else class="table table-sm w-full">
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
          <td>
            <RouterLink
              class="link"
              :to="{ name: 'user-picks', params: { id: leaderboardRow.user.id } }"
            >
              {{ leaderboardRow.user.firstName }} {{ leaderboardRow.user.lastName }}
            </RouterLink>
          </td>
          <td>{{ leaderboardRow.correctPicks }}</td>
          <td>{{ FormatHelper.formatAsPercentage(leaderboardRow.correctPicksPercentage) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Leaderboard } from '@/models/leaderboard';
import { LeaderboardService } from '@/services/leaderboardService';
import { onMounted, ref } from 'vue';
import { FormatHelper } from '@/helpers/formatHelper';

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
