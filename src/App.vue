<template>
  <div class="app-layout">
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">MyApp</router-link>
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleNavbar"
          :aria-expanded="isNavbarOpen.toString()"
          aria-controls="navbarNav"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          :class="{ show: isNavbarOpen }"
          id="navbarNav"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">Products</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/gallery">Gallery</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">Contact</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Footer from './components/Footer.vue';

const isNavbarOpen = ref(false);

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
}

onMounted(() => {
  console.log('App mounted');
});
</script>
