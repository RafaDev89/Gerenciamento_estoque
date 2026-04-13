<script setup lang="ts">
import type { Product } from "../../stores/useInventoryStore";

const props = defineProps<{
  products: Product[];
  transactionForm: {
    productId: string;
    quantity: number;
  };
  transactionSuccess: boolean | null;
}>();

const emit = defineEmits<{
  submit: [];
}>();
</script>

<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title">Comprar produto</h5>
      <form @submit.prevent="emit('submit')">
        <div class="row g-3">
          <div class="col-md-7">
            <label class="form-label">Produto</label>
            <select
              v-model="props.transactionForm.productId"
              class="form-select"
            >
              <option
                v-for="product in props.products"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }} - R$ {{ product.price.toFixed(2) }} ({{
                  product.stock
                }}
                em estoque)
              </option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Quantidade</label>
            <input
              v-model.number="props.transactionForm.quantity"
              type="number"
              min="1"
              class="form-control"
            />
          </div>
          <div class="col-md-2 d-flex align-items-end">
            <button type="submit" class="btn btn-success w-100">Comprar</button>
          </div>
        </div>
      </form>

      <div
        v-if="props.transactionSuccess === true"
        class="alert alert-success mt-3"
      >
        Compra registrada com sucesso.
      </div>
      <div
        v-else-if="props.transactionSuccess === false"
        class="alert alert-danger mt-3"
      >
        Nao foi possivel concluir a compra. Verifique o estoque e os dados.
      </div>
    </div>
  </div>
</template>
