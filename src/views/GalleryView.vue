<template>
  <div class="nb-container gallery-spacing">
    <div class="nb-card">
      <h2 class="nb-heading nb-heading-3">Gallery</h2>
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
      <div v-else class="gallery-grid">
        <div v-if="gallerys.length === 0" class="text-center" style="grid-column: 1 / -1;">
          <p>No Gallery found.</p>
        </div>
        <GalleryItem
          v-for="gallery in gallerys"
          :key="gallery.id"
          :gallery="gallery"
        />
      </div>
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
.nb-card { 
  max-width: 1200px; 
  background: #fff2e8; 
}

.gallery-spacing {
  margin-top: var(--nb-spacing-xl);
  margin-bottom: var(--nb-spacing-xl);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--nb-spacing-lg);
}
@media (max-width: 1200px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
.spinner-border { color: #7cb6f8; }
</style>
