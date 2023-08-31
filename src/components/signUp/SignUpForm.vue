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
    <div class="grid grid-cols-2 gap-4">
      <div>
        <FormInput label="First Name" name="firstName" type="text" :disabled="isLoading" />
      </div>
      <div>
        <FormInput label="Last Name" name="lastName" type="text" :disabled="isLoading" />
      </div>
    </div>
    <div>
      <FormInput label="Username" name="username" type="text" :disabled="isLoading" />
    </div>
    <div>
      <FormInput label="Password" name="password" type="password" :disabled="isLoading" />
    </div>
    <button class="btn btn-primary" :disabled="isLoading">Sign Up</button>
  </Form>
  <div>
    <p>
      Already have an account?
      <RouterLink class="link" :to="{ name: 'sign-in' }">Sign In</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import FormInput from '@/components/shared/FormInput.vue';
import { object, string } from 'yup';
import type { SignUpDto } from '@/models/auth/signUpDto';
import { AuthService } from '@/services/authService';
import { ref } from 'vue';

const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;

const validationSchema = object({
  firstName: string().label('First Name').required(),
  lastName: string().label('Last Name').required(),
  username: string().label('Username').required().matches(usernameRegex, 'Username is not valid'),
  password: string().label('Password').required().matches(passwordRegex, 'Password is not valid')
});

const errorMessage = ref<string>('');
const isLoading = ref<boolean>(false);

const onFormSubmitted = async (values: any) => {
  const signUpDto: SignUpDto = {
    firstName: values.firstName,
    lastName: values.lastName,
    password: values.password,
    username: values.username
  };

  try {
    errorMessage.value = '';
    isLoading.value = true;
    await AuthService.signUp(signUpDto);
  } catch (error: any) {
    errorMessage.value = error.response.data.message;
  } finally {
    isLoading.value = false;
  }
};
</script>
