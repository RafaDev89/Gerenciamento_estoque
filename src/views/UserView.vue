<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import {
  currentUser,
  executeTransaction,
  isCustomer,
  products,
  userTransactions,
} from '../stores/useInventoryStore'

const transactionForm = reactive({ productId: products.value[0]?.id || '', quantity: 1 })
const transactionSuccess = ref<boolean | null>(null)

const submitTransaction = () => {
  if (!transactionForm.productId) return
  const isOk = executeTransaction(transactionForm.productId, transactionForm.quantity)
  transactionSuccess.value = isOk
  if (isOk) {
    transactionForm.quantity = 1
  }
}

watch(
  () => products.value.length,
  () => {
    if (!transactionForm.productId && products.value.length > 0) {
      transactionForm.productId = products.value[0]?.id || ''
    }
  }
)

const canPurchase = computed(() => isCustomer.value && currentUser.value !== null)
</script>

<template>
  <div>
    <div v-if="!canPurchase" class="alert alert-warning">
      Acesso restrito: apenas clientes podem usar esta área. Selecione um usuário cliente à esquerda.
    </div>

    <div v-else>
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h4 class="card-title">Área do cliente</h4>
          <p class="text-secondary mb-0">Compre produtos e visualize suas compras recentes.</p>
        </div>
      </div>

      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h5 class="card-title">Comprar produto</h5>
          <form @submit.prevent="submitTransaction">
            <div class="row g-3">
              <div class="col-md-7">
                <label class="form-label">Produto</label>
                <select v-model="transactionForm.productId" class="form-select">
                  <option v-for="product in products" :key="product.id" :value="product.id">
                    {{ product.name }} — R$ {{ product.price.toFixed(2) }} ({{ product.stock }} em estoque)
                  </option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Quantidade</label>
                <input v-model.number="transactionForm.quantity" type="number" min="1" class="form-control" />
              </div>
              <div class="col-md-2 d-flex align-items-end">
                <button type="submit" class="btn btn-success w-100">Comprar</button>
              </div>
            </div>
          </form>

          <div v-if="transactionSuccess === true" class="alert alert-success mt-3">Compra registrada com sucesso.</div>
          <div v-else-if="transactionSuccess === false" class="alert alert-danger mt-3">Não foi possível concluir a compra. Verifique o estoque e os dados.</div>
        </div>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Minhas compras</h5>
          <div v-if="userTransactions.length === 0" class="text-muted">Você ainda não realizou compras.</div>
          <div v-else class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transaction in userTransactions" :key="transaction.id">
                  <td>{{ transaction.productName }}</td>
                  <td>{{ transaction.quantity }}</td>
                  <td>R$ {{ transaction.total.toFixed(2) }}</td>
                  <td>{{ transaction.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
