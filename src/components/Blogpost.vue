<template>
  <div class="blog-list">
    <div v-for="(post, idx) in posts" :key="idx" class="nb-card blog-card mb-4">
      <img v-if="post.image" :src="post.image" class="nb-card-img-top blog-img" :alt="post.title" />
      <div class="nb-card-body">
        <h5 class="nb-card-title">{{ post.title }}</h5>
        <div class="nb-card-date mb-2">{{ post.date }}</div>
        <p class="nb-card-text" v-if="!post.showFull">{{ post.summary }}</p>
        <p class="nb-card-text" v-else>{{ post.content }}</p>
        <button class="nb-btn nb-btn-primary" @click="toggle(idx)">
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
      },
      {
        title: '5 Kesalahan Umum Saat Belanja Online',
        date: '2024-04-28',
        summary: 'Hindari kesalahan berikut agar pengalaman belanja online Anda lebih aman dan menyenangkan.',
        content: 'Hindari kesalahan berikut agar pengalaman belanja online Anda lebih aman dan menyenangkan:\n1. Tidak membaca deskripsi produk.\n2. Tidak membandingkan harga.\n3. Mengabaikan review pembeli.\n4. Tidak mengecek reputasi toko.\n5. Mengabaikan kebijakan retur.',
        image: 'https://picsum.photos/id/1021/900/350',
        showFull: false
      },
      {
        title: 'Cara Mendapatkan Cashback Maksimal',
        date: '2024-04-15',
        summary: 'Cashback bisa menghemat belanja Anda. Simak tips mendapatkan cashback maksimal di toko online.',
        content: 'Cashback bisa menghemat belanja Anda. Simak tips mendapatkan cashback maksimal di toko online:\n1. Ikuti promo cashback.\n2. Gunakan metode pembayaran yang mendukung cashback.\n3. Baca syarat dan ketentuan promo.\n4. Belanja di waktu flash sale.',
        image: 'https://picsum.photos/id/1023/900/350',
        showFull: false
      },
      {
        title: 'Keuntungan Belanja di Marketplace Lokal',
        date: '2024-04-01',
        summary: 'Marketplace lokal menawarkan banyak keuntungan. Berikut alasan Anda harus mencoba belanja di marketplace lokal.',
        content: 'Marketplace lokal menawarkan banyak keuntungan. Berikut alasan Anda harus mencoba belanja di marketplace lokal:\n1. Mendukung UMKM lokal.\n2. Pengiriman lebih cepat.\n3. Harga lebih bersaing.\n4. Layanan pelanggan lebih responsif.',
        image: 'https://picsum.photos/id/1024/900/350',
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
.blog-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.blog-card {
  background: #fff59f;
  border: 4px solid #111;
  border-radius: 12px;
  box-shadow: 8px 8px 0 #111;
  color: #111;
  width: 100%;
  /* max-width: 600px; */
  /* margin: 0 auto; */
  margin-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
}
.nb-card-img-top.blog-img {
  max-height: 140px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  border-bottom: 4px solid #111;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 4px 0 #111;
}
.nb-card-body {
  padding: 1.1rem 1rem 1rem 1rem;
}
.nb-card-title {
  font-size: 1.08rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #111;
  margin-bottom: 0.4rem;
}
.nb-card-date {
  color: #333;
  font-size: 0.92rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
}
.nb-card-text {
  font-size: 0.98rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 0.8rem;
  white-space: pre-line;
}
.nb-btn {
  font-weight: 900;
  border: 3px solid #111;
  box-shadow: 2px 2px 0 #111;
  border-radius: 8px;
  background: #fff;
  color: #111;
  padding: 0.4rem 1.1rem;
  font-size: 0.98rem;
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
@media (max-width: 1100px) {
  .blog-list {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 700px) {
  .blog-list {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }
  .nb-card-body {
    padding: 0.8rem;
  }
  .nb-card-title {
    font-size: 0.95rem;
  }
}
</style> 