<template>
  <div class="card h-100">
    <img
      :src="product.image"
      :alt="product.name"
      class="card-img-top mb-3 mt-3"
      style="object-fit: contain; height: 120px;"
    />
    <div class="card-body p-2">
      <h6 class="card-title text-truncate" :title="product.name">{{ formatTitle(product.name) }}</h6>
      <p class="card-text small text-truncate" :title="product.description">{{ product.description }}</p>
      <p class="card-text mb-1"><strong>Harga:</strong> Rp{{ product.price }}</p>
      <p class="card-text mb-1"><strong>Stok:</strong> {{ product.stockStatus === 'habis' ? 'Stok Habis' : product.stock }}</p>
      <div class="d-flex gap-2 mt-2">
        <button class="btn btn-sm btn-warning" @click="$emit('edit', index)">📝</button>
        <button class="btn btn-sm btn-danger" @click="$emit('delete', index)">🗑️</button>
        <button class="btn btn-sm btn-info text-white" @click="$emit('detail', product)">ℹ️</button>
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
