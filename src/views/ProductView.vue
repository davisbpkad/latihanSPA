<template>
  <div class="container mt-5">
    <div class="card justify-content-center p-4">
      <div class="col-md-8 mx-auto">
        <h1 class="title-4 mb-4">Products</h1>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Loading products...</p>
        </div>
        
        <!-- Error State -->
        <div v-else-if="error" class="alert alert-danger" role="alert">
          <h4>Error loading products</h4>
          <p>{{ error }}</p>
          <button class="btn btn-outline-danger" @click="window.location.reload()">
            Try Again
          </button>
        </div>
        
        <!-- Products Grid -->
        <div v-else class="row">
          <div v-if="products.length === 0" class="col-12 text-center">
            <p>No products found.</p>
          </div>
          <div
            v-else
            v-for="product in products"
            :key="product.id"
            class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <ProductItem :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue'
import { ref, onMounted } from 'vue'

export default {
    name: 'ProductView',
    components: { ProductItem },
    setup() {
        const products = ref([])
        const loading = ref(true)
        const error = ref(null)

        onMounted(async () => {
            try {
                const res = await fetch("https://fakestoreapi.com/products")
                if (!res.ok) throw new Error(`Error: ${res.status}`)
                products.value = await res.json()
            } catch (err) {
                error.value = err.message
            } finally {
                loading.value = false
            }
        })

        return { products, loading, error }
    }
}
</script>

<style scoped>
/* Add your styles here if needed */
</style>