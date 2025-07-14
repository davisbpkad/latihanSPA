<template>
  <div id="app" class="app-root">
    <Navbar />
    <main class="nb-container py-8">
      <router-view />
    </main>
    <Footer />
    <Toast v-bind="toast" />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Toast from './components/Toast.vue'

const toast = ref({ visible: false, message: '', type: 'success' })
function showToast(message, type = 'success') {
  toast.value = { visible: true, message, type }
  setTimeout(() => { toast.value.visible = false }, 2000)
}
provide('showToast', showToast)
</script>

<style scoped>
main {
  flex: 1 0 auto;
  min-height: 0;
}
</style>

