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
/* Main navbar container */
.navbar {
  box-shadow: 0 2px 8px rgba(0,0,0,0.03); /* Subtle shadow for depth */
  position: sticky; /* Stays at top when scrolling */
  top: 0; /* Position at top of viewport */
  z-index: 3000; /* High z-index to stay above other content */
  background: #fff; /* White background */
}

/* Navigation items container */
.navbar-nav {
  gap: 0.75rem; /* Space between nav items on desktop */
}

/* Individual navigation item */
.nav-item {
  margin-left: 0.5rem; /* Left margin for spacing */
  margin-right: 0.5rem; /* Right margin for spacing */
}

/* Navigation links */
.nav-link {
  padding-left: 1.2rem; /* Left padding for clickable area */
  padding-right: 1.2rem; /* Right padding for clickable area */
}
/* Mobile responsive styles (screens smaller than 992px) */
@media (max-width: 991px) {
  /* Hamburger menu button */
  .navbar-toggler {
    position: absolute; /* Position absolutely within navbar */
    right: 16px; /* Distance from right edge */
    top: 12px; /* Distance from top */
    z-index: 1100; /* High z-index to stay above collapsed menu */
  }
  
  /* Expanded mobile menu container */
  .navbar-collapse.show {
    padding: 1.5rem 1rem 1rem 1rem; /* Padding around menu items */
    width: 90vw; /* Take up 90% of viewport width */
  }
  
  /* Mobile navigation items container */
  .navbar-nav {
    flex-direction: column !important; /* Stack items vertically */
    align-items: center !important; /* Center items horizontally */
    justify-content: center !important; /* Center items vertically */
    gap: 0.25rem; /* Reduced gap between items for compact layout */
    width: 100%; /* Full width */
    margin: 0 auto; /* Center the container */
    text-align: center; /* Center text */
  }
  
  /* Individual mobile navigation item */
  .nav-item {
    width: 100%; /* Full width */
    text-align: center; /* Center text */
    display: flex; /* Use flexbox for centering */
    justify-content: center; /* Center horizontally */
    margin: 0.125rem 0; /* Minimal vertical margin for compact spacing */
  }
  
  /* Mobile navigation links */
  .nav-link {
    width: 100%; /* Full width for better touch targets */
    font-size: 1.05rem; /* Slightly larger font for mobile */
    padding: 1rem 0; /* Vertical padding for touch targets */
    border-radius: 1.5rem; /* Rounded corners */
    margin: 0 auto; /* Center the link */
    transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s; /* Smooth transitions */
    text-align: center; /* Center text */
    display: inline-block; /* Block display for full width */
  }
}
/* Hover and active state styles for navigation links */
.custom-hover {
  transition: background 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s; /* Smooth transitions for all properties */
  border-radius: 4rem; /* Rounded corners for pill-like appearance */
}

/* Hover effect and active route styling */
.custom-hover:hover,
.custom-hover.router-link-exact-active {
  background: #7cb6f8; /* Light blue background */
  color: #ffffff !important; /* White text with high priority */
  border-radius: 4rem; /* Maintain rounded corners */
  transform: scale(1.07); /* Slight scale up effect */
  box-shadow: 0 2px 8px rgba(13, 110, 253, 0.08); /* Subtle blue shadow */
}
</style>
