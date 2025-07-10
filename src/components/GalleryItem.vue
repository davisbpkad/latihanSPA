<template>
  <div class="card h-100">
    <img
      :src="gallery.image"
      :alt="gallery.title"
      class="card-img-top"
      style="object-fit: contain; height: 120px;"
    />
    <div class="card-body p-2">
      <h6 class="card-title text-truncate" :title="gallery.title">{{ formatTitle(gallery.title) }}</h6>
      <p class="card-text small text-truncate" :title="gallery.description">{{ gallery.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'GalleryItem',
    props: {
        gallery: {
            type: Object,
            required: true
        }
    },
    methods: {
      formatTitle(title) {
        // Contoh logic function: kapitalisasi judul
        return title ? title.charAt(0).toUpperCase() + title.slice(1) : ''
      }
    }
}
</script>

<style scoped>
/* Add your styles here if needed */
</style>