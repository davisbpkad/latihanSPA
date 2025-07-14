<template>
  <transition name="sheet-slide">
    <div v-if="visible" class="sheet-overlay" @click.self="onClose">
      <div class="sheet-panel">
        <button class="sheet-close" @click="onClose" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({ visible: Boolean })
const emit = defineEmits(['close'])
function onClose() { emit('close') }
</script>

<style scoped>
.sheet-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.2); z-index: 9999;
  display: flex; justify-content: flex-end;
}
.sheet-panel {
  background: #fff2e8;
  border-left: 4px solid #111;
  box-shadow: -8px 0 0 #111;
  width: 800px; max-width: 100vw;
  height: 100vh; position: relative;
  padding: 2rem 1.5rem;
  display: flex; flex-direction: column;
  animation: sheet-in 0.3s;
}
@keyframes sheet-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
.sheet-close {
  position: absolute; top: 1rem; right: 1rem;
  background: none; border: none; font-size: 1.5rem; cursor: pointer;
}
.sheet-slide-enter-active, .sheet-slide-leave-active { transition: opacity 0.2s; }
.sheet-slide-enter, .sheet-slide-leave-to { opacity: 0; }
@media (max-width: 700px) {
  .sheet-panel { width: 100vw; padding: 1rem 0.5rem; }
}
</style> 