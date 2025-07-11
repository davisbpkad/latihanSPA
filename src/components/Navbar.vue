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
  background: #fff200;
  border-bottom: 4px solid #111;
  box-shadow: 0 8px 0 #111;
  position: sticky;
  top: 0;
  z-index: 3000;
}
.navbar-brand {
  font-weight: 900;
  font-size: 2rem;
  text-transform: uppercase;
  color: #111 !important;
  letter-spacing: 2px;
  border: 3px solid #111;
  background: #fff;
  border-radius: 8px;
  box-shadow: 4px 4px 0 #111;
  padding: 0.2rem 1.2rem;
  margin-right: 1.5rem;
  transition: all 0.1s;
}
.navbar-brand:hover {
  background: #00e676;
  color: #111 !important;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #111;
}
.navbar-nav {
  gap: 0.75rem;
}
.nav-item {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.nav-link {
  font-weight: 900;
  text-transform: uppercase;
  color: #111 !important;
  border: 3px solid #111;
  background: #fff;
  border-radius: 8px;
  box-shadow: 2px 2px 0 #111;
  padding: 0.5rem 1.2rem;
  margin: 0 0.2rem;
  transition: all 0.1s;
  font-size: 1.1rem;
  letter-spacing: 1px;
}
.nav-link:hover,
.nav-link.router-link-exact-active {
  background: #00e676;
  color: #111 !important;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #111;
}
.navbar-toggler {
  border: 3px solid #111;
  background: #fff200;
  border-radius: 8px;
  box-shadow: 2px 2px 0 #111;
  padding: 0.4rem 0.8rem;
  transition: all 0.1s;
}
.navbar-toggler:focus,
.navbar-toggler:hover {
  background: #00e676;
  box-shadow: 4px 4px 0 #111;
}
.navbar-toggler-icon {
  background-image: none;
  width: 2rem;
  height: 2rem;
  display: inline-block;
  position: relative;
}
.navbar-toggler-icon:before,
.navbar-toggler-icon:after,
.navbar-toggler-icon div {
  content: '';
  display: block;
  height: 4px;
  background: #111;
  margin: 5px 0;
  border-radius: 2px;
}
.navbar-toggler-icon:before {
  width: 100%;
}
.navbar-toggler-icon:after {
  width: 80%;
}
.navbar-toggler-icon div {
  width: 60%;
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
    background: #fff200;
    border: 3px solid #111;
    box-shadow: 4px 4px 0 #111;
    border-radius: 12px;
  }
  .navbar-nav {
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 0.25rem;
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
  .nav-item {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 0.125rem 0;
  }
  .nav-link {
    width: 100%;
    font-size: 1.05rem;
    padding: 1rem 0;
    border-radius: 8px;
    margin: 0 auto;
    text-align: center;
    display: inline-block;
  }
}
</style>
