import type { User } from '@/models/user';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('authStore', () => {
  const accessToken = useLocalStorage('accessToken', '');
  const router = useRouter();
  const user = useLocalStorage<User>('user', {} as User);

  const isAuthenticated = computed<boolean>(() => {
    if (!accessToken.value) {
      return false;
    }

    return true;
  });

  const signOut = () => {
    accessToken.value = '';
    user.value = null;
    router.push('/sign-in');
  };

  return {
    isAuthenticated,
    accessToken,
    user,
    signOut
  };
});
