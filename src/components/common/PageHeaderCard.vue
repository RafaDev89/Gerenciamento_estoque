<script setup lang="ts">
const props = defineProps<{
  title: string;
  subtitle: string;
}>();
</script>

<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h4 class="card-title">{{ props.title }}</h4>
      <p class="text-secondary mb-0">{{ props.subtitle }}</p>
    </div>
  </div>
</template>
