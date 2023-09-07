<template>
  <div class="card card-bordered">
    <div class="card-body">
      <div class="flex items-center justify-between">
        <h2 class="card-title">Games</h2>
        <div class="flex gap-2">
          <label class="label">Week</label>
          <select v-model="week" class="select select-bordered w-32">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
          </select>
        </div>
      </div>

      <div v-if="isLoading" class="text-center">
        <span class="loading loading-spinner loading-lg align-top py-16"></span>
      </div>
      <UserPicksTableVue v-else :games="games" :picks="picks" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserPicksTableVue from '@/components/userPicks/UserPicksTable.vue';
import type { Game } from '@/models/game';
import type { Pick } from '@/models/pick';
import { GameService } from '@/services/gameService';
import { PickService } from '@/services/pickService';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isLoading = ref<boolean>(false);
const games = ref<Game[]>([]);
const picks = ref<Pick[]>([]);
const week = ref<number>(1);

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
    const userId = Number(route.params.id);
    picks.value = await PickService.fetch(userId, 2023, week.value);
  } catch (error: any) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

watch(week, async () => {
  fetchGames();
  fetchPicks();
});

onMounted(() => {
  fetchGames();
  fetchPicks();
});
</script>
