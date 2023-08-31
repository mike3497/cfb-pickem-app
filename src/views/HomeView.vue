<template>
  <SiteHeader />
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold">Hello {{ authStore.user.firstName }}!</h1>
    <div class="card card-bordered">
      <div class="card-body">
        <GamesTable />
      </div>
    </div>
  </div>
  <SiteFooter />
</template>

<script setup lang="ts">
import GamesTable from '@/components/GamesTable.vue';
import { useAuthStore } from '@/stores/authStore';
import SiteHeader from '@/components/layout/SiteHeader.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';

const authStore = useAuthStore();

const onSignOutClicked = () => {
  authStore.signOut();
};
</script>
