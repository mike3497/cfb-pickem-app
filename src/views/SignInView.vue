<template>
  <div class="max-w-xl mx-auto my-16 px-4">
    <h1 class="text-4xl font-bold flex items-center mb-4">
      <span class="material-symbols-outlined mr-2"> sports_football </span>My CFB Pick'em
    </h1>
    <h2 class="text-2xl font-bold">Sign In</h2>
    <SignInForm />
  </div>
</template>

<script setup lang="ts">
import SignInForm from '@/components/signIn/SignInForm.vue';
</script>
