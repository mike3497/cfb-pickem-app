<template>
  <dialog class="modal" :class="{ 'modal-open': isOpen }">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-lg">{{ heading }}</h3>
      <p class="py-4">{{ content }}</p>
      <div class="modal-action">
        <button class="btn btn-success" @click="$emit('okayClicked')">Okay</button>
      </div>
    </form>
  </dialog>
</template>

<script setup lang="ts">
defineProps({
  heading: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
});

defineEmits(['okayClicked']);
</script>
