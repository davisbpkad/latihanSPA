// API Base URLs
export const API_BASE_URLS = {
  FAKE_STORE: 'https://fakestoreapi.com',
  PICSUM: 'https://picsum.photos'
}

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URLS.FAKE_STORE}/products`,
  PICSUM_IMAGE: (width, height, id) => `${API_BASE_URLS.PICSUM}/${width}/${height}?random=${id}`,
  PICSUM_INFO: (id) => `${API_BASE_URLS.PICSUM}/id/${id}/info`
}

// Default values
export const DEFAULT_VALUES = {
  PRODUCT_LIMIT: 12,
  GALLERY_IMAGE_COUNT: 12,
  IMAGE_WIDTH: 400,
  IMAGE_HEIGHT: 300
} 