<template>
  <form @submit.prevent="onSubmit" class="nb-form-neo">
    <div class="form-block">
      <label class="nb-label-neo">Pilih Produk dari API</label>
      <select v-model="form.selectedApiId" class="nb-input-neo" required :disabled="isEditMode">
        <option disabled value="">Pilih Produk</option>
        <option v-for="item in apiProducts" :key="item.id" :value="item.id">{{ item.title }}</option>
      </select>
    </div>
    <div class="form-block">
      <label class="nb-label-neo">Harga</label>
      <input v-model.number="form.price" type="number" class="nb-input-neo" min="1" required />
    </div>
    <div class="form-block">
      <label class="nb-label-neo">Status Stok</label>
      <select v-model="form.stockStatus" class="nb-input-neo" required>
        <option value="ada">Stok Ada</option>
        <option value="habis">Stok Habis</option>
      </select>
    </div>
    <div class="form-block">
      <label class="nb-label-neo">Stok</label>
      <input v-model.number="form.stock" type="number" class="nb-input-neo" :disabled="form.stockStatus === 'habis'" :min="form.stockStatus === 'habis' ? 0 : 1" :value="form.stockStatus === 'habis' ? 0 : form.stock" required />
    </div>
    <div class="form-block" v-if="selectedApiProduct">
      <img :src="selectedApiProduct.image" class="nb-img-neo" style="max-height:80px;object-fit:contain;" />
      <div class="nb-desc-neo">{{ selectedApiProduct.description }}</div>
    </div>
    <div class="form-actions-neo">
      <button type="submit" class="nb-btn-neo nb-btn-primary-neo me-2">
        <i :class="isEditMode ? 'fas fa-save' : 'fas fa-plus'"></i>
        {{ isEditMode ? 'Update Produk' : 'Tambah Produk' }}
      </button>
      <button v-if="isEditMode" type="button" class="nb-btn-neo nb-btn-secondary-neo" @click="$emit('cancel')">
        <i class="fas fa-times"></i> Batal
      </button>
    </div>
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
.nb-form-neo {
  background: #fff2e8;
  border: 4px solid #111;
  border-radius: 16px;
  box-shadow: 8px 8px 0 #111;
  color: #111;
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.form-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.nb-label-neo {
  font-weight: 900;
  text-transform: uppercase;
  color: #111;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  letter-spacing: 1px;
}
.nb-input-neo {
  border: 3px solid #111;
  border-radius: 10px;
  background: #fff;
  color: #111;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.75rem 1.2rem;
  box-shadow: 2px 2px 0 #111;
  width: 100%;
  transition: all 0.1s;
}
.nb-input-neo:focus {
  outline: none;
  border-color: #00e676;
  box-shadow: 4px 4px 0 #111;
}
.nb-select {
  appearance: none;
  background: #fff;
}
.nb-img-neo {
  border: 3px solid #111;
  border-radius: 10px;
  box-shadow: 2px 2px 0 #111;
  background: #fff;
  margin-bottom: 0.5rem;
}
.nb-desc-neo {
  background: #fff;
  color: #111;
  font-weight: 600;
  border-radius: 10px;
  border: 3px solid #111;
  box-shadow: 2px 2px 0 #111;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
}
.form-actions-neo {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}
.nb-btn-neo {
  font-weight: 900;
  border: 3px solid #111;
  box-shadow: 2px 2px 0 #111;
  border-radius: 10px;
  background: #fff;
  color: #111;
  padding: 0.7rem 1.5rem;
  font-size: 1.1rem;
  transition: all 0.1s;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.nb-btn-primary-neo {
  background: #00e676;
  color: #111;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.nb-btn-primary-neo:hover {
  background: #fff200;
  color: #111;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #111;
}
.nb-btn-secondary-neo {
  background: #ff6b6b;
  color: #fff;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.nb-btn-secondary-neo:hover {
  background: #fff200;
  color: #111;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #111;
}
@media (max-width: 700px) {
  .nb-form-neo {
    padding: 1rem 0.5rem;
  }
  .form-actions-neo {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 