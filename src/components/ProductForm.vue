<template>
  <form @submit.prevent="onSubmit" class="nb-card nb-form">
    <div class="row">
      <div class="col-md-4 mb-3">
        <label class="nb-label">Pilih Produk dari API</label>
        <select v-model="form.selectedApiId" class="nb-input nb-select" required :disabled="isEditMode">
          <option disabled value="">Pilih Produk</option>
          <option v-for="item in apiProducts" :key="item.id" :value="item.id">{{ item.title }}</option>
        </select>
      </div>
      <div class="col-md-2 mb-3">
        <label class="nb-label">Harga</label>
        <input v-model.number="form.price" type="number" class="nb-input" min="1" required />
      </div>
      <div class="col-md-2 mb-3">
        <label class="nb-label">Status Stok</label>
        <select v-model="form.stockStatus" class="nb-input nb-select" required>
          <option value="ada">Stok Ada</option>
          <option value="habis">Stok Habis</option>
        </select>
      </div>
      <div class="col-md-2 mb-3">
        <label class="nb-label">Stok</label>
        <input v-model.number="form.stock" type="number" class="nb-input" :disabled="form.stockStatus === 'habis'" :min="form.stockStatus === 'habis' ? 0 : 1" :value="form.stockStatus === 'habis' ? 0 : form.stock" required />
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 mb-3" v-if="selectedApiProduct">
        <img :src="selectedApiProduct.image" class="nb-img border" style="max-height:80px;object-fit:contain;" />
      </div>
      <div class="col-md-10 mb-3" v-if="selectedApiProduct">
        <label class="nb-label">Deskripsi</label>
        <div class="nb-input nb-desc" style="min-height:60px;">{{ selectedApiProduct.description }}</div>
      </div>
    </div>
    <button type="submit" class="nb-btn nb-btn-primary me-2">{{ isEditMode ? 'Update Produk' : 'Tambah Produk' }}</button>
    <button v-if="isEditMode" type="button" class="nb-btn nb-btn-secondary" @click="$emit('cancel')">Batal</button>
  </form>
</template>

<script setup>
import { watch } from 'vue'
const props = defineProps({
  form: Object,
  apiProducts: Array,
  isEditMode: Boolean,
  selectedApiProduct: Object
})
const emit = defineEmits(['submit', 'cancel'])

// Validasi harga minimal 1 (opsional, bisa juga di parent)
watch(() => props.form.price, (val) => {
  if (val < 1) props.form.price = 1
})
function onSubmit() {
  if (props.form.price < 1) return
  emit('submit')
}
</script> 

<style scoped>
.nb-card.nb-form {
  background: #fff200;
  border: 4px solid #111;
  border-radius: 12px;
  box-shadow: 8px 8px 0 #111;
  color: #111;
  padding: 2rem 1.5rem;
  margin-bottom: 2rem;
}
.nb-label {
  font-weight: 900;
  text-transform: uppercase;
  color: #111;
  margin-bottom: 0.5rem;
  display: block;
}
.nb-input {
  border: 3px solid #111;
  border-radius: 8px;
  background: #fff;
  color: #111;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  box-shadow: 2px 2px 0 #111;
  width: 100%;
  margin-bottom: 0.5rem;
  transition: all 0.1s;
}
.nb-input:focus {
  outline: none;
  border-color: #00e676;
  box-shadow: 4px 4px 0 #111;
}
.nb-select {
  appearance: none;
  background: #fff;
}
.nb-img {
  border: 3px solid #111;
  border-radius: 8px;
  box-shadow: 2px 2px 0 #111;
  background: #fff;
}
.nb-desc {
  background: #fff;
  color: #111;
  font-weight: 600;
  border-radius: 8px;
  border: 3px solid #111;
  box-shadow: 2px 2px 0 #111;
  padding: 0.5rem 1rem;
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
.nb-btn-primary:hover {
  background: #fff200;
  color: #111;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #111;
}
.nb-btn-secondary {
  background: #ff6b6b;
  color: #fff;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.nb-btn-secondary:hover {
  background: #fff200;
  color: #111;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #111;
}
@media (max-width: 700px) {
  .nb-card.nb-form {
    padding: 1rem 0.5rem;
  }
}
</style> 