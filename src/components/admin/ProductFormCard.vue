<script setup lang="ts">
const props = defineProps<{
  productForm: {
    name: string;
    price: number;
    stock: number;
  };
  isEditing: boolean;
}>();

const emit = defineEmits<{
  submit: [];
  clear: [];
}>();
</script>

<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title">Cadastro de produtos</h5>
      <form @submit.prevent="emit('submit')">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">Produto</label>
            <input
              v-model="props.productForm.name"
              type="text"
              class="form-control"
              placeholder="Nome do produto"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label">Preco (R$)</label>
            <input
              v-model.number="props.productForm.price"
              type="number"
              step="0.01"
              class="form-control"
              placeholder="Preco"
            />
          </div>
          <div class="col-md-4">
            <label class="form-label">Estoque</label>
            <input
              v-model.number="props.productForm.stock"
              type="number"
              min="0"
              class="form-control"
              placeholder="Quantidade"
            />
          </div>
          <div class="col-12 d-flex gap-2">
            <button type="submit" class="btn btn-primary">
              {{ props.isEditing ? "Atualizar" : "Adicionar" }}
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="emit('clear')"
            >
              Limpar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
