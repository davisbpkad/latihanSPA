<template>
  <transition name="toast-fade">
    <div v-if="visible" class="toast" :class="type">
      <i v-if="type==='success'" class="fas fa-check-circle"></i>
      <i v-else-if="type==='error'" class="fas fa-times-circle"></i>
      {{ message }}
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({ message: String, type: String, visible: Boolean })
</script>

<style scoped>
.toast {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 99999;
  min-width: 220px;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 4px 4px 0 #111;
  border: 3px solid #111;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: #fff2e8;
  color: #111;
}
.toast.success {
  background: #d4ffea;
  color: #111;
  border-color: #00e676;
}
.toast.error {
  background: #ffeaea;
  color: #d32f2f;
  border-color: #d32f2f;
}
.toast-fade-enter-active, .toast-fade-leave-active { transition: opacity 0.3s; }
.toast-fade-enter, .toast-fade-leave-to { opacity: 0; }
</style> 