<template>
  <SiteHeader />
  <div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold my-8">Hello {{ authStore.user.firstName }}!</h1>
    <div class="card card-bordered mb-8">
      <div class="card-body">
        <h2 class="card-title">Leaderboard</h2>
        <LeaderboardTable />
      </div>
    </div>
    <GamesCard />
  </div>
  <SiteFooter />
</template>

<script setup lang="ts">
import GamesCard from '@/components/home/GamesCard.vue';
import LeaderboardTable from '@/components/LeaderboardTable.vue';
import { useAuthStore } from '@/stores/authStore';
import SiteHeader from '@/components/layout/SiteHeader.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';

const authStore = useAuthStore();

const onSignOutClicked = () => {
  authStore.signOut();
};
</script>
