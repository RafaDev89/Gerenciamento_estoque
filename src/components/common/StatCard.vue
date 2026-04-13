<script setup lang="ts">
const props = defineProps<{
  title: string;
  value: string | number;
}>();
</script>

<template>
  <div class="card shadow-sm h-100">
    <div class="card-body">
      <h6 class="card-title">{{ props.title }}</h6>
      <p class="display-6 mb-0">{{ props.value }}</p>
    </div>
  </div>
</template>
