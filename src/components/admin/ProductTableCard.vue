<script setup lang="ts">
import type { Product } from "../../stores/useInventoryStore";

const props = defineProps<{
  products: Product[];
}>();

const emit = defineEmits<{
  edit: [product: Product];
  delete: [id: string];
}>();
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title">Lista de produtos</h5>
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preco</th>
              <th>Estoque</th>
              <th class="text-end">Acoes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in props.products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>R$ {{ product.price.toFixed(2) }}</td>
              <td>{{ product.stock }}</td>
              <td class="text-end">
                <button
                  class="btn btn-sm btn-outline-primary me-2"
                  @click="emit('edit', product)"
                >
                  Editar
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="emit('delete', product.id)"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
