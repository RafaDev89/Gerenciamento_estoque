<script setup lang="ts">
import CurrentUserCard from "./components/layout/CurrentUserCard.vue";
import QuickSummaryCard from "./components/layout/QuickSummaryCard.vue";
import {
  currentUser,
  currentUserId,
  selectUser,
  totalInventoryValue,
  totalProducts,
  totalUsers,
  users,
} from "./stores/useInventoryStore";
</script>

<template>
  <div class="container py-4">
    <header class="mb-4">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3"
      >
        <div>
          <h1 class="mb-2">Gerenciamento de Estoque</h1>
          <p class="lead text-secondary mb-0">
            Sistema de estoque com CRUD de usuários, produtos, compras e vendas
            persistidos no navegador.
          </p>
        </div>
        <nav>
          <ul class="nav nav-pills">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin" class="nav-link">Admin</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/usuario" class="nav-link">Usuário</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="row gy-4">
      <div class="col-lg-4">
        <CurrentUserCard
          v-model="currentUserId"
          :users="users"
          :current-user="currentUser"
          @change-user="selectUser"
        />

        <QuickSummaryCard
          :total-users="totalUsers"
          :total-products="totalProducts"
          :total-inventory-value="totalInventoryValue"
        />
      </div>

      <div class="col-lg-8">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background: #f8f9fa;
}

.card {
  border-radius: 1rem;
}

.router-link-active {
  background-color: #0d6efd;
  color: white !important;
}
</style>
