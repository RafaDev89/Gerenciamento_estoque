<script setup lang="ts">
import PageHeaderCard from "../components/common/PageHeaderCard.vue";
import StatCard from "../components/common/StatCard.vue";
import TransactionTable from "../components/common/TransactionTable.vue";
import {
  recentTransactions,
  totalInventoryValue,
  totalProducts,
  totalUsers,
} from "../stores/useInventoryStore";
</script>

<template>
  <div>
    <PageHeaderCard
      title="Inicio"
      subtitle="Use os menus para navegar entre o painel administrativo e as funcionalidades de cliente."
    />

    <div class="card shadow-sm mb-4">
      <div class="card-body pt-0">
        <div class="d-flex flex-wrap gap-2">
          <router-link to="/admin" class="btn btn-outline-primary"
            >Painel Admin</router-link
          >
          <router-link to="/usuario" class="btn btn-outline-secondary"
            >Area do Cliente</router-link
          >
        </div>
      </div>
    </div>

    <div class="row gy-4">
      <div class="col-md-4">
        <StatCard title="Usuarios" :value="totalUsers" />
      </div>
      <div class="col-md-4">
        <StatCard title="Produtos" :value="totalProducts" />
      </div>
      <div class="col-md-4">
        <StatCard
          title="Valor em estoque"
          :value="`R$ ${totalInventoryValue.toFixed(2)}`"
        />
      </div>
    </div>

    <div class="mt-4">
      <TransactionTable
        title="Ultimas transacoes"
        :transactions="recentTransactions"
        empty-text="Nenhuma transacao registrada ainda."
        mode="recent"
      />
    </div>
  </div>
</template>
