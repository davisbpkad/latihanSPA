<template>
  <div class="home">
    <div class="home-hero">
      <div class="nb-container">
        <div class="hero-content">
          <h1 class="nb-heading nb-heading-1">Welcome to MyApps</h1>
          <p class="nb-text nb-text-large">Discover amazing products and services with our neo-brutalism design</p>
          <div class="hero-buttons">
            <router-link to="/products" class="nb-button nb-button-primary">Explore Products</router-link>
            <router-link to="/gallery" class="nb-button nb-button-secondary">View Gallery</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="home-sections">
      <div class="nb-container">
        <div class="section-grid">
          <div class="section-item">
            <div class="nb-card">
              <h2 class="nb-heading nb-heading-3">Featured Carousel</h2>
              <Carousel />
            </div>
          </div>
          
          <div class="section-item">
            <div class="nb-card">
              <h2 class="nb-heading nb-heading-3">Voucher Generator</h2>
              <VoucherGenerator />
            </div>
          </div>
        </div>
        
        <div class="blog-section">
          <h2 class="nb-heading nb-heading-2 text-center">Latest Blog Posts</h2>
          <div class="nb-grid nb-grid-3">
            <Blogpost />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Carousel from '../components/Carousel.vue'
import Blogpost from '../components/Blogpost.vue'
import VoucherGenerator from '../components/VoucherGenerator.vue'
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.home-hero {
  /* make home hero have space beetween navbar */
  margin-top: 1rem;
  background: var(--nb-primary);
  border-bottom: var(--nb-border-lg);
  box-shadow: var(--nb-shadow-lg);
  padding: var(--nb-spacing-2xl) 0;
  margin-bottom: var(--nb-spacing-2xl);
}

.hero-content {
  text-align: center;
  color: var(--nb-white);
}

.hero-content h1 {
  color: var(--nb-white);
  margin-bottom: var(--nb-spacing-lg);
}

.hero-content p {
  color: var(--nb-white);
  margin-bottom: var(--nb-spacing-xl);
  font-size: 1.25rem;
}

.hero-buttons {
  display: flex;
  gap: var(--nb-spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

.home-sections {
  padding-bottom: var(--nb-spacing-2xl);
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--nb-spacing-xl);
  margin-bottom: var(--nb-spacing-2xl);
}

.section-item {
  width: 100%;
}

.blog-section {
  margin-top: var(--nb-spacing-2xl);
}

.text-center {
  text-align: center;
}

@media (max-width: 768px) {
  .home-hero {
    padding: var(--nb-spacing-xl) 0;
    margin-bottom: var(--nb-spacing-xl);
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .section-grid {
    grid-template-columns: 1fr;
    gap: var(--nb-spacing-lg);
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
}
</style> 