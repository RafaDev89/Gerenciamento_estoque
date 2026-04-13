<script setup lang="ts">
import type { Transaction } from "../../stores/useInventoryStore";

const props = defineProps<{
  title: string;
  transactions: Transaction[];
  emptyText: string;
  mode: "recent" | "user";
}>();
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title">{{ props.title }}</h5>
      <div v-if="props.transactions.length === 0" class="text-muted">
        {{ props.emptyText }}
      </div>
      <div v-else class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th v-if="props.mode === 'recent'">Tipo</th>
              <th>Produto</th>
              <th v-if="props.mode === 'recent'">Cliente</th>
              <th v-if="props.mode === 'user'">Quantidade</th>
              <th>Total</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in props.transactions" :key="transaction.id">
              <td v-if="props.mode === 'recent'">{{ transaction.type }}</td>
              <td>{{ transaction.productName }}</td>
              <td v-if="props.mode === 'recent'">{{ transaction.userName }}</td>
              <td v-if="props.mode === 'user'">{{ transaction.quantity }}</td>
              <td>R$ {{ transaction.total.toFixed(2) }}</td>
              <td>{{ transaction.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
