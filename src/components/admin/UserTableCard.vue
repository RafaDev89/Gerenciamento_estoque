<script setup lang="ts">
import type { User } from "../../stores/useInventoryStore";

const props = defineProps<{
  users: User[];
}>();

const emit = defineEmits<{
  edit: [user: User];
  delete: [id: string];
}>();
</script>

<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title">Lista de usuarios</h5>
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th class="text-end">Acoes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in props.users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role === "admin" ? "Administrador" : "Cliente" }}</td>
              <td class="text-end">
                <button
                  class="btn btn-sm btn-outline-primary me-2"
                  @click="emit('edit', user)"
                >
                  Editar
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="emit('delete', user.id)"
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
