<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import PageHeaderCard from "../components/common/PageHeaderCard.vue";
import ProductFormCard from "../components/admin/ProductFormCard.vue";
import ProductTableCard from "../components/admin/ProductTableCard.vue";
import UserFormCard from "../components/admin/UserFormCard.vue";
import UserTableCard from "../components/admin/UserTableCard.vue";
import {
  deleteProduct,
  deleteUser,
  isAdmin,
  products,
  saveProduct,
  saveUser,
  users,
} from "../stores/useInventoryStore";
import type { Product, User, UserRole } from "../stores/useInventoryStore";

const editingUserId = ref<string | null>(null);
const editingProductId = ref<string | null>(null);

const userForm = reactive({
  name: "",
  email: "",
  role: "customer" as UserRole,
});
const productForm = reactive({ name: "", price: 0, stock: 0 });

const resetUserForm = () => {
  editingUserId.value = null;
  userForm.name = "";
  userForm.email = "";
  userForm.role = "customer";
};

const resetProductForm = () => {
  editingProductId.value = null;
  productForm.name = "";
  productForm.price = 0;
  productForm.stock = 0;
};

const submitUserForm = () => {
  saveUser(
    userForm.name,
    userForm.email,
    userForm.role,
    editingUserId.value ?? undefined,
  );
  resetUserForm();
};

const editUser = (user: User) => {
  editingUserId.value = user.id;
  userForm.name = user.name;
  userForm.email = user.email;
  userForm.role = user.role;
};

const submitProductForm = () => {
  saveProduct(
    productForm.name,
    productForm.price,
    productForm.stock,
    editingProductId.value ?? undefined,
  );
  resetProductForm();
};

const editProduct = (product: Product) => {
  editingProductId.value = product.id;
  productForm.name = product.name;
  productForm.price = product.price;
  productForm.stock = product.stock;
};

const canManage = computed(() => isAdmin.value);
</script>

<template>
  <div>
    <div v-if="!canManage" class="alert alert-warning">
      Acesso restrito: apenas administradores podem usar este painel.
    </div>

    <div v-else>
      <PageHeaderCard
        title="Painel administrativo"
        subtitle="Gerencie usuarios e produtos do sistema a partir daqui."
      />

      <UserFormCard
        :user-form="userForm"
        :is-editing="editingUserId !== null"
        @submit="submitUserForm"
        @clear="resetUserForm"
      />

      <UserTableCard :users="users" @edit="editUser" @delete="deleteUser" />

      <ProductFormCard
        :product-form="productForm"
        :is-editing="editingProductId !== null"
        @submit="submitProductForm"
        @clear="resetProductForm"
      />

      <ProductTableCard
        :products="products"
        @edit="editProduct"
        @delete="deleteProduct"
      />
    </div>
  </div>
</template>
