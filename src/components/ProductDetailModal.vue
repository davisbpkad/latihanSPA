<template>
  <div v-if="isVisible" class="modal-overlay" @click="closeModal">
    <div class="nb-modal-content" @click.stop>
      <div class="nb-modal-header">
        <h5 class="nb-modal-title">Detail Produk</h5>
        <button type="button" class="nb-btn nb-btn-secondary nb-btn-close" @click="closeModal">×</button>
      </div>
      <div class="nb-modal-body">
        <div v-if="!product" class="nb-alert nb-alert-danger">Produk tidak ditemukan.</div>
        <div v-else>
          <img :src="product.image" class="nb-img mb-3" :alt="product.name" style="object-fit:contain;max-height:200px;" />
          <h4 class="nb-modal-title">{{ product.name }}</h4>
          <p><strong>Harga:</strong> ${{ product.price }}</p>
          <p><strong>Stok:</strong> {{ product.stockStatus === 'habis' ? 'Stok Habis' : product.stock }}</p>
          <p><strong>Deskripsi:</strong></p>
          <div class="nb-modal-desc">{{ product.description }}</div>
        </div>
      </div>
      <div class="nb-modal-footer">
        <button type="button" class="nb-btn nb-btn-primary" @click="closeModal">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetailModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}
.nb-modal-content {
  background: #fff200;
  border: 4px solid #111;
  border-radius: 12px;
  box-shadow: 8px 8px 0 #111;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  color: #111;
}
.nb-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 3px solid #111;
}
.nb-modal-title {
  font-size: 1.3rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #111;
}
.nb-btn {
  font-weight: 900;
  border: 3px solid #111;
  box-shadow: 2px 2px 0 #111;
  border-radius: 8px;
  background: #fff;
  color: #111;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  transition: all 0.1s;
  cursor: pointer;
}
.nb-btn-primary {
  background: #00e676;
  color: #111;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.nb-btn-secondary {
  background: #ff6b6b;
  color: #fff;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.nb-btn-close {
  font-size: 1.5rem;
  padding: 0.2rem 0.8rem;
  line-height: 1;
}
.nb-modal-body {
  padding: 1rem;
}
.nb-modal-footer {
  padding: 1rem;
  border-top: 3px solid #111;
  text-align: right;
}
.nb-img {
  border: 3px solid #111;
  border-radius: 8px;
  box-shadow: 2px 2px 0 #111;
  background: #fff;
}
.nb-modal-desc {
  background: #fff;
  color: #111;
  font-weight: 600;
  border-radius: 8px;
  border: 3px solid #111;
  box-shadow: 2px 2px 0 #111;
  padding: 0.5rem 1rem;
  white-space: pre-line;
}
.nb-alert {
  background: #ff6b6b;
  color: #fff;
  border: 3px solid #111;
  border-radius: 8px;
  font-weight: 900;
  font-size: 1.1rem;
  box-shadow: 2px 2px 0 #111;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
.nb-alert-danger {
  background: #ff6b6b;
  color: #fff;
}
</style> 