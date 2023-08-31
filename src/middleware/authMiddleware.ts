import { useAuthStore } from '@/stores/authStore';

export default function authMiddleware(to: any, from: any, next: any) {
  const authStore = useAuthStore();

  if (authStore.isAuthenticated) {
    next();
  } else {
    next('/sign-in');
  }
}
