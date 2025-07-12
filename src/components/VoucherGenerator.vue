<template>
  <div class="voucher-section mb-5">
    <div class="nb-card voucher-card">
      <div class="nb-card-body text-center">
        <h4 class="nb-card-title mb-4">
          <i class="text-primary"></i>
          Random Voucher Generator
        </h4>

         <!-- Success Message -->
         <div v-if="showSuccess" class="nb-alert nb-alert-success mt-3" role="alert">
          <i class="fas fa-check-circle me-2"></i>
          Voucher code copied to clipboard!
        </div>

        <!-- Voucher Display -->
        <div v-if="currentVoucher" class="voucher-display mb-4">
          <div class="voucher-code">
            <span class="voucher-text">{{ currentVoucher.code }}</span>
            <button 
              class="nb-btn nb-btn-copy ms-2"
              @click="copyToClipboard"
              title="Copy voucher code"
            >
              <i class="fas fa-copy"></i>
            </button>
          </div>
          <div class="voucher-details mt-2">
            <span class="nb-badge nb-badge-success me-2">{{ currentVoucher.discount }}% OFF</span>
            <span class="nb-desc fw-bold">{{ currentVoucher.description }}</span>
          </div>
        </div>

        <!-- Generate Button -->
        <div class="voucher-actions">
          <button 
            class="nb-btn nb-btn-primary btn-lg"
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
  background: #fff;
  border: 4px solid #111;
  box-shadow: 8px 8px 0 #111;
  border-radius: 12px;
  color: #111;
  /* margin: 0 auto; */
  width: 100%;
  max-width: 100%;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nb-card-body {
  padding: 1.1rem 1rem 1rem 1rem;
}

.nb-card-title {
  font-size: 1.25rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #111;
  margin-bottom: 1.1rem;
}

.voucher-display {
  background: #fff59f;
  border: 3px solid #111;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 4px 4px 0 #111;
  margin-bottom: 1rem;
}

.voucher-code {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.voucher-text {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 900;
  letter-spacing: 1px;
  background: #fff;
  color: #111;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  border: 3px dashed #111;
  box-shadow: 2px 2px 0 #111;
}

.nb-btn {
  font-weight: 900;
  border: 3px solid #111;
  box-shadow: 2px 2px 0 #111;
  border-radius: 8px;
  background: #fff;
  color: #111;
  padding: 0.4rem 1rem;
  font-size: 0.98rem;
  transition: all 0.1s;
  cursor: pointer;
}

.nb-btn-primary {
  background: #ff6b6b;
  color: #fff;
  border: 3px solid #111;
  box-shadow: 4px 4px 0 #111;
}

.nb-btn-primary:disabled {
  background: #ccc;
  color: #888;
  box-shadow: none;
  cursor: not-allowed;
}

.nb-btn-copy {
  background: #a5b4fb;
  color: #111;
  border: 3px solid #111;
  box-shadow: 2px 2px 0 #111;
  padding: 0.3rem 0.7rem;
  font-size: 1rem;
}

.nb-btn:hover, .nb-btn-primary:hover, .nb-btn-copy:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #111;
}

.nb-badge {
  display: inline-block;
  font-weight: 900;
  font-size: 0.98rem;
  padding: 0.3rem 0.8rem;
  border: 3px solid #111;
  border-radius: 6px;
  background: #fff;
  color: #111;
  box-shadow: 2px 2px 0 #111;
}

.nb-badge-success {
  background: #00e676;
  color: #111;
}

.nb-alert {
  background: #ffe600;
  color: #111;
  border: 3px solid #111;
  border-radius: 8px;
  font-weight: 900;
  font-size: 1rem;
  box-shadow: 2px 2px 0 #111;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.7rem;
  margin-bottom: 1rem;
}

.nb-alert-success {
  background: #00e676;
  color: #111;
}

.nb-desc {
  font-size: 1rem;
  font-weight: 700;
  color: #111;
}

.voucher-details {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.voucher-actions {
  margin: 1.1rem 0 0 0;
}

@media (max-width: 768px) {
  .nb-card-body {
    padding: 0.7rem 0.5rem 0.5rem 0.5rem;
  }
  .voucher-text {
    font-size: 0.95rem;
    letter-spacing: 0.5px;
    padding: 0.3rem 0.6rem;
  }
  .voucher-details {
    flex-direction: column;
    gap: 0.18rem;
  }
  .voucher-card {
    max-width: 98vw;
    min-height: unset;
  }
  .nb-card-title {
    font-size: 1rem;
    margin-bottom: 0.7rem;
  }
  .voucher-display {
    padding: 0.6rem;
  }
}
</style> 