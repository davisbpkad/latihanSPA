<template>
<div class="container mt-4 pb-5">
  <!-- Loading State -->
  <div v-if="loading" class="text-center">
    <div class="spinner-border" role="status"></div>
    <p class="mt-2">Loading gallery...</p>
  </div>
  <!-- Error State -->
  <div v-else-if="error" class="alert alert-danger" role="alert">
    <h4>Error loading gallery</h4>
    <p>{{ error }}</p>
    <button class="btn btn-outline-danger" @click="window.location.reload()">
      Try Again
    </button>
  </div>
  <!-- Gallery Grid -->
  <div v-else class="row">
    <div v-if="gallerys.length === 0" class="col-12 text-center">
      <p>No Gallery found.</p>
    </div>
    <div v-else v-for="gallery in gallerys" :key="gallery.id" class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <GalleryItem :gallery="gallery" />
    </div>
  </div>
</div>
</template>

<script>
import GalleryItem from '../components/GalleryItem.vue'
import { ref, onMounted } from 'vue'

export default {
  name: 'GalleryView',
  components: { GalleryItem },
  setup() {
    const gallerys = ref([])
    const loading = ref(true)
    const error = ref(null)

    onMounted(async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=16")
        if (!res.ok) throw new Error(`Error: ${res.status}`)
        gallerys.value = await res.json()
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    })

    return { gallerys, loading, error }
  }
}
</script>
