<template>
  <div class="search-container mb-4">
    <div class="card">
      <div class="card-body">
        <h6 class="card-title mb-3">
          <i class="fas fa-search me-2"></i>
          Cari Produk
        </h6>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Masukkan nama produk..."
            v-model="searchQuery"
            @input="handleSearch"
          />
          <button 
            class="btn btn-outline-secondary" 
            type="button"
            @click="clearSearch"
            :disabled="!searchQuery"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div v-if="searchQuery" class="mt-2">
          <small class="text-muted">
            Menampilkan {{ filteredCount }} dari {{ totalCount }} produk
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['search'])

const searchQuery = ref('')
const filteredCount = ref(0)
const totalCount = ref(0)

// Update counts when products change
watch(() => props.products, (newProducts) => {
  totalCount.value = newProducts.length
  updateFilteredCount()
}, { immediate: true })

function handleSearch() {
  const query = searchQuery.value.toLowerCase().trim()
  emit('search', query)
  updateFilteredCount()
}

function clearSearch() {
  searchQuery.value = ''
  emit('search', '')
  updateFilteredCount()
}

function updateFilteredCount() {
  if (!searchQuery.value) {
    filteredCount.value = totalCount.value
  } else {
    const query = searchQuery.value.toLowerCase().trim()
    filteredCount.value = props.products.filter(product => 
      product.name.toLowerCase().includes(query)
    ).length
  }
}
</script>

<style scoped>
.search-container {
  position: sticky;
  top: 80px;
  z-index: 1000;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.input-group .form-control:focus {
  border-color: #7cb6f8;
  box-shadow: 0 0 0 0.2rem rgba(124, 182, 248, 0.25);
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  border-color: #6c757d;
}
</style> 