<template>
  <div v-if="errorMessage" class="alert alert-error">
    <span class="material-symbols-outlined"> error </span>
    <span>{{ errorMessage }}</span>
  </div>
  <Form
    class="grid grid-cols-1 gap-4 mb-2"
    :validationSchema="validationSchema"
    @submit="onFormSubmitted"
  >
    <div>
      <FormInput label="Username" name="username" type="text" :disabled="isLoading" />
    </div>
    <div>
      <FormInput label="Password" name="password" type="password" :disabled="isLoading" />
    </div>
    <button class="btn btn-primary" :disabled="isLoading">Sign In</button>
  </Form>
  <div>
    <p>
      Need an account?
      <RouterLink class="link" :to="{ name: 'sign-up' }">Sign Up</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import FormInput from '@/components/shared/FormInput.vue';
import { object, string } from 'yup';
import { AuthService } from '@/services/authService';
import { ref } from 'vue';
import type { SignInDto } from '@/models/auth/signInDto';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const validationSchema = object({
  username: string().label('Username').required(),
  password: string().label('Password').required()
});

const authStore = useAuthStore();
const router = useRouter();

const errorMessage = ref<string>('');
const isLoading = ref<boolean>(false);

const onFormSubmitted = async (values: any) => {
  const signInDto: SignInDto = {
    password: values.password,
    username: values.username
  };

  try {
    errorMessage.value = '';
    isLoading.value = true;

    const response = await AuthService.signIn(signInDto);
    authStore.accessToken = response.accessToken;
    authStore.user = response.user;

    router.push('/');
  } catch (error: any) {
    errorMessage.value = error.response.data.message;
  } finally {
    isLoading.value = false;
  }
};
</script>
