<template>
  <div class="blog-list">
    <div v-for="(post, idx) in posts" :key="idx" class="card mb-4">
      <img v-if="post.image" :src="post.image" class="card-img-top blog-img" :alt="post.title" />
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <div class="text-muted mb-2" style="font-size:0.95em;">{{ post.date }}</div>
        <p class="card-text" v-if="!post.showFull">{{ post.summary }}</p>
        <p class="card-text" v-else>{{ post.content }}</p>
        <button class="btn btn-link p-0" @click="toggle(idx)">
          {{ post.showFull ? 'Tutup' : 'Baca Selengkapnya' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Blogpost',
  setup() {
    const posts = ref([
      {
        title: 'Tips Belanja Online Aman',
        date: '2024-06-01',
        summary: 'Belanja online kini semakin mudah, namun Anda harus tetap waspada. Berikut tips singkat agar transaksi Anda aman.',
        content: 'Belanja online kini semakin mudah, namun Anda harus tetap waspada. Berikut tips singkat agar transaksi Anda aman:\n1. Gunakan situs terpercaya.\n2. Jangan mudah tergiur harga murah.\n3. Selalu cek review dan rating penjual.\n4. Gunakan metode pembayaran aman.',
        image: 'https://picsum.photos/id/1025/900/350',
        showFull: false
      },
      {
        title: 'Cara Memilih Produk Berkualitas',
        date: '2024-05-20',
        summary: 'Produk berkualitas akan membuat Anda puas. Simak cara memilih produk terbaik di toko online.',
        content: 'Produk berkualitas akan membuat Anda puas. Simak cara memilih produk terbaik di toko online:\n1. Perhatikan deskripsi produk.\n2. Pilih penjual dengan reputasi baik.\n3. Bandingkan harga dan fitur antar produk.\n4. Tanyakan langsung ke penjual jika ragu.',
        image: 'https://picsum.photos/id/1022/900/350',
        showFull: false
      },
      {
        title: 'Promo Menarik Bulan Ini!',
        date: '2024-05-10',
        summary: 'Jangan lewatkan promo menarik dan diskon besar-besaran di bulan ini. Cek info lengkapnya di sini.',
        content: 'Jangan lewatkan promo menarik dan diskon besar-besaran di bulan ini. Cek info lengkapnya di sini:\n- Diskon hingga 70%\n- Gratis ongkir\n- Cashback spesial\n- Flash sale setiap hari!',
        image: 'https://picsum.photos/id/1020/900/350',
        showFull: false
      }
    ])
    function toggle(idx) {
      posts.value[idx].showFull = !posts.value[idx].showFull
    }
    return { posts, toggle }
  }
}
</script>

<style scoped>
.blog-img {
  max-height: 220px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}
.card-title {
  font-size: 1.25rem;
}
</style> 