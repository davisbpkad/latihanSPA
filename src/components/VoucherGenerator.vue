<template>
  <div class="voucher-section mb-5">
    <div class="card voucher-card">
      <div class="card-body text-center">
        <h4 class="card-title mb-4">
          <i class="text-primary"></i>
          Random Voucher Generator
        </h4>

         <!-- Success Message -->
         <div v-if="showSuccess" class="alert alert-success mt-3" role="alert">
          <i class="fas fa-check-circle me-2"></i>
          Voucher code copied to clipboard!
        </div>

        <!-- Voucher Display -->
        <div v-if="currentVoucher" class="voucher-display mb-4">
          <div class="voucher-code">
            <span class="voucher-text">{{ currentVoucher.code }}</span>
            <button 
              class="btn btn-sm btn-outline-light ms-2"
              @click="copyToClipboard"
              title="Copy voucher code"
            >
              <i class="fas fa-copy btn-light"></i>
            </button>
          </div>
          <div class="voucher-details mt-2">
            <span class="badge bg-success me-2">{{ currentVoucher.discount }}% OFF</span>
            <span class="text-light fw-bold">{{ currentVoucher.description }}</span>
          </div>
        </div>

        <!-- Generate Button -->
        <div class="voucher-actions">
          <button 
            class="btn btn-primary btn-lg"
            @click="generateVoucher"
            :disabled="isGenerating"
          >
            <i class="fas fa-dice me-2"></i>
            {{ isGenerating ? 'Generating...' : 'Generate Voucher' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// State
const currentVoucher = ref(null)
const isGenerating = ref(false)
const showSuccess = ref(false)

// Voucher templates
const voucherTemplates = [
  { discount: 10, description: 'Get 10% off on all products' },
  { discount: 15, description: 'Special 15% discount for you' },
  { discount: 20, description: 'Amazing 20% off deal' },
  { discount: 25, description: 'Quarter off on your purchase' },
  { discount: 30, description: 'Huge 30% discount' },
  { discount: 50, description: 'Half price special offer' }
]

// Generate random voucher code
function generateVoucherCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Generate new voucher
async function generateVoucher() {
  isGenerating.value = true
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const template = voucherTemplates[Math.floor(Math.random() * voucherTemplates.length)]
  const newVoucher = {
    code: generateVoucherCode(),
    discount: template.discount,
    description: template.description,
    generatedAt: new Date().toISOString()
  }
  
  currentVoucher.value = newVoucher
  isGenerating.value = false
}

// Copy voucher to clipboard
async function copyToClipboard() {
  if (!currentVoucher.value) return
  
  try {
    await navigator.clipboard.writeText(currentVoucher.value.code)
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } catch (err) {
    console.error('Failed to copy voucher:', err)
  }
}

// Initialize with a voucher on mount
onMounted(() => {
  generateVoucher()
})
</script>

<style scoped>
.voucher-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}

.voucher-card .card-body {
  padding: 2rem;
}

.voucher-display {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.voucher-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.voucher-text {
  font-family: 'Courier New', monospace;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 2px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 2px dashed #667eea;
}

.voucher-details {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.voucher-actions {
  margin: 1rem 0;
}

.btn-primary {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  border: none;
  padding: 0.75rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.btn-primary:disabled {
  transform: none;
  box-shadow: none;
}

.alert {
  border: none;
  border-radius: 8px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .voucher-card .card-body {
    padding: 1.5rem;
  }
  
  .voucher-text {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }

  .voucher-details {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style> 