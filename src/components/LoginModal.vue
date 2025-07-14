<template>
  <div v-if="isVisible" class="login-modal-overlay" @click="handleOverlayClick">
    <div class="login-modal" @click.stop>
      <div class="login-header">
        <h2 class="nb-heading nb-heading-3">Admin Login</h2>
        <button class="close-button" @click="$emit('close')" aria-label="Close modal">
          <span>×</span>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="username" class="form-label">Username</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            class="nb-input"
            placeholder="Masukkan username"
            required
            :disabled="isLoading"
          />
        </div>
        
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="nb-input"
            placeholder="Masukkan password"
            required
            :disabled="isLoading"
          />
        </div>
        
        <div v-if="error" class="error-message">
          <span class="error-icon">⚠️</span>
          {{ error }}
        </div>
        
        <div class="form-actions">
          <button
            type="button"
            class="nb-button nb-button-secondary"
            @click="$emit('close')"
            :disabled="isLoading"
          >
            Batal
          </button>
          <button
            type="submit"
            class="nb-button nb-button-primary"
            :disabled="isLoading || !form.username || !form.password"
          >
            <span v-if="isLoading" class="loading-spinner"></span>
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </div>
      </form>
      
      <div class="login-info">
        <p class="nb-text nb-text-small">
          <strong>Demo Credentials:</strong><br>
          Username: <code>admin</code><br>
          Password: <code>admin123</code>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, inject } from 'vue'
import { useAuth } from '../composables/useAuth.js'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'success'])

const { login, isLoading, error, clearError } = useAuth()
const showToast = inject('showToast')

const form = ref({
  username: '',
  password: ''
})

// Clear form and error when modal opens/closes
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    clearError()
    form.value = { username: '', password: '' }
  }
})

async function handleSubmit() {
  const result = await login(form.value.username, form.value.password)
  
  if (result.success) {
    showToast && showToast('Login berhasil!', 'success')
    emit('success')
    emit('close')
  } else if (result.error) {
    showToast && showToast('Login gagal: ' + result.error, 'error')
  }
}

function handleOverlayClick() {
  if (!isLoading.value) {
    emit('close')
  }
}
</script>

<style scoped>
.login-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5000;
  padding: var(--nb-spacing-md);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.login-modal {
  background: var(--nb-white);
  border: var(--nb-border-lg);
  box-shadow: var(--nb-shadow-xl);
  border-radius: var(--nb-radius-lg);
  padding: var(--nb-spacing-xl);
  max-width: 400px;
  width: 100%;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.login-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--nb-spacing-xl);
  padding-bottom: var(--nb-spacing-md);
  border-bottom: var(--nb-border-sm);
}

.close-button {
  background: var(--nb-error);
  color: var(--nb-white);
  border: var(--nb-border-md);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: var(--nb-font-weight-bold);
  transition: var(--nb-transition-fast);
  box-shadow: var(--nb-shadow-sm);
}

.close-button:hover {
  transform: translate(-1px, -1px);
  box-shadow: var(--nb-shadow-md);
}

.close-button:active {
  transform: translate(0, 0);
  box-shadow: var(--nb-shadow-sm);
}

.login-form {
  margin-bottom: var(--nb-spacing-lg);
}

.form-group {
  margin-bottom: var(--nb-spacing-lg);
}

.form-label {
  display: block;
  font-weight: var(--nb-font-weight-semibold);
  margin-bottom: var(--nb-spacing-sm);
  color: var(--nb-black);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.error-message {
  background: var(--nb-error);
  color: var(--nb-white);
  padding: var(--nb-spacing-md);
  border: var(--nb-border-md);
  border-radius: var(--nb-radius-sm);
  margin-bottom: var(--nb-spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--nb-spacing-sm);
  font-weight: var(--nb-font-weight-semibold);
}

.error-icon {
  font-size: 1.2rem;
}

.form-actions {
  display: flex;
  gap: var(--nb-spacing-md);
  justify-content: flex-end;
}

.form-actions .nb-button {
  min-width: 100px;
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: var(--nb-spacing-sm);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.login-info {
  background: var(--nb-gray-100);
  border: var(--nb-border-sm);
  border-radius: var(--nb-radius-sm);
  padding: var(--nb-spacing-md);
  text-align: center;
}

.login-info code {
  background: var(--nb-white);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid var(--nb-gray-300);
  font-family: monospace;
  font-weight: var(--nb-font-weight-bold);
}

@media (max-width: 480px) {
  .login-modal {
    padding: var(--nb-spacing-lg);
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .form-actions .nb-button {
    width: 100%;
  }
}
</style> 