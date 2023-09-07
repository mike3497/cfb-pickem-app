<template>
  <div class="card card-bordered">
    <div class="card-body">
      <div class="flex items-center justify-between">
        <h2 class="card-title">Games</h2>
        <div class="flex gap-2">
          <label class="label">Week</label>
          <select v-model="week" class="select select-bordered w-32">
            <option v-for="weekOption in weekOptions" :key="weekOption.week">
              {{ weekOption.week }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="isLoading" class="text-center">
        <span class="loading loading-spinner loading-lg align-top py-16"></span>
      </div>
      <GamesTable v-else :games="games" :picks="picks" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GamesTable from '@/components/home/GamesTable.vue';
import type { Game } from '@/models/game';
import type { Pick } from '@/models/pick';
import { GameService } from '@/services/gameService';
import { PickService } from '@/services/pickService';
import { useAuthStore } from '@/stores/authStore';
import { ref, onMounted, watch } from 'vue';
import { WeeksHelper } from '@/helpers/weeksHelper';

const weekOptions = WeeksHelper.getWeeks();

const authStore = useAuthStore();

const isLoading = ref<boolean>(false);
const games = ref<Game[]>([]);
const picks = ref<Pick[]>([]);
const week = ref<number>(WeeksHelper.getCurrentWeek());

const fetchGames = async () => {
  try {
    isLoading.value = true;
    games.value = await GameService.fetch(2023, week.value);
  } catch (error: any) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const fetchPicks = async () => {
  try {
    isLoading.value = true;
    picks.value = await PickService.fetch(authStore.user.id, 2023, week.value);
  } catch (error: any) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

watch(week, async () => {
  await fetchGames();
  await fetchPicks();
});

onMounted(() => {
  fetchGames();
  fetchPicks();
});
</script>
