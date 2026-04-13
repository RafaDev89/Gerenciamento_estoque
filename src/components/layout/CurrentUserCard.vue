<script setup lang="ts">
import type { User } from "../../stores/useInventoryStore";

const currentUserId = defineModel<string>({ required: true });

const props = defineProps<{
  users: User[];
  currentUser: User | null;
}>();

const emit = defineEmits<{
  changeUser: [id: string];
}>();
</script>

<template>
  <div class="card shadow-sm h-100">
    <div class="card-body">
      <h5 class="card-title">Usuario atual</h5>
      <div class="mb-3">
        <label class="form-label">Selecione o usuario</label>
        <select
          class="form-select"
          v-model="currentUserId"
          @change="emit('changeUser', currentUserId)"
        >
          <option v-for="user in props.users" :key="user.id" :value="user.id">
            {{ user.name }} ({{
              user.role === "admin" ? "Administrador" : "Cliente"
            }})
          </option>
        </select>
      </div>
      <div v-if="props.currentUser" class="mt-3">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="badge bg-primary">{{
            props.currentUser.role === "admin" ? "Administrador" : "Cliente"
          }}</span>
          <span class="text-muted">{{ props.currentUser.email }}</span>
        </div>
        <p class="mb-0">
          Navegue entre Home, Admin e Usuario para usar o sistema.
        </p>
      </div>
    </div>
  </div>
</template>
