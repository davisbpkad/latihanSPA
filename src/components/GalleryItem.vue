<template>
  <div class="card h-100 gallery-card">
    <div class="image-container">
      <img
        :src="gallery.image"
        :alt="gallery.title"
        class="card-img-top gallery-image"
        @load="imageLoaded = true"
        @error="imageError = true"
      />
      <div v-if="!imageLoaded && !imageError" class="image-loading">
        <div class="spinner-border spinner-border-sm" role="status"></div>
      </div>
      <div v-if="imageError" class="image-error">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
    </div>
    <div class="card-body p-3">
      <h6 class="card-title text-truncate mb-2" :title="gallery.title">
        {{ formatTitle(gallery.title) }}
      </h6>
      <p class="card-text small text-muted mb-2" :title="gallery.description">
        {{ gallery.description }}
      </p>
      <div class="gallery-meta">
        <small class="text-muted">
          <i class="fas fa-user me-1"></i>
          {{ gallery.author }}
        </small>
        <small class="text-muted ms-2">
          <i class="fas fa-expand me-1"></i>
          {{ gallery.width }}×{{ gallery.height }}
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'GalleryItem',
    props: {
        gallery: {
            type: Object,
            required: true
        }
    },
    setup() {
        const imageLoaded = ref(false)
        const imageError = ref(false)

        const formatTitle = (title) => {
            return title ? title.charAt(0).toUpperCase() + title.slice(1) : ''
        }

        return {
            imageLoaded,
            imageError,
            formatTitle
        }
    }
}
</script>

<style scoped>
.gallery-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.gallery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-card:hover .gallery-image {
  transform: scale(1.05);
}

.image-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #6c757d;
}

.image-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #dc3545;
  font-size: 2rem;
}

.gallery-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e9ecef;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.card-text {
  font-size: 0.875rem;
  line-height: 1.4;
}
</style>
