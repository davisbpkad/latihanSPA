<template>
  <div class="home-root">
    <div class="home-section-inner">
      <div class="home-carousel">
        <Carousel />
      </div>
    </div>
    <div class="home-section-inner">
      <div class="home-voucher">
        <VoucherGenerator />
      </div>
    </div>
    <div class="home-blog-grid">
      <Blogpost />
    </div>
  </div>
</template>

<script setup>
import Carousel from '../components/Carousel.vue'
import Blogpost from '../components/Blogpost.vue'
import VoucherGenerator from '../components/VoucherGenerator.vue'
</script>

<style scoped>
.home-root {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem 1.5rem;
  width: 100%;
  box-sizing: border-box;
}
.home-section-inner {
  width: 100%;
  box-sizing: border-box;
  padding-left: 1rem;
  padding-right: 1rem;
}
.home-carousel {
  width: 100%;
  margin-bottom: 2rem;
}
.home-voucher {
  margin-bottom: 2.5rem;
  width: 100%;
}
.home-blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  width: 100%;
  box-sizing: border-box;
}
.home-blog-grid > * {
  grid-column: span 1;
}
@media (max-width: 1100px) {
  .home-root {
    max-width: 98vw;
    padding: 1.2rem 0.5rem 2rem 0.5rem;
  }
  .home-section-inner {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .home-blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 700px) {
  .home-root {
    padding: 0.7rem 0.1rem 1.2rem 0.1rem;
  }
  .home-section-inner {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
  }
  .home-blog-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  .home-carousel {
    margin-bottom: 1.2rem;
  }
  .home-voucher {
    margin-bottom: 1.5rem;
  }
}
</style> 