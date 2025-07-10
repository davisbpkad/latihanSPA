<template>
<div class="container mt-5 mb-5">
  <!-- Product Input Form -->
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">Tambah Produk</h5>
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">Pilih Produk dari API</label>
            <select v-model="form.selectedApiId" class="form-select" required>
              <option disabled value="">Pilih Produk</option>
              <option v-for="item in apiProducts" :key="item.id" :value="item.id">{{ item.title }}</option>
            </select>
          </div>
          <div class="col-md-2 mb-3">
            <label class="form-label">Harga</label>
            <input v-model.number="form.price" type="number" class="form-control" min="0" required />
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
        <button type="submit" class="btn btn-primary">Tambah Produk</button>
      </form>
    </div>
  </div>

  <!-- Hasil Inputan Produk -->
  <div v-if="inputProducts.length" class="mb-4">
    <h5>Produk yang Ditambahkan</h5>
    <div class="row">
      <div v-for="(prod, idx) in inputProducts" :key="idx" class="col-md-4 mb-3">
        <ProductItem :product="prod" :index="idx" @update="handleUpdate" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue'
import { ref, onMounted, watch, computed } from 'vue'

export default {
    name: 'ProductView',
    components: { ProductItem },
    setup() {
        const apiProducts = ref([])
        const inputProducts = ref([])
        const form = ref({
            selectedApiId: '',
            price: '',
            stock: 1,
            stockStatus: 'ada',
        })

        // Ambil data dari localStorage saat mounted
        onMounted(async () => {
            // Fetch API untuk pilihan produk
            try {
                const res = await fetch("https://fakestoreapi.com/products?limit=12")
                if (!res.ok) throw new Error(`Error: ${res.status}`)
                apiProducts.value = await res.json()
            } catch (err) {}
            // Ambil data inputan dari localStorage
            const saved = localStorage.getItem('inputProducts')
            if (saved) {
                try {
                    inputProducts.value = JSON.parse(saved)
                } catch {}
            }
        })

        // Simpan ke localStorage setiap kali inputProducts berubah
        watch(inputProducts, (val) => {
            localStorage.setItem('inputProducts', JSON.stringify(val))
        }, { deep: true })

        // Watch stockStatus, if habis, set stock to 0
        watch(() => form.value.stockStatus, (val) => {
            if (val === 'habis') {
                form.value.stock = 0
            } else if (form.value.stock === 0) {
                form.value.stock = 1
            }
        })

        // Ambil produk API yang dipilih
        const selectedApiProduct = computed(() => {
            return apiProducts.value.find(item => item.id === form.value.selectedApiId) || null
        })

        function handleSubmit() {
            if (!selectedApiProduct.value) return
            inputProducts.value.push({
                name: selectedApiProduct.value.title,
                price: form.value.price,
                stock: form.value.stock,
                stockStatus: form.value.stockStatus,
                image: selectedApiProduct.value.image,
                description: selectedApiProduct.value.description
            })
            // Reset form
            form.value = {
                selectedApiId: '',
                price: '',
                stock: 1,
                stockStatus: 'ada',
            }
        }

        // Handler update produk inputan
        function handleUpdate({ index, price, stock, stockStatus }) {
            const prod = inputProducts.value[index]
            if (prod) {
                prod.price = price
                prod.stock = stock
                prod.stockStatus = stockStatus
            }
        }

        return { apiProducts, form, inputProducts, handleSubmit, selectedApiProduct, handleUpdate }
    }
}
</script>

<style scoped>
/* Add your styles here if needed */
</style>