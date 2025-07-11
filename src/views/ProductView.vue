<template>
<div class="container mt-4 mb-5" style="margin-bottom: 100px;">
  <!-- Product Input Form -->
  <div class="nb-card nb-form mb-4">
    <div class="nb-card-body">
      <h5 class="nb-card-title mb-3">{{ isEditMode ? 'Edit Produk' : 'Tambah Produk' }}</h5>
      <ProductForm
        :form="form"
        :apiProducts="apiProducts"
        :isEditMode="isEditMode"
        :selectedApiProduct="selectedApiProduct"
        @submit="isEditMode ? handleUpdate() : handleSubmit()"
        @cancel="resetForm"
      />
    </div>
  </div>

  <!-- Search Component -->
  <ProductSearch 
    :products="inputProducts" 
    @search="handleSearch"
  />

  <!-- Hasil Inputan Produk -->
  <div v-if="filteredProducts.length" class="mb-4">
    <div class="nb-card nb-card-list mb-3">
      <div class="nb-card-body">
        <h5 class="nb-card-title">
          <i class="fas fa-box me-2"></i>
          Produk yang Ditambahkan
          <span v-if="searchQuery" class="nb-card-muted">(Hasil pencarian)</span>
        </h5>
        <div class="row">
          <div v-for="(prod, idx) in filteredProducts" :key="idx" class="col-md-4 mb-3">
            <ProductItem 
              :product="prod" 
              :index="getOriginalIndex(idx)" 
              @edit="startEdit" 
              @delete="handleDelete" 
              @detail="showDetail" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- No products message -->
  <div v-else-if="inputProducts.length === 0" class="nb-card nb-card-empty text-center py-5 mb-4">
    <div class="nb-card-body">
      <i class="fas fa-box-open fa-3x nb-card-muted mb-3"></i>
      <h5 class="nb-card-title nb-card-muted">Belum ada produk</h5>
      <p class="nb-card-muted">
        Tambahkan produk pertama Anda!
      </p>
    </div>
  </div>

  <!-- No search results message -->
  <div v-else-if="searchQuery && filteredProducts.length === 0" class="nb-card nb-card-empty text-center py-5 mb-4">
    <div class="nb-card-body">
      <i class="fas fa-search fa-3x nb-card-muted mb-3"></i>
      <h5 class="nb-card-title nb-card-muted">Tidak ada hasil</h5>
      <p class="nb-card-muted">Tidak ada produk yang cocok dengan pencarian "{{ searchQuery }}"</p>
    </div>
  </div>

  <!-- Product Detail Modal -->
  <ProductDetailModal 
    :isVisible="isModalVisible" 
    :product="selectedProduct" 
    @close="closeModal" 
  />
</div>
<div class="container">
</div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import ProductItem from '../components/ProductItem.vue'
import ProductDetailModal from '../components/ProductDetailModal.vue'
import ProductForm from '../components/ProductForm.vue'
import ProductSearch from '../components/ProductSearch.vue'
import { fetchProducts } from '../utils/api.js'
import { useLocalStorage } from '../composables/useLocalStorage.js'

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
  const prod = inputProducts.value[editIndex.value]
  if (!prod) return
  prod.name = selectedApiProduct.value.title
  prod.price = form.value.price
  prod.stock = form.value.stock
  prod.stockStatus = form.value.stockStatus
  prod.image = selectedApiProduct.value.image
  prod.description = selectedApiProduct.value.description
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
</script>

<style scoped>
.container {
  margin-bottom: 3.5rem;
}
.nb-card {
  background: #ffffff;
  border: 4px solid #111;
  border-radius: 12px;
  box-shadow: 8px 8px 0 #111;
  color: #111;
  margin-bottom: 1rem;
}
.nb-card-body {
  padding: 2rem 1.5rem;
  margin-bottom: 1rem;
  
}
.nb-card-title {
  font-size: 1.3rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #111;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}
.nb-card-muted {
  color: #888 !important;
  font-weight: 700;
}
.nb-card-list {
  margin-bottom: 2rem;
}
.nb-card-empty {
  background: #fff;
  border: 4px dashed #111;
  box-shadow: 4px 4px 0 #111;
  color: #888;
  border-radius: 12px;
}
@media (max-width: 991px) {
  .nb-card-body {
    padding: 1.2rem 0.7rem;
  }
  .nb-card-title {
    font-size: 1.05rem;
  }
}
</style>