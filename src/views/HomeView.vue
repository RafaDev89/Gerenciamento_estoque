<script setup lang="ts">
import { recentTransactions, totalInventoryValue, totalProducts, totalUsers } from '../stores/useInventoryStore'
</script>

<template>
  <div>
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <h4 class="card-title">Início</h4>
        <p class="text-secondary mb-3">
          Use os menus para navegar entre o painel administrativo e as funcionalidades de cliente.
        </p>
        <div class="d-flex flex-wrap gap-2">
          <router-link to="/admin" class="btn btn-outline-primary">Painel Admin</router-link>
          <router-link to="/usuario" class="btn btn-outline-secondary">Área do Cliente</router-link>
        </div>
      </div>
    </div>

    <div class="row gy-4">
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h6 class="card-title">Usuários</h6>
            <p class="display-6 mb-0">{{ totalUsers }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h6 class="card-title">Produtos</h6>
            <p class="display-6 mb-0">{{ totalProducts }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h6 class="card-title">Valor em estoque</h6>
            <p class="display-6 mb-0">R$ {{ totalInventoryValue.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card shadow-sm mt-4">
      <div class="card-body">
        <h5 class="card-title">Últimas transações</h5>
        <div v-if="recentTransactions.length === 0" class="text-muted">Nenhuma transação registrada ainda.</div>
        <div v-else class="table-responsive">
          <table class="table table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Produto</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in recentTransactions" :key="transaction.id">
                <td>{{ transaction.type }}</td>
                <td>{{ transaction.productName }}</td>
                <td>{{ transaction.userName }}</td>
                <td>R$ {{ transaction.total.toFixed(2) }}</td>
                <td>{{ transaction.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
