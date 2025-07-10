<template>
  <div class="carousel-outer mb-5">
    <div class="carousel-inner" @mouseenter="pause" @mouseleave="resume">
      <transition name="slide" mode="out-in">
        <div class="carousel-slide active" :key="current">
          <div class="carousel-img-wrapper">
            <img
              v-if="imgLoaded[current]"
              :src="images[current]"
              class="carousel-img"
              :alt="'Slide ' + (current + 1)"
              @load="onImgLoad(current)"
            />
            <div v-else class="carousel-loader">Loading...</div>
          </div>
        </div>
      </transition>
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
      'https://images.unsplash.com/photo-1515168833906-d2a3b82b3029?auto=format&fit=crop&w=1100&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1100&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
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
  max-width: 1100px;
  margin: 0 auto;
  background: #eee;
  border-radius: 18px;
  overflow: hidden;
}
.carousel-inner {
  position: relative;
  width: 100%;
  aspect-ratio: 16/6;
  background: #666;
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: #666;
}
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #666;
  border-radius: 0;
  display: block;
}
.carousel-loader {
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: #666;
}
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.3);
  border: none;
  color: #fff;
  font-size: 2.5rem;
  padding: 0 18px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;
  transition: background 0.2s;
}
.carousel-control.prev { left: 24px; }
.carousel-control.next { right: 24px; }
.carousel-control:hover { background: rgba(0,0,0,0.5); }
.carousel-indicators {
  position: absolute;
  left: 0; right: 0; bottom: 18px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.carousel-indicators span {
  display: inline-block;
  width: 18px;
  height: 6px;
  background: #fff;
  opacity: 0.5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.carousel-indicators .active {
  opacity: 1;
  background: #007bff;
  width: 32px;
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
  .carousel-inner { aspect-ratio: 16/8; }
}
@media (max-width: 600px) {
  .carousel-inner { aspect-ratio: 16/12; min-height: 180px; }
  .carousel-img { min-height: 180px; }
}
</style> 