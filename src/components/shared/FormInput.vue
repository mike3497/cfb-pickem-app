<template>
  <label class="label">{{ label }}</label>
  <input v-model="value" class="input input-bordered w-full" :type="type" :disabled="disabled" />
  <span class="text-sm">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const { value, errorMessage } = useField(() => props.name);
</script>
