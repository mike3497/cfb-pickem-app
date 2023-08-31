<template>
  <h1 class="text-4xl font-bold">Hello {{ authStore.user.firstName }}!</h1>
  <button class="btn" @click="onSignOutClicked">Sign Out</button>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const onSignOutClicked = () => {
  authStore.signOut();
};
</script>
