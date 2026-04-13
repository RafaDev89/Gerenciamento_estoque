<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  currentUser,
  deleteProduct,
  deleteUser,
  isAdmin,
  products,
  saveProduct,
  saveUser,
  users,
} from '../stores/useInventoryStore'
import type { Product, User, UserRole } from '../stores/useInventoryStore'

const editingUserId = ref<string | null>(null)
const editingProductId = ref<string | null>(null)

const userForm = reactive({ name: '', email: '', role: 'customer' as UserRole })
const productForm = reactive({ name: '', price: 0, stock: 0 })

const resetUserForm = () => {
  editingUserId.value = null
  userForm.name = ''
  userForm.email = ''
  userForm.role = 'customer'
}

const resetProductForm = () => {
  editingProductId.value = null
  productForm.name = ''
  productForm.price = 0
  productForm.stock = 0
}

const submitUserForm = () => {
  saveUser(userForm.name, userForm.email, userForm.role, editingUserId.value ?? undefined)
  resetUserForm()
}

const editUser = (user: User) => {
  editingUserId.value = user.id
  userForm.name = user.name
  userForm.email = user.email
  userForm.role = user.role
}

const submitProductForm = () => {
  saveProduct(productForm.name, productForm.price, productForm.stock, editingProductId.value ?? undefined)
  resetProductForm()
}

const editProduct = (product: Product) => {
  editingProductId.value = product.id
  productForm.name = product.name
  productForm.price = product.price
  productForm.stock = product.stock
}

const canManage = computed(() => isAdmin.value)
</script>

<template>
  <div>
    <div v-if="!canManage" class="alert alert-warning">Acesso restrito: apenas administradores podem usar este painel.</div>

    <div v-else>
      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h4 class="card-title">Painel administrativo</h4>
          <p class="text-secondary mb-0">Gerencie usuários e produtos do sistema a partir daqui.</p>
        </div>
      </div>

      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h5 class="card-title">Cadastro de usuários</h5>
          <form @submit.prevent="submitUserForm">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Nome</label>
                <input v-model="userForm.name" type="text" class="form-control" placeholder="Nome do usuário" />
              </div>
              <div class="col-md-6">
                <label class="form-label">E-mail</label>
                <input v-model="userForm.email" type="email" class="form-control" placeholder="email@dominio.com" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Perfil</label>
                <select v-model="userForm.role" class="form-select">
                  <option value="customer">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div class="col-md-6 d-flex align-items-end gap-2">
                <button type="submit" class="btn btn-primary">{{ editingUserId ? 'Atualizar' : 'Adicionar' }}</button>
                <button type="button" class="btn btn-outline-secondary" @click="resetUserForm">Limpar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h5 class="card-title">Lista de usuários</h5>
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                  <th class="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role === 'admin' ? 'Administrador' : 'Cliente' }}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editUser(user)">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">Excluir</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h5 class="card-title">Cadastro de produtos</h5>
          <form @submit.prevent="submitProductForm">
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">Produto</label>
                <input v-model="productForm.name" type="text" class="form-control" placeholder="Nome do produto" />
              </div>
              <div class="col-md-4">
                <label class="form-label">Preço (R$)</label>
                <input v-model.number="productForm.price" type="number" step="0.01" class="form-control" placeholder="Preço" />
              </div>
              <div class="col-md-4">
                <label class="form-label">Estoque</label>
                <input v-model.number="productForm.stock" type="number" min="0" class="form-control" placeholder="Quantidade" />
              </div>
              <div class="col-12 d-flex gap-2">
                <button type="submit" class="btn btn-primary">{{ editingProductId ? 'Atualizar' : 'Adicionar' }}</button>
                <button type="button" class="btn btn-outline-secondary" @click="resetProductForm">Limpar</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Lista de produtos</h5>
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th class="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id">
                  <td>{{ product.name }}</td>
                  <td>R$ {{ product.price.toFixed(2) }}</td>
                  <td>{{ product.stock }}</td>
                  <td class="text-end">
                    <button class="btn btn-sm btn-outline-primary me-2" @click="editProduct(product)">Editar</button>
                    <button class="btn btn-sm btn-outline-danger" @click="deleteProduct(product.id)">Excluir</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
