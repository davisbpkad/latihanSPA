<template>
  <div class="product-view">
    <div class="nb-container">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="nb-heading nb-heading-1">Product</h1>
        <p v-if="isAdmin" class="nb-text nb-text-large">Add, edit, and manage your products with our neo-brutalism interface</p>
        <p v-else class="nb-text nb-text-large">Browse and view our product collection</p>
      </div>

      <!-- Add Product Button (Admin Only) -->
      <div v-if="isAdmin" class="mb-6" style="margin-bottom:2rem;">
        <button class="nb-button nb-button-primary" @click="openAddProduct">
          <i class="fas fa-plus"></i> Tambah Produk
        </button>
      </div>

      <!-- Sheet Product Form (Add/Edit) -->
      <SheetProductForm :visible="showSheet" @close="closeSheet">
        <ProductForm
          :form="form"
          :apiProducts="apiProducts"
          :isEditMode="isEditMode"
          :selectedApiProduct="selectedApiProduct"
          @submit="isEditMode ? handleUpdate() : handleSubmit(); closeSheet()"
          @cancel="closeSheet"
        />
      </SheetProductForm>

      <!-- Search Component -->
      <div class="search-section">
        <ProductSearch 
          :products="inputProducts" 
          @search="handleSearch"
        />
      </div>

      <!-- Product Results -->
      <div v-if="filteredProducts.length" class="products-section">
        <div class="nb-card">
          <h2 class="nb-heading nb-heading-3">
            <span class="icon"><i class="fas fa-box"></i></span>
            List Products
            <span v-if="searchQuery" class="search-results">(Search Results)</span>
          </h2>
          <div class="nb-grid nb-grid-3">
            <ProductItem 
              v-for="(prod, idx) in filteredProducts" 
              :key="idx" 
              :product="prod" 
              :index="getOriginalIndex(idx)" 
              @edit="openEditProduct(getOriginalIndex(idx))" 
              @delete="handleDelete" 
              @detail="showDetail" 
            />
          </div>
        </div>
      </div>

      <!-- No products message -->
      <div v-else-if="inputProducts.length === 0" class="nb-card empty-state">
        <div class="empty-content">
          <span class="empty-icon">📦</span>
          <h3 class="nb-heading nb-heading-3">No Products Yet</h3>
          <p class="nb-text">Add your first product to get started!</p>
        </div>
      </div>

      <!-- No search results message -->
      <div v-else-if="searchQuery && filteredProducts.length === 0" class="nb-card empty-state">
        <div class="empty-content">
          <span class="empty-icon">🔍</span>
          <h3 class="nb-heading nb-heading-3">No Results Found</h3>
          <p class="nb-text">No products match your search for "{{ searchQuery }}"</p>
        </div>
      </div>

      <!-- Product Detail Modal -->
      <ProductDetailModal 
        :isVisible="isModalVisible" 
        :product="selectedProduct" 
        @close="closeModal" 
      />

      <!-- Login Modal -->
      <LoginModal 
        :isVisible="showLogin" 
        @close="showLogin = false"
        @success="handleLoginSuccess"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import ProductItem from '../components/ProductItem.vue'
import ProductDetailModal from '../components/ProductDetailModal.vue'
import ProductForm from '../components/ProductForm.vue'
import ProductSearch from '../components/ProductSearch.vue'
import LoginModal from '../components/LoginModal.vue'
import SheetProductForm from '../components/SheetProductForm.vue'
import { fetchProducts } from '../utils/api.js'
import { useLocalStorage } from '../composables/useLocalStorage.js'
import { useAuth } from '../composables/useAuth.js'

// State management
const apiProducts = ref([])
const { value: inputProducts } = useLocalStorage('inputProducts', [])
const filteredProducts = ref([])
const searchQuery = ref('')
const form = ref({
  selectedApiId: '',
  price: '',
  stock: 1,
  stockStatus: 'ada',
})
const isEditMode = ref(false)
const editIndex = ref(null)
const isModalVisible = ref(false)
const selectedProduct = ref(null)
const showLogin = ref(false)
const showSheet = ref(false)

// Auth management
const { isAdmin } = useAuth()

onMounted(async () => {
  try {
    apiProducts.value = await fetchProducts()
  } catch (err) {
    console.error('Failed to fetch products:', err)
  }
  
  // Initialize filtered products
  filteredProducts.value = [...inputProducts.value]
})

// Update filtered products when input products change
watch(inputProducts, () => {
  handleSearch(searchQuery.value)
}, { deep: true })

watch(() => form.value.stockStatus, (val) => {
  if (val === 'habis') {
    form.value.stock = 0
  } else if (form.value.stock === 0) {
    form.value.stock = 1
  }
})

const selectedApiProduct = computed(() => {
  return apiProducts.value.find(item => item.id === form.value.selectedApiId) || null
})

function handleSubmit() {
  if (!selectedApiProduct.value) return
  if (form.value.price < 1) return
  inputProducts.value.push({
    name: selectedApiProduct.value.title,
    price: form.value.price,
    stock: form.value.stock,
    stockStatus: form.value.stockStatus,
    image: selectedApiProduct.value.image,
    description: selectedApiProduct.value.description
  })
  resetForm()
}

function startEdit(index) {
  const prod = inputProducts.value[index]
  if (!prod) return
  isEditMode.value = true
  editIndex.value = index
  const apiItem = apiProducts.value.find(item => item.title === prod.name)
  form.value = {
    selectedApiId: apiItem ? apiItem.id : '',
    price: prod.price,
    stock: prod.stock,
    stockStatus: prod.stockStatus
  }
}

function handleUpdate() {
  if (editIndex.value === null || !selectedApiProduct.value) return
  if (form.value.price < 1) return
  // Buat objek baru agar reactivity pasti terpicu
  inputProducts.value.splice(editIndex.value, 1, {
    name: selectedApiProduct.value.title,
    price: form.value.price,
    stock: form.value.stock,
    stockStatus: form.value.stockStatus,
    image: selectedApiProduct.value.image,
    description: selectedApiProduct.value.description
  })
  resetForm()
}

function handleDelete(index) {
  inputProducts.value.splice(index, 1)
  resetForm()
}

function resetForm() {
  form.value = {
    selectedApiId: '',
    price: '',
    stock: 1,
    stockStatus: 'ada',
  }
  isEditMode.value = false
  editIndex.value = null
}

function showDetail(product) {
  selectedProduct.value = product
  isModalVisible.value = true
}

function closeModal() {
  isModalVisible.value = false
  selectedProduct.value = null
}

function openAddProduct() {
  resetForm()
  isEditMode.value = false
  showSheet.value = true
}
function openEditProduct(index) {
  startEdit(index)
  showSheet.value = true
}
function closeSheet() {
  showSheet.value = false
}

// Search functionality
function handleSearch(query) {
  searchQuery.value = query
  if (!query.trim()) {
    filteredProducts.value = [...inputProducts.value]
  } else {
    const lowercaseQuery = query.toLowerCase()
    filteredProducts.value = inputProducts.value.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery)
    )
  }
}

// Get original index for edit/delete operations
function getOriginalIndex(filteredIndex) {
  const filteredProduct = filteredProducts.value[filteredIndex]
  return inputProducts.value.findIndex(product => 
    product.name === filteredProduct.name && 
    product.price === filteredProduct.price
  )
}

// Login modal functions
function showLoginModal() {
  showLogin.value = true
}

function handleLoginSuccess() {
  showLogin.value = false
}
</script>

<style scoped>
.product-view {
  padding: 30px 0 var(--nb-spacing-xl) 0;
}

.page-header {
  text-align: center;
  margin-bottom: var(--nb-spacing-xl);
}

.page-header h1 {
  margin-bottom: var(--nb-spacing-md);
}

.form-section {
  margin-bottom: var(--nb-spacing-xl);
}

.search-section {
  position: sticky;
  top: 120px; /* ganti sesuai tinggi navbar jika perlu */
  z-index: 10;
  background: var(--nb-white);
  margin-bottom: var(--nb-spacing-xl);
}



.products-section {
  margin-bottom: var(--nb-spacing-xl);
}

.icon {
  font-size: 1.5rem;
  margin-right: var(--nb-spacing-sm);
}

.search-results {
  color: var(--nb-gray-600);
  font-weight: var(--nb-font-weight-normal);
  font-size: 1rem;
}

.empty-state {
  text-align: center;
  padding: var(--nb-spacing-2xl);
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--nb-spacing-md);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--nb-spacing-md);
}

@media (max-width: 768px) {
  .product-view {
    padding: var(--nb-spacing-lg) 0;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .empty-icon {
    font-size: 3rem;
  }
}
</style>