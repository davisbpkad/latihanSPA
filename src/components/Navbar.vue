<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <router-link class="navbar-brand" to="/">MyApps</router-link>
      <!-- Toggle button -->
      <button
        class="navbar-toggler mb-2"
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
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-for="(item, idx) in navItems" :key="item.to">
            <router-link class="nav-link custom-hover" :to="item.to">{{ item.label }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isNavbarOpen = ref(false)
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Product', to: '/products' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' }
]

function toggleNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  position: sticky;
  top: 0;
  z-index: 3000;
  background: #fff;
}
.navbar-nav {
  gap: 0.75rem;
}
.nav-item {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.nav-link {
  padding-left: 1.2rem;
  padding-right: 1.2rem;
}
@media (max-width: 991px) {
  .navbar-toggler {
    position: absolute;
    right: 16px;
    top: 12px;
    z-index: 1100;
  }
  .navbar-collapse.show {
    padding: 1.5rem 1rem 1rem 1rem;
    width: 90vw;
  }
  .navbar-nav {
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 1rem;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .nav-item {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 0.5rem 0;
  }
  .nav-link {
    width: 100%;
    font-size: 1.05rem;
    padding: 1rem 0;
    border-radius: 1.5rem;
    margin: 0 auto;
    transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
    text-align: center;
    display: inline-block;
  }
}
.custom-hover {
  transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;
  border-radius: 4rem;
}
.custom-hover:hover,
.custom-hover.router-link-exact-active {
  background: #7cb6f8;
  color: #ffffff !important;
  border-radius: 4rem;
  transform: scale(1.07);
  box-shadow: 0 2px 8px rgba(13, 110, 253, 0.08);
}
</style>
