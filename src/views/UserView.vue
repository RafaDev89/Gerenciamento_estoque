<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import PageHeaderCard from "../components/common/PageHeaderCard.vue";
import TransactionTable from "../components/common/TransactionTable.vue";
import PurchaseFormCard from "../components/user/PurchaseFormCard.vue";
import {
  currentUser,
  executeTransaction,
  isCustomer,
  products,
  userTransactions,
} from "../stores/useInventoryStore";

const transactionForm = reactive({
  productId: products.value[0]?.id || "",
  quantity: 1,
});
const transactionSuccess = ref<boolean | null>(null);

const submitTransaction = () => {
  if (!transactionForm.productId) return;
  const isOk = executeTransaction(
    transactionForm.productId,
    transactionForm.quantity,
  );
  transactionSuccess.value = isOk;
  if (isOk) {
    transactionForm.quantity = 1;
  }
};

watch(
  () => products.value.length,
  () => {
    if (!transactionForm.productId && products.value.length > 0) {
      transactionForm.productId = products.value[0]?.id || "";
    }
  },
);

const canPurchase = computed(
  () => isCustomer.value && currentUser.value !== null,
);
</script>

<template>
  <div>
    <div v-if="!canPurchase" class="alert alert-warning">
      Acesso restrito: apenas clientes podem usar esta área. Selecione um
      usuário cliente à esquerda.
    </div>

    <div v-else>
      <PageHeaderCard
        title="Area do cliente"
        subtitle="Compre produtos e visualize suas compras recentes."
      />

      <PurchaseFormCard
        :products="products"
        :transaction-form="transactionForm"
        :transaction-success="transactionSuccess"
        @submit="submitTransaction"
      />

      <TransactionTable
        title="Minhas compras"
        :transactions="userTransactions"
        empty-text="Voce ainda nao realizou compras."
        mode="user"
      />
    </div>
  </div>
</template>
