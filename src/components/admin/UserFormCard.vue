<script setup lang="ts">
import type { UserRole } from "../../stores/useInventoryStore";

const props = defineProps<{
  userForm: {
    name: string;
    email: string;
    role: UserRole;
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
      <h5 class="card-title">Cadastro de usuarios</h5>
      <form @submit.prevent="emit('submit')">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Nome</label>
            <input
              v-model="props.userForm.name"
              type="text"
              class="form-control"
              placeholder="Nome do usuario"
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">E-mail</label>
            <input
              v-model="props.userForm.email"
              type="email"
              class="form-control"
              placeholder="email@dominio.com"
            />
          </div>
          <div class="col-md-6">
            <label class="form-label">Perfil</label>
            <select v-model="props.userForm.role" class="form-select">
              <option value="customer">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div class="col-md-6 d-flex align-items-end gap-2">
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
