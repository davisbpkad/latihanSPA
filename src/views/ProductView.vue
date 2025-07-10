<template>
<div class="container mt-4 mb-5" style="margin-bottom: 100px;">
  <!-- Product Input Form -->
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">{{ isEditMode ? 'Edit Produk' : 'Tambah Produk' }}</h5>
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

  <!-- Hasil Inputan Produk -->
  <div v-if="inputProducts.length" class="mb-4">
    <h5>Produk yang Ditambahkan</h5>
    <div class="row">
      <div v-for="(prod, idx) in inputProducts" :key="idx" class="col-md-4 mb-3">
        <ProductItem :product="prod" :index="idx" @edit="startEdit" @delete="handleDelete" @detail="showDetail" />
      </div>
    </div>
  </div>

  <!-- Product Detail Modal -->
  <ProductDetailModal 
    :isVisible="isModalVisible" 
    :product="selectedProduct" 
    @close="closeModal" 
  />
</div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import ProductItem from '../components/ProductItem.vue'
import ProductDetailModal from '../components/ProductDetailModal.vue'
import ProductForm from '../components/ProductForm.vue'

const apiProducts = ref([])
const inputProducts = ref([])
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
    const res = await fetch("https://fakestoreapi.com/products?limit=12")
    if (!res.ok) throw new Error(`Error: ${res.status}`)
    apiProducts.value = await res.json()
  } catch (err) {}
  const saved = localStorage.getItem('inputProducts')
  if (saved) {
    try {
      inputProducts.value = JSON.parse(saved)
    } catch {}
  }
})

watch(inputProducts, (val) => {
  localStorage.setItem('inputProducts', JSON.stringify(val))
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
</script>

<style scoped>
.container {
  margin-bottom: 100px;
}
</style>