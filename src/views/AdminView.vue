<template>
  <SiteHeader />
  <div class="container mx-auto px-4">
    <div class="text-sm breadcrumbs mb-4">
      <ul>
        <li><RouterLink :to="{ name: 'home' }">Home</RouterLink></li>
        <li>Admin</li>
      </ul>
    </div>
    <GenericAlert v-if="response">
      <pre class="text-left">{{ response }}</pre>
    </GenericAlert>
    <div class="card card-bordered">
      <div class="card-body">
        <h1 class="card-title">Manage Games</h1>
        <div class="flex gap-2">
          <label class="label">Week</label>
          <select v-model="week" class="select select-bordered w-32" :disabled="isDisabled">
            <option v-for="weekOption in weekOptions" :key="weekOption.week">
              {{ weekOption.week }}
            </option>
          </select>
        </div>
        <button class="btn btn-primary" :disabled="isDisabled" @click="fetchRankingsClicked">
          Fetch Rankings
        </button>
        <button class="btn btn-primary" :disabled="isDisabled" @click="fetchGamesClicked">
          Fetch Games
        </button>
        <button class="btn btn-primary" :disabled="isDisabled" @click="updateGamesClicked">
          Update Games
        </button>
      </div>
    </div>
  </div>
  <SiteFooter />
</template>

<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import { WeeksHelper } from '@/helpers/weeksHelper';
import { ref } from 'vue';
import { AdminService } from '@/services/adminService';
import GenericAlert from '@/components/shared/GenericAlert.vue';

const weekOptions = WeeksHelper.getWeeks();

const isDisabled = ref<boolean>(false);
const week = ref<number>(WeeksHelper.getCurrentWeek());
const response = ref<any>();

const fetchRankingsClicked = async () => {
  try {
    response.value = null;
    isDisabled.value = true;
    response.value = await AdminService.fetchRankings(2023, Number(week.value));
  } catch (error: any) {
    console.log(error);
  } finally {
    isDisabled.value = false;
  }
};

const fetchGamesClicked = async () => {
  try {
    response.value = null;
    isDisabled.value = true;
    response.value = await AdminService.fetchGames(2023, Number(week.value));
  } catch (error: any) {
    console.log(error);
  } finally {
    isDisabled.value = false;
  }
};

const updateGamesClicked = async () => {
  try {
    response.value = null;
    isDisabled.value = true;
    response.value = await AdminService.updateGames(2023, Number(week.value));
  } catch (error: any) {
    console.log(error);
  } finally {
    isDisabled.value = false;
  }
};
</script>
