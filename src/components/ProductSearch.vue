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
  background: #fff59f;
  border: 4px solid #111;
  border-radius: 12px;
  box-shadow: 8px 8px 0 #111;
  color: #111;
  padding: 1.2rem 1rem;
  margin-bottom: 2rem;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .search-container.nb-card {
    padding: 0.8rem 0.6rem;
    margin-bottom: 1rem;
    border-width: 2px;
    border-radius: 8px;
    box-shadow: 4px 4px 0 #111;
  }
  
  .nb-card-title {
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
  }
  
  .nb-input.nb-search-input {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    border-width: 2px;
    box-shadow: 1px 1px 0 #111;
  }
  
  .nb-btn {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
    border-width: 2px;
    box-shadow: 1px 1px 0 #111;
  }
  
  .nb-btn-secondary {
    box-shadow: 2px 2px 0 #111;
  }
  
  .nb-btn:hover {
    box-shadow: 3px 3px 0 #111;
  }
}

/* Extra small mobile devices */
@media (max-width: 480px) {
  .search-container.nb-card {
    padding: 0.6rem 0.5rem;
    border-width: 2px;
    box-shadow: 4px 4px 0 #111;
  }
  
  .nb-card-title {
    font-size: 0.8rem;
  }
  
  .nb-input.nb-search-input {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
  
  .nb-btn {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
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