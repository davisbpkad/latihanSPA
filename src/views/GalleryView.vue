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
import { generateImageData } from '../utils/api.js'
import { DEFAULT_VALUES } from '../constants/api.js'

export default {
  name: 'GalleryView',
  components: { GalleryItem },
  setup() {
    const gallerys = ref([])
    const loading = ref(true)
    const error = ref(null)

    onMounted(async () => {
      try {
        const images = []
        
        // Generate image data using utility function
        for (let i = 1; i <= DEFAULT_VALUES.GALLERY_IMAGE_COUNT; i++) {
          const imageData = await generateImageData(i)
          images.push(imageData)
        }
        
        gallerys.value = images
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

<style scoped>
.container {
  max-width: 1200px;
}

.row {
  margin: 0 -8px;
}

.col-12, .col-sm-6, .col-md-4, .col-lg-3 {
  padding: 0 8px;
}

.spinner-border {
  color: #7cb6f8;
}
</style>
