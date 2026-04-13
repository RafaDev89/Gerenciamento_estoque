<script setup lang="ts">
import { currentUser, currentUserId, selectUser, totalInventoryValue, totalProducts, totalUsers, users } from './stores/useInventoryStore'
</script>

<template>
  <div class="container py-4">
    <header class="mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
        <div>
          <h1 class="mb-2">Gerenciamento de Estoque</h1>
          <p class="lead text-secondary mb-0">
            Sistema de estoque com CRUD de usuários, produtos, compras e vendas persistidos no navegador.
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
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">Usuário atual</h5>
            <div class="mb-3">
              <label class="form-label">Selecione o usuário</label>
              <select class="form-select" v-model="currentUserId" @change="selectUser(currentUserId)">
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.name }} ({{ user.role === 'admin' ? 'Administrador' : 'Cliente' }})
                </option>
              </select>
            </div>
            <div v-if="currentUser" class="mt-3">
              <div class="d-flex align-items-center gap-2 mb-2">
                <span class="badge bg-primary">{{ currentUser.role === 'admin' ? 'Administrador' : 'Cliente' }}</span>
                <span class="text-muted">{{ currentUser.email }}</span>
              </div>
              <p class="mb-0">Navegue entre Home, Admin e Usuário para usar o sistema.</p>
            </div>
          </div>
        </div>

        <div class="card shadow-sm mt-4">
          <div class="card-body">
            <h5 class="card-title">Resumo rápido</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Usuários
                <span class="badge bg-secondary rounded-pill">{{ totalUsers }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Produtos
                <span class="badge bg-secondary rounded-pill">{{ totalProducts }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Valor em estoque
                <strong>R$ {{ totalInventoryValue.toFixed(2) }}</strong>
              </li>
            </ul>
          </div>
        </div>
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
