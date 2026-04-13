import { computed, ref } from 'vue'

export type UserRole = 'admin' | 'customer'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type Product = {
  id: string
  name: string
  price: number
  stock: number
}

export type Transaction = {
  id: string
  type: 'Venda' | 'Compra'
  productId: string
  productName: string
  userId: string
  userName: string
  quantity: number
  total: number
  date: string
}

const STORAGE_KEYS = {
  users: 'estoque-users',
  products: 'estoque-products',
  transactions: 'estoque-transactions',
  currentUser: 'estoque-current-user',
}

const uuid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

const loadStorage = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const saveStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const defaultUsers: User[] = [
  { id: uuid(), name: 'Administrador', email: 'admin@loja.com', role: 'admin' },
  { id: uuid(), name: 'Cliente Exemplo', email: 'cliente@loja.com', role: 'customer' },
]

const defaultProducts: Product[] = [
  { id: uuid(), name: 'Camiseta', price: 79.9, stock: 20 },
  { id: uuid(), name: 'Caneca', price: 29.9, stock: 35 },
  { id: uuid(), name: 'Notebook', price: 3499.0, stock: 8 },
]

export const users = ref<User[]>(loadStorage<User[]>(STORAGE_KEYS.users, defaultUsers))
export const products = ref<Product[]>(loadStorage<Product[]>(STORAGE_KEYS.products, defaultProducts))
export const transactions = ref<Transaction[]>(loadStorage<Transaction[]>(STORAGE_KEYS.transactions, []))
export const currentUserId = ref<string>(localStorage.getItem(STORAGE_KEYS.currentUser) || users.value[0]?.id || '')

export const currentUser = computed(() => users.value.find((user) => user.id === currentUserId.value) ?? null)
export const isAdmin = computed(() => currentUser.value?.role === 'admin')
export const isCustomer = computed(() => currentUser.value?.role === 'customer')

const persistAll = () => {
  saveStorage(STORAGE_KEYS.users, users.value)
  saveStorage(STORAGE_KEYS.products, products.value)
  saveStorage(STORAGE_KEYS.transactions, transactions.value)
  saveStorage(STORAGE_KEYS.currentUser, currentUserId.value)
}

export const selectUser = (id: string) => {
  currentUserId.value = id
  saveStorage(STORAGE_KEYS.currentUser, id)
}

export const saveUser = (name: string, email: string, role: UserRole, id?: string) => {
  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  if (!trimmedName || !trimmedEmail) return

  if (id) {
    const index = users.value.findIndex((user) => user.id === id)
    if (index >= 0) {
      users.value[index] = { id, name: trimmedName, email: trimmedEmail, role }
    }
  } else {
    users.value.push({ id: uuid(), name: trimmedName, email: trimmedEmail, role })
  }

  persistAll()
}

export const deleteUser = (id: string) => {
  users.value = users.value.filter((user) => user.id !== id)
  if (currentUserId.value === id) {
    currentUserId.value = users.value[0]?.id || ''
    saveStorage(STORAGE_KEYS.currentUser, currentUserId.value)
  }
  persistAll()
}

export const saveProduct = (name: string, price: number, stock: number, id?: string) => {
  const trimmedName = name.trim()
  if (!trimmedName || price <= 0 || stock < 0) return

  if (id) {
    const index = products.value.findIndex((product) => product.id === id)
    if (index >= 0) {
      products.value[index] = { id, name: trimmedName, price, stock }
    }
  } else {
    products.value.push({ id: uuid(), name: trimmedName, price, stock })
  }

  persistAll()
}

export const deleteProduct = (id: string) => {
  products.value = products.value.filter((product) => product.id !== id)
  transactions.value = transactions.value.filter((transaction) => transaction.productId !== id)
  persistAll()
}

export const executeTransaction = (productId: string, quantity: number) => {
  if (!currentUser.value || quantity <= 0) return false

  const product = products.value.find((item) => item.id === productId)
  if (!product || quantity > product.stock) return false

  product.stock -= quantity
  transactions.value.unshift({
    id: uuid(),
    type: currentUser.value.role === 'admin' ? 'Venda' : 'Compra',
    productId: product.id,
    productName: product.name,
    userId: currentUser.value.id,
    userName: currentUser.value.name,
    quantity,
    total: Number((product.price * quantity).toFixed(2)),
    date: new Date().toLocaleString(),
  })

  persistAll()
  return true
}

export const recentTransactions = computed(() => transactions.value.slice(0, 8))
export const userTransactions = computed(() => transactions.value.filter((transaction) => transaction.userId === currentUserId.value))
export const salesTransactions = computed(() => transactions.value.filter((transaction) => transaction.type === 'Venda'))
export const totalInventoryValue = computed(() => products.value.reduce((sum, item) => sum + item.price * item.stock, 0))
export const totalUsers = computed(() => users.value.length)
export const totalProducts = computed(() => products.value.length)
