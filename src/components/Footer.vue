<template>
  <footer class="footer">
    <div class="nb-container">
      <div class="footer-content">
        <p class="footer-text">&copy; 2025 Final Project Apps</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer component
</script>

<style scoped>
.footer {
  background: var(--nb-gray-900);
  border-top: var(--nb-border-lg);
  box-shadow: var(--nb-shadow-lg);
  padding: var(--nb-spacing-lg) 0;
  margin-top: auto;
}

.footer-content {
  text-align: center;
}

.footer-text {
  color: var(--nb-white);
  font-weight: var(--nb-font-weight-medium);
  font-size: 1rem;
  margin: 0;
}
</style>
