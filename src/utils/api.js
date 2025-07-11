import { API_ENDPOINTS, DEFAULT_VALUES } from '../constants/api.js'

/**
 * Generic fetch function with error handling
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - Response data or error
 */
export async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return { data: await response.json(), error: null }
  } catch (error) {
    console.error('Fetch error:', error)
    return { data: null, error: error.message }
  }
}

/**
 * Fetch products from Fake Store API
 * @param {number} limit - Number of products to fetch
 * @returns {Promise<Array>} - Array of products
 */
export async function fetchProducts(limit = DEFAULT_VALUES.PRODUCT_LIMIT) {
  const url = `${API_ENDPOINTS.PRODUCTS}?limit=${limit}`
  const { data, error } = await fetchWithErrorHandling(url)
  
  if (error) {
    throw new Error(`Failed to fetch products: ${error}`)
  }
  
  return data
}

/**
 * Fetch image info from Picsum API
 * @param {number} id - Image ID
 * @returns {Promise<Object>} - Image information
 */
export async function fetchImageInfo(id) {
  const url = API_ENDPOINTS.PICSUM_INFO(id)
  const { data, error } = await fetchWithErrorHandling(url)
  
  if (error) {
    return null // Return null for fallback
  }
  
  return data
}

/**
 * Generate Picsum image data
 * @param {number} id - Image ID
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {Promise<Object>} - Image data object
 */
export async function generateImageData(id, width = DEFAULT_VALUES.IMAGE_WIDTH, height = DEFAULT_VALUES.IMAGE_HEIGHT) {
  const imageUrl = API_ENDPOINTS.PICSUM_IMAGE(width, height, id)
  const imageInfo = await fetchImageInfo(id)
  
  return {
    id,
    image: imageUrl,
    title: `Photo ${id}`,
    description: imageInfo 
      ? `Beautiful photo by ${imageInfo.author}`
      : 'Beautiful random photo',
    author: imageInfo?.author || 'Unknown',
    url: imageInfo?.url || imageUrl,
    width: imageInfo?.width || width,
    height: imageInfo?.height || height
  }
} 