<template>
  <div class="container mt-4 pb-5">
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status"></div>
      <p class="mt-2">Loading gallery...</p>
    </div>
    <div v-else-if="error" class="alert alert-danger" role="alert">
      <h4>Error loading gallery</h4>
      <p>{{ error }}</p>
      <button class="btn btn-outline-danger" @click="reloadPage">
        Try Again
      </button>
    </div>
    <div v-else class="row">
      <div v-if="gallerys.length === 0" class="col-12 text-center">
        <p>No Gallery found.</p>
      </div>
      <GalleryItem
        v-for="gallery in gallerys"
        :key="gallery.id"
        :gallery="gallery"
        class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GalleryItem from '../components/GalleryItem.vue'
import { generateImageData } from '../utils/api.js'
import { DEFAULT_VALUES } from '../constants/api.js'

const gallerys = ref([])
const loading = ref(true)
const error = ref(null)

const reloadPage = () => window.location.reload()

onMounted(async () => {
  try {
    const images = []
    for (let i = 1; i <= DEFAULT_VALUES.GALLERY_IMAGE_COUNT; i++) {
      images.push(await generateImageData(i))
    }
    gallerys.value = images
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container { max-width: 1200px; }
.row { margin: 0 -8px; display: flex; flex-wrap: wrap; gap: 1.5rem; }
.col-12, .col-sm-6, .col-md-4, .col-lg-3 { padding: 0 8px; }
.spinner-border { color: #7cb6f8; }
</style>
