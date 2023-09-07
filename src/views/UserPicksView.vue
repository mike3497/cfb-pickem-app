<template>
  <SiteHeader />
  <div class="container mx-auto px-4">
    <div class="text-sm breadcrumbs">
      <ul>
        <li><RouterLink :to="{ name: 'home' }">Home</RouterLink></li>
        <li>Picks</li>
      </ul>
    </div>
    <h1 v-if="user" class="text-4xl font-bold my-8">
      {{ user.firstName }} {{ user.lastName }}'s Picks
    </h1>
    <UserPicksCard />
  </div>
  <SiteFooter />
</template>

<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import UserPicksCard from '@/components/userPicks/UserPicksCard.vue';
import type { User } from '@/models/user';
import { onMounted, ref } from 'vue';
import { UserService } from '@/services/userService';
import { useRoute } from 'vue-router';

const route = useRoute();

const user = ref<User>();

const fetchUser = async () => {
  try {
    const userId = Number(route.params.id);
    user.value = await UserService.fetchById(userId);
  } catch (error: any) {
    console.error(error);
  }
};

onMounted(() => {
  fetchUser();
});
</script>
