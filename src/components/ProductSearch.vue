<template>
  <div class="search-container nb-card mb-4">
    <div class="nb-card-body">
      <h6 class="nb-card-title mb-3">
        <i class="fas fa-search me-2"></i>
        Cari Produk
      </h6>
      <div class="input-group">
        <input
          type="text"
          class="nb-input nb-search-input"
          placeholder="Masukkan nama produk..."
          v-model="searchQuery"
          @input="handleSearch"
        />
        <button 
          class="nb-btn nb-btn-secondary" 
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
.search-container.nb-card {
  background: #fff200;
  border: 4px solid #111;
  border-radius: 12px;
  box-shadow: 8px 8px 0 #111;
  color: #111;
  padding: 1.2rem 1rem;
  margin-bottom: 2rem;
  position: sticky;
  top: 80px;
  z-index: 1000;
}
.nb-card-body {
  padding: 0;
}
.nb-card-title {
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #111;
  margin-bottom: 0.5rem;
}
.nb-input.nb-search-input {
  border: 3px solid #111;
  border-radius: 8px;
  background: #fff;
  color: #111;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  box-shadow: 2px 2px 0 #111;
  width: 100%;
  margin-bottom: 0.5rem;
  transition: all 0.1s;
}
.nb-input.nb-search-input:focus {
  outline: none;
  border-color: #00e676;
  box-shadow: 4px 4px 0 #111;
}
.nb-btn {
  font-weight: 900;
  border: 3px solid #111;
  box-shadow: 2px 2px 0 #111;
  border-radius: 8px;
  background: #fff;
  color: #111;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  transition: all 0.1s;
  cursor: pointer;
}
.nb-btn-secondary {
  background: #ff6b6b;
  color: #fff;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.nb-btn-secondary:disabled {
  background: #ccc;
  color: #888;
  box-shadow: none;
  cursor: not-allowed;
}
.nb-btn:hover {
  background: #00e676;
  color: #111;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #111;
}
</style> 