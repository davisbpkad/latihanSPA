<template>
  <div class="container py-5" style="max-width: 600px;">
    <div v-if="!product" class="alert alert-danger">Produk tidak ditemukan.</div>
    <div v-else class="card shadow">
      <img :src="product.image" class="card-img-top" :alt="product.name" style="object-fit:contain;max-height:300px;" />
      <div class="card-body">
        <h4>{{ product.name }}</h4>
        <p><strong>Harga:</strong> ${{ product.price }}</p>
        <p><strong>Stok:</strong> {{ product.stockStatus === 'habis' ? 'Stok Habis' : product.stock }}</p>
        <p><strong>Deskripsi:</strong></p>
        <div class="border rounded p-2" style="background:#f8f9fa;white-space:pre-line;">
          {{ product.description }}
        </div>
        <router-link class="btn btn-secondary mt-3" to="/products">Kembali</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const product = ref(null)

onMounted(() => {
  const products = JSON.parse(localStorage.getItem('inputProducts') || '[]')
  const idx = Number(route.params.index)
  product.value = !isNaN(idx) ? products[idx] : null
})
</script>
