import { ref, computed } from 'vue'

// Admin credentials (dalam real app, ini akan disimpan di backend)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

// Global reactive state
const isAuthenticated = ref(false)
const currentUser = ref(null)
const isLoading = ref(false)
const error = ref('')

// Initialize from localStorage
const initAuth = () => {
  try {
    const storedAuth = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('currentUser')
    
    if (storedAuth) {
      isAuthenticated.value = JSON.parse(storedAuth)
      console.log('Auth state loaded:', isAuthenticated.value)
    }
    
    if (storedUser) {
      currentUser.value = JSON.parse(storedUser)
      console.log('User state loaded:', currentUser.value)
    }
  } catch (err) {
    console.error('Error loading auth state:', err)
    // Clear corrupted data
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
  }
}

// Initialize on module load
initAuth()

export function useAuth() {
  const isAdmin = computed(() => {
    const admin = isAuthenticated.value && currentUser.value?.role === 'admin'
    console.log('isAdmin computed:', admin, 'isAuthenticated:', isAuthenticated.value, 'user:', currentUser.value)
    return admin
  })

  async function login(username, password) {
    isLoading.value = true
    error.value = ''
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isAuthenticated.value = true
        currentUser.value = {
          username: username,
          role: 'admin',
          loginTime: new Date().toISOString()
        }
        
        // Save to localStorage
        localStorage.setItem('isAuthenticated', JSON.stringify(true))
        localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
        
        console.log('Login successful:', { isAuthenticated: isAuthenticated.value, user: currentUser.value })
        
        return { success: true }
      } else {
        error.value = 'Username atau password salah!'
        return { success: false, error: error.value }
      }
    } catch (err) {
      error.value = 'Terjadi kesalahan saat login'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    console.log('Logging out...')
    isAuthenticated.value = false
    currentUser.value = null
    error.value = ''
    
    // Clear from localStorage
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
    
    console.log('Logout completed:', { isAuthenticated: isAuthenticated.value, user: currentUser.value })
  }

  function clearError() {
    error.value = ''
  }

  return {
    isAuthenticated,
    currentUser,
    isAdmin,
    isLoading,
    error,
    login,
    logout,
    clearError
  }
} 