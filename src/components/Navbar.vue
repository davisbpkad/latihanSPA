<template>
  <nav class="navbar">
    <div class="nb-container">
      <div class="navbar-content">
        <router-link class="navbar-brand" to="/">MyApps</router-link>
        <!-- Toggle button -->
        <button
          class="navbar-toggler"
          type="button"
          @click="toggleNavbar"
          :aria-expanded="isNavbarOpen.toString()"
          aria-controls="navbarNav"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <div></div>
          </span>
        </button>
        <div
          class="navbar-menu"
          :class="{ 'navbar-menu-open': isNavbarOpen }"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item" v-for="(item, idx) in navItems" :key="item.to">
              <router-link class="nav-link" :to="item.to">{{ item.label }}</router-link>
            </li>
          </ul>
        </div>
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
  background: var(--nb-primary);
  border-bottom: var(--nb-border-lg);
  box-shadow: var(--nb-shadow-lg);
  position: sticky;
  top: 0;
  z-index: 3000;
  padding: var(--nb-spacing-md) 0;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.navbar-brand {
  font-weight: var(--nb-font-weight-bold);
  font-size: 2rem;
  text-transform: uppercase;
  color: var(--nb-black);
  letter-spacing: 2px;
  border: var(--nb-border-md);
  background: var(--nb-white);
  border-radius: var(--nb-radius-md);
  box-shadow: var(--nb-shadow-md);
  padding: var(--nb-spacing-sm) var(--nb-spacing-lg);
  text-decoration: none;
  transition: var(--nb-transition-fast);
}

.navbar-brand:hover {
  background: var(--nb-success);
  color: var(--nb-black);
  transform: translate(-2px, -2px);
  box-shadow: var(--nb-shadow-lg);
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-nav {
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--nb-spacing-md);
}

.nav-link {
  font-weight: var(--nb-font-weight-bold);
  text-transform: uppercase;
  color: var(--nb-black);
  border: var(--nb-border-md);
  background: var(--nb-white);
  border-radius: var(--nb-radius-md);
  box-shadow: var(--nb-shadow-sm);
  padding: var(--nb-spacing-sm) var(--nb-spacing-lg);
  text-decoration: none;
  font-size: 1.1rem;
  letter-spacing: 1px;
  transition: var(--nb-transition-fast);
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  background: var(--nb-success);
  color: var(--nb-black);
  transform: translate(-2px, -2px);
  box-shadow: var(--nb-shadow-md);
}

.navbar-toggler {
  display: none;
  border: var(--nb-border-md);
  background: var(--nb-white);
  border-radius: var(--nb-radius-md);
  box-shadow: var(--nb-shadow-sm);
  padding: var(--nb-spacing-sm);
  transition: var(--nb-transition-fast);
  cursor: pointer;
}

.navbar-toggler:hover {
  background: var(--nb-success);
  box-shadow: var(--nb-shadow-md);
}

.navbar-toggler-icon {
  background-image: none;
  width: 2rem;
  height: 2rem;
  display: inline-block;
  position: relative;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after,
.navbar-toggler-icon div {
  content: '';
  display: block;
  height: 3px;
  background: var(--nb-black);
  margin: 3px 0;
  border-radius: 2px;
  transition: var(--nb-transition-fast);
}

.navbar-toggler-icon::before {
  width: 100%;
}

.navbar-toggler-icon::after {
  width: 80%;
}

.navbar-toggler-icon div {
  width: 60%;
}

/* Animasi untuk hamburger icon saat aktif */
.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::before {
  transform: rotate(45deg) translate(6px, 6px);
}

.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::after {
  opacity: 0;
}

.navbar-toggler[aria-expanded="true"] .navbar-toggler-icon div {
  transform: rotate(-45deg) translate(7px, -7px);
  width: 100%;
}

@media (max-width: 768px) {
  .navbar-toggler {
    display: block;
    position: absolute;
    right: 16px;
    top: 12px;
    z-index: 1100;
  }

  .navbar-toggler:hover,
  .navbar-toggler:focus,
  .navbar-toggler:active {
    background: var(--nb-success);
    box-shadow: var(--nb-shadow-md);
    transform: scale(1.05);
  }

  .navbar-toggler:active {
    transform: scale(0.95);
  }
  
  .navbar-menu {
    display: none;
    width: 100%;
    margin-top: var(--nb-spacing-md);
  }
  
  .navbar-menu-open {
    display: block;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .navbar-nav {
    flex-direction: column;
    gap: var(--nb-spacing-sm);
  }
  
  .nav-link {
    width: 100%;
    text-align: center;
    padding: var(--nb-spacing-md);
    transition: all 0.2s ease;
  }

  .nav-link:hover,
  .nav-link:focus,
  .nav-link:active {
    background: var(--nb-success);
    color: var(--nb-black);
    transform: scale(1.02);
    box-shadow: var(--nb-shadow-lg);
  }

  .nav-link.router-link-exact-active {
    background: var(--nb-success);
    color: var(--nb-black);
    transform: translate(-2px, -2px);
    box-shadow: var(--nb-shadow-md);
  }

  .nav-link:active {
    transform: scale(0.98);
  }

  /* Touch-specific styles untuk perangkat mobile */
  @media (hover: none) and (pointer: coarse) {
    .navbar-toggler:hover {
      background: var(--nb-white);
      box-shadow: var(--nb-shadow-sm);
      transform: none;
    }

    .nav-link:hover {
      background: var(--nb-white);
      color: var(--nb-black);
      transform: none;
      box-shadow: var(--nb-shadow-sm);
    }

    /* Pastikan active state tetap berfungsi di touch devices */
    .nav-link.router-link-exact-active {
      background: var(--nb-success) !important;
      color: var(--nb-black) !important;
      transform: translate(-2px, -2px) !important;
      box-shadow: var(--nb-shadow-md) !important;
    }
  }
}
</style>
