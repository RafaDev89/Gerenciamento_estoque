<script setup lang="ts">
const props = defineProps<{
  totalUsers: number;
  totalProducts: number;
  totalInventoryValue: number;
}>();
</script>

<template>
  <div class="card shadow-sm mt-4">
    <div class="card-body">
      <h5 class="card-title">Resumo rapido</h5>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          Usuarios
          <span class="badge bg-secondary rounded-pill">{{
            props.totalUsers
          }}</span>
        </li>
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          Produtos
          <span class="badge bg-secondary rounded-pill">{{
            props.totalProducts
          }}</span>
        </li>
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          Valor em estoque
          <strong>R$ {{ props.totalInventoryValue.toFixed(2) }}</strong>
        </li>
      </ul>
    </div>
  </div>
</template>
