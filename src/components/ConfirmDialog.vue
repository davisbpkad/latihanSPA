<template>
  <transition name="fade">
    <div v-if="visible" class="confirm-overlay" @click.self="onCancel">
      <div class="confirm-dialog">
        <div class="confirm-header">
          <span class="confirm-title">
            <i class="fas fa-exclamation-triangle"></i> Konfirmasi Hapus
          </span>
        </div>
        <div class="confirm-body">
          <p>Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.</p>
        </div>
        <div class="confirm-actions">
          <button class="nb-button nb-button-secondary" @click="onCancel">
            <i class="fas fa-times"></i> Batal
          </button>
          <button class="nb-button nb-button-error" @click="onConfirm">
            <i class="fas fa-trash-alt"></i> Hapus
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({ visible: Boolean })
const emit = defineEmits(['confirm', 'cancel'])
function onCancel() { emit('cancel') }
function onConfirm() { emit('confirm') }
</script>

<style scoped>
.confirm-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.2); z-index: 9999;
  display: flex; align-items: center; justify-content: center;
}
.confirm-dialog {
  background: #fff2e8;
  border: 4px solid #111;
  border-radius: 16px;
  box-shadow: 8px 8px 0 #111;
  min-width: 320px;
  max-width: 90vw;
  padding: 2rem 1.5rem;
  display: flex; flex-direction: column; gap: 1.5rem;
  animation: fadeIn 0.2s;
}
@keyframes fadeIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.confirm-header {
  font-size: 1.3rem;
  font-weight: bold;
  color: #d32f2f;
  display: flex; align-items: center; gap: 0.5rem;
}
.confirm-title i {
  color: #d32f2f;
}
.confirm-body {
  color: #111;
  font-size: 1.05rem;
}
.confirm-actions {
  display: flex; gap: 1rem; justify-content: flex-end;
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter, .fade-leave-to { opacity: 0; }
</style> 