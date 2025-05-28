// API Configuration
// Base URL untuk API backend
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

// API Endpoints
export const API_ENDPOINTS = {
  // Perfumes endpoints
  PERFUMES: "/api/perfumes",
  PERFUME_BY_ID: (id) => `/api/perfumes/${id}`,
  PERFUMES_BY_PAGE: (page) => `/api/perfumes/page/${page}`,
  PERFUMES_BY_BRAND: (brandName) => `/api/perfumes/brand/${brandName}`,
  PERFUME_BRANDS: "/api/perfumes/brands",

  // Brands endpoints
  BRANDS: "/api/brands",
  BRAND_BY_ID: (id) => `/api/brands/${id}`,
  BRAND_PERFUMES: (id) => `/api/brands/${id}/perfumes`,
};

// Helper function untuk membuat URL lengkap
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Helper function untuk melakukan fetch dengan konfigurasi default
export const apiRequest = async (endpoint, options = {}) => {
  const url = createApiUrl(endpoint);

  const defaultOptions = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Error for ${url}:`, error);
    throw error;
  }
};

// Export base URL untuk kasus khusus
export { API_BASE_URL };

// Development helper - log current configuration
if (import.meta.env.DEV) {
  console.log("API Configuration:", {
    baseUrl: API_BASE_URL,
    environment: import.meta.env.MODE,
  });
}
