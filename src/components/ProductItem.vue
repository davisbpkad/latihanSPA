<template>
  <div class="product-item">
    <div class="product-image">
      <img
        :src="product.image"
        :alt="product.name"
        class="product-img"
      />
    </div>
    <div class="product-content">
      <h3 class="product-title" :title="product.name">{{ formatTitle(product.name) }}</h3>
      <p class="product-description text-truncate" :title="product.description">{{ product.description }}</p>
      <div class="product-details">
        <p class="product-price"><strong>Price: </strong> Rp{{ product.price }}</p>
        <p class="product-stock">
          <strong>Stock: </strong>
          <span :class="{'stock-empty': product.stockStatus === 'habis'}">
            {{ product.stockStatus === 'habis' ? 'Out of Stock' : product.stock }}
          </span>
        </p>
      </div>
      <div class="product-actions">
        <button v-if="isAdmin" class="nb-button nb-button-warning" @click="$emit('edit', index)">
          <i class="fas fa-edit"></i>
        </button>
        <button v-if="isAdmin" class="nb-button nb-button-error" @click="$emit('delete', index)">
            <i class="fas fa-trash-alt"></i>
        </button>
        <button class="nb-button nb-button-accent" @click="$emit('detail', product)">
          <i class="fas fa-info-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth.js'

const { isAdmin } = useAuth()

defineProps({
  product: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

function formatTitle(title) {
  return title ? title.charAt(0).toUpperCase() + title.slice(1) : ''
}
</script>

<style scoped>
.product-item {
  background: var(--nb-white);
  border: var(--nb-border-md);
  border-radius: var(--nb-radius-md);
  box-shadow: var(--nb-shadow-md);
  overflow: hidden;
  transition: var(--nb-transition-normal);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-item:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--nb-shadow-lg);
}

.product-image {
  padding: var(--nb-spacing-md);
  background: var(--nb-gray-50);
  border-bottom: var(--nb-border-sm);
}

.product-img {
  width: 100%;
  height: 120px;
  object-fit: contain;
  border: var(--nb-border-sm);
  border-radius: var(--nb-radius-sm);
  box-shadow: var(--nb-shadow-sm);
  background: var(--nb-white);
}

.product-content {
  padding: var(--nb-spacing-lg);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.1rem;
  font-weight: var(--nb-font-weight-bold);
  text-transform: uppercase;
  color: var(--nb-black);
  margin-bottom: var(--nb-spacing-sm);
  line-height: 1.2;
}

.product-description {
  font-size: 0.9rem;
  font-weight: var(--nb-font-weight-medium);
  color: var(--nb-gray-700);
  margin-bottom: var(--nb-spacing-md);
  line-height: 1.4;
  flex: 1;
  
}

.product-details {
  margin-bottom: var(--nb-spacing-lg);
}

.product-price,
.product-stock {
  font-size: 0.95rem;
  font-weight: var(--nb-font-weight-semibold);
  color: var(--nb-black);
  margin-bottom: var(--nb-spacing-xs);
}

.stock-empty {
  color: var(--nb-error);
  font-weight: var(--nb-font-weight-bold);
}

.product-actions {
  display: flex;
  gap: var(--nb-spacing-sm);
  flex-wrap: wrap;
}

.nb-button {
  flex: 1;
  min-width: 80px;
  font-size: 0.9rem;
  padding: 10px var(--nb-spacing-sm);
}

.nb-button-warning {
  background: var(--nb-warning);
  color: var(--nb-black);
}

.nb-button-error {
  background: var(--nb-error);
  color: var(--nb-white);
}

.nb-button-accent {
  background: var(--nb-accent);
  color: var(--nb-white);
}

@media (max-width: 768px) {
  .product-content {
    padding: var(--nb-spacing-md);
  }
  
  .product-title {
    font-size: 1rem;
  }
  
  .product-actions {
    flex-direction: row;
  }
  
  .nb-button {
    width: 100%;
  }
}
</style>
