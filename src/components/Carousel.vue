<template>
  <div class="carousel-outer mb-5">
    <div class="carousel-inner" @mouseenter="pause" @mouseleave="resume">
      <div class="carousel-track">
        <div v-for="(img, idx) in images" :key="idx" :class="['carousel-slide', { active: idx === current }]">
          <img :src="img" class="carousel-img" :alt="'Slide ' + (idx+1)" />
        </div>
      </div>
      <button v-if="images.length" class="carousel-control prev" @click="prevSlide">&#10094;</button>
      <button v-if="images.length" class="carousel-control next" @click="nextSlide">&#10095;</button>
      <div class="carousel-indicators">
        <span v-for="(idx) in images.length" :key="idx-1" :class="{ active: (idx-1) === current }" @click="goTo(idx-1)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
export default {
  name: 'Carousel',
  setup() {
    const images = ref([
      "https://picsum.photos/id/1015/900/350",
      "https://picsum.photos/id/1019/900/350",
      "https://picsum.photos/id/1018/900/350"
    ])
    const current = ref(0)
    let interval = null
    let paused = false
    const imgLoaded = ref([false, false, false])

    function onImgLoad(idx) {
      imgLoaded.value[idx] = true
    }
    function nextSlide() {
      current.value = (current.value + 1) % images.value.length
    }
    function prevSlide() {
      current.value = (current.value - 1 + images.value.length) % images.value.length
    }
    function goTo(idx) {
      current.value = idx
    }
    function startAuto() {
      interval = setInterval(() => {
        if (!paused) nextSlide()
      }, 2000)
    }
    function pause() { paused = true }
    function resume() { paused = false }

    onMounted(() => {
      nextTick(() => {
        // Preload first image
        imgLoaded.value[0] = true
      })
      startAuto()
    })
    onUnmounted(() => {
      if (interval) clearInterval(interval)
    })

    return { images, current, nextSlide, prevSlide, goTo, pause, resume, imgLoaded, onImgLoad }
  }
}
</script>

<style scoped>
.carousel-outer {
  width: 100%;
  max-width: 100%;
  background: #fff200;
  border: 4px solid #111;
  border-radius: 12px;
  box-shadow: 8px 8px 0 #111;
  overflow: hidden;
  
}
.carousel-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 16/6;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 4px solid #111;
  background: #fff;
  min-height: 340px;
}
.carousel-track {
  width: 100%;
  height: 100%;
  position: relative;
}
.carousel-slide {
  width: 100%;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 0.5s, transform 0.5s;
}
.carousel-slide.active {
  display: flex;
}
.carousel-img-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  display: block;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}
.carousel-loader {
  width: 100%;
  height: 100%;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 900;
}
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #fff59f;
  border: 3px solid #111;
  color: #111;
  font-size: 2.5rem;
  font-weight: 900;
  padding: 0 22px;
  border-radius: 8px;
  box-shadow: 4px 4px 0 #111;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  z-index: 2;
}
.carousel-control.prev { left: 24px; }
.carousel-control.next { right: 24px; }
.carousel-control:hover {
  background: #00e676;
  color: #111;
  transform: translateY(-50%) scale(1.08);
  box-shadow: 6px 6px 0 #111;
}
.carousel-indicators {
  position: absolute;
  left: 0; right: 0; bottom: 18px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.carousel-indicators span {
  display: inline-block;
  width: 22px;
  height: 10px;
  background: #fff;
  opacity: 1;
  border: 3px solid #111;
  border-radius: 4px;
  box-shadow: 2px 2px 0 #111;
  cursor: pointer;
  transition: all 0.2s;
}
.carousel-indicators .active {
  background: #00e676;
  border-color: #111;
  width: 36px;
  box-shadow: 4px 4px 0 #111;
}
/* Animasi geser */
.slide-enter-active, .slide-leave-active {
  transition: all 0.5s cubic-bezier(.4,0,.2,1);
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
@media (max-width: 900px) {
  .carousel-outer { max-width: 100%; }
  .carousel-inner { aspect-ratio: 16/8; min-height: 220px; }
}
@media (max-width: 600px) {
  .carousel-inner { aspect-ratio: 16/12; min-height: 180px; }
  .carousel-img { min-height: 180px; }
}
</style> 