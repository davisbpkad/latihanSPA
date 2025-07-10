<template>
  <form @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-md-4 mb-3">
        <label class="form-label">Pilih Produk dari API</label>
        <select v-model="form.selectedApiId" class="form-select" required :disabled="isEditMode">
          <option disabled value="">Pilih Produk</option>
          <option v-for="item in apiProducts" :key="item.id" :value="item.id">{{ item.title }}</option>
        </select>
      </div>
      <div class="col-md-2 mb-3">
        <label class="form-label">Harga</label>
        <input v-model.number="form.price" type="number" class="form-control" min="1" required />
      </div>
      <div class="col-md-2 mb-3">
        <label class="form-label">Status Stok</label>
        <select v-model="form.stockStatus" class="form-select" required>
          <option value="ada">Stok Ada</option>
          <option value="habis">Stok Habis</option>
        </select>
      </div>
      <div class="col-md-2 mb-3">
        <label class="form-label">Stok</label>
        <input v-model.number="form.stock" type="number" class="form-control" :disabled="form.stockStatus === 'habis'" :min="form.stockStatus === 'habis' ? 0 : 1" :value="form.stockStatus === 'habis' ? 0 : form.stock" required />
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 mb-3" v-if="selectedApiProduct">
        <img :src="selectedApiProduct.image" class="img-fluid border" style="max-height:80px;object-fit:contain;" />
      </div>
      <div class="col-md-10 mb-3" v-if="selectedApiProduct">
        <label class="form-label">Deskripsi</label>
        <div class="form-control" style="min-height:60px; background:#f8f9fa;">{{ selectedApiProduct.description }}</div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary me-2">{{ isEditMode ? 'Update Produk' : 'Tambah Produk' }}</button>
    <button v-if="isEditMode" type="button" class="btn btn-secondary" @click="$emit('cancel')">Batal</button>
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