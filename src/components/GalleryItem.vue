<template>
  <div class="nb-card gallery-card h-100">
    <div class="image-container">
      <img
        :src="gallery.image"
        :alt="gallery.title"
        class="nb-card-img-top gallery-image"
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
    <div class="nb-card-body p-3">
      <h6 class="nb-card-title text-truncate mb-2" :title="gallery.title">
        {{ formatTitle(gallery.title) }}
      </h6>
      <p class="nb-card-text small text-muted mb-2" :title="gallery.description">
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
.nb-card.gallery-card {
  background: var(--nb-white);
  border: 4px solid #111;
  border-radius: 12px;
  box-shadow: 8px 8px 0 #111;
  color: #111;
  transition: transform 0.2s, box-shadow 0.2s;
  max-width: 100%;
  margin-bottom: 2rem;
}
.nb-card.gallery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 0 #111;
}
.image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}
.nb-card-img-top.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 3px solid #111;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 4px 0 #111;
  background: #fff;
  transition: transform 0.3s;
}
.nb-card.gallery-card:hover .nb-card-img-top.gallery-image {
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
.nb-card-body {
  padding: 1.2rem 1rem 1rem 1rem;
}
.nb-card-title {
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #111;
  margin-bottom: 0.3rem;
}
.nb-card-text {
  font-size: 0.98rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 0.5rem;
}
.gallery-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 2px solid #111;
}
</style>
