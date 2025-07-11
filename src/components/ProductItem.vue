<template>
  <div class="nb-card product-card h-100">
    <img
      :src="product.image"
      :alt="product.name"
      class="nb-card-img-top mb-3 mt-3"
      style="object-fit: contain; height: 120px; border: 3px solid #111; border-radius: 8px; box-shadow: 2px 2px 0 #111; background: #fff;"
    />
    <div class="nb-card-body p-2">
      <h6 class="nb-card-title text-truncate" :title="product.name">{{ formatTitle(product.name) }}</h6>
      <p class="nb-card-text small text-truncate" :title="product.description">{{ product.description }}</p>
      <p class="nb-card-text mb-1"><strong>Harga:</strong> Rp{{ product.price }}</p>
      <p class="nb-card-text mb-1">
        <strong>Stok:</strong>
        <span :class="{'text-danger': product.stockStatus === 'habis'}">
          {{ product.stockStatus === 'habis' ? 'Stok Habis' : product.stock }}
        </span>
      </p>
      <div class="d-flex gap-2 mt-2">
        <button class="nb-btn nb-btn-warning" @click="$emit('edit', index)">
          <i class="fas fa-edit"></i>
        </button>
        <button class="nb-btn nb-btn-danger" @click="$emit('delete', index)">
          <i class="fas fa-trash-alt"></i>
        </button>
        <button class="nb-btn nb-btn-info text-white" @click="$emit('detail', product)">
          <i class="fas fa-info-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ProductItem',
    props: {
        product: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
      formatTitle(title) {
        return title ? title.charAt(0).toUpperCase() + title.slice(1) : ''
      }
    }
}
</script>

<style scoped>
.nb-card.product-card {
  background: #fff200;
  border: 4px solid #111;
  border-radius: 12px;
  box-shadow: 8px 8px 0 #111;
  color: #111;
  max-width: 100%;
}
.nb-card-body {
  padding: 1.2rem 1rem 1rem 1rem;
}
.nb-card-title {
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #111;
  margin-bottom: 0.3rem;
}
.nb-card-text {
  font-size: 0.98rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 0.5rem;
}
.nb-btn {
  font-weight: 900;
  border: 3px solid #111;
  box-shadow: 2px 2px 0 #111;
  border-radius: 8px;
  background: #fff;
  color: #111;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  transition: all 0.1s;
  cursor: pointer;
}
.nb-btn-warning {
  background: #ffe600;
  color: #111;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.nb-btn-danger {
  background: #ff6b6b;
  color: #fff;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.nb-btn-info {
  background: #7cb6f8;
  color: #111;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.nb-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #111;
}
@media (max-width: 700px) {
  .nb-card-body {
    padding: 0.7rem 0.5rem 0.5rem 0.5rem;
  }
  .nb-card-title {
    font-size: 0.95rem;
  }
}
</style>
