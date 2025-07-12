<template>
  <div id="app" class="app-root">
    <Navbar />
    <main class="nb-container py-8">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style scoped>
main {
  flex: 1 0 auto;
  min-height: 0;
}
</style>

