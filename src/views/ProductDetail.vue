<template>
  <div class="container py-5" style="max-width: 600px;">
    <div v-if="!product" class="alert alert-danger">Produk tidak ditemukan.</div>
    <div v-else class="card shadow">
      <img :src="product.image" class="card-img-top" :alt="product.name" style="object-fit:contain;max-height:300px;" />
      <div class="card-body">
        <h4 class="card-title">{{ product.name }}</h4>
        <p class="card-text"><strong>Harga:</strong> ${{ product.price }}</p>
        <p class="card-text"><strong>Stok:</strong> {{ product.stockStatus === 'habis' ? 'Stok Habis' : product.stock }}</p>
        <p class="card-text"><strong>Deskripsi:</strong></p>
        <div class="border rounded p-2" style="background:#f8f9fa;white-space:pre-line;">{{ product.description }}</div>
        <router-link class="btn btn-secondary mt-3" to="/products">Kembali</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ProductDetail',
  setup() {
    const route = useRoute()
    const product = ref(null)

    onMounted(() => {
      const products = JSON.parse(localStorage.getItem('inputProducts') || '[]')
      const idx = parseInt(route.params.index)
      if (!isNaN(idx) && products[idx]) {
        product.value = products[idx]
      }
    })

    return { product }
  }
}
</script> 