<template>
  <div class="card h-100">
    <img :src="product.image" class="card-img-top" :alt="product.name" style="object-fit:contain;max-height:180px;" />
    <div class="card-body">
      <template v-if="!isEditing">
        <h6 class="card-title">{{ product.name }}</h6>
        <p class="card-text mb-1"><strong>Harga:</strong> ${{ product.price }}</p>
        <p class="card-text mb-1"><strong>Stok:</strong> {{ product.stockStatus === 'habis' ? 'Stok Habis' : product.stock }}</p>
        <p class="card-text"><strong>Deskripsi:</strong> {{ product.description }}</p>
        <button class="btn btn-sm btn-warning mt-2" @click="startEdit">Edit</button>
      </template>
      <template v-else>
        <h6 class="card-title">{{ product.name }}</h6>
        <div class="mb-2">
          <label class="form-label">Harga</label>
          <input v-model.number="editForm.price" type="number" class="form-control form-control-sm" min="0" />
        </div>
        <div class="mb-2">
          <label class="form-label">Status Stok</label>
          <select v-model="editForm.stockStatus" class="form-select form-select-sm">
            <option value="ada">Stok Ada</option>
            <option value="habis">Stok Habis</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="form-label">Stok</label>
          <input v-model.number="editForm.stock" type="number" class="form-control form-control-sm" :disabled="editForm.stockStatus === 'habis'" :min="editForm.stockStatus === 'habis' ? 0 : 1" :value="editForm.stockStatus === 'habis' ? 0 : editForm.stock" />
        </div>
        <div class="d-flex gap-2 mt-2">
          <button class="btn btn-sm btn-success" @click="saveEdit">Simpan</button>
          <button class="btn btn-sm btn-secondary" @click="cancelEdit">Batal</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'ProductItem',
  props: {
    product: { type: Object, required: true },
    index: { type: Number, required: true }
  },
  emits: ['update'],
  setup(props, { emit }) {
    const isEditing = ref(false)
    const editForm = ref({ price: '', stock: 1, stockStatus: 'ada' })

    function startEdit() {
      isEditing.value = true
      editForm.value = {
        price: props.product.price,
        stock: props.product.stock,
        stockStatus: props.product.stockStatus
      }
    }
    function cancelEdit() {
      isEditing.value = false
    }
    function saveEdit() {
      emit('update', {
        index: props.index,
        price: editForm.value.price,
        stock: editForm.value.stockStatus === 'habis' ? 0 : editForm.value.stock,
        stockStatus: editForm.value.stockStatus
      })
      isEditing.value = false
    }
    // Jika status stok habis, stok otomatis 0
    watch(() => editForm.value.stockStatus, (val) => {
      if (val === 'habis') {
        editForm.value.stock = 0
      } else if (editForm.value.stock === 0) {
        editForm.value.stock = 1
      }
    })
    return { isEditing, editForm, startEdit, cancelEdit, saveEdit }
  }
}
</script>

<style scoped>
.card-title { font-size: 1.1rem; }
</style>