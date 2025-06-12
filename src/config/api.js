// API Configuration
// Base URL untuk API backend
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://db.harumnesia.web.id";

// API Endpoints
export const API_ENDPOINTS = {
  // Perfumes endpoints
  PERFUMES: "/api/perfumes",
  PERFUME_BY_ID: (id) => `/api/perfumes/${id}`,
  PERFUMES_BY_PAGE: (page) => `/api/perfumes/page/${page}`,
  PERFUMES_BY_BRAND: (brandName) => `/api/perfumes/brand/${brandName}`,
  PERFUME_BRANDS: "/api/perfumes/brands",
  PERFUME_RECOMMENDATIONS: "/api/perfumes/recommend",

  // Brands endpoints
  BRANDS: "/api/brands",
  BRAND_BY_ID: (id) => `/api/brands/${id}`,
  BRAND_PERFUMES: (id) => `/api/brands/${id}/perfumes`,

  // International perfumes endpoints
  INTER_PERFUMES: "/api/inter/perfumes",
  INTER_BRANDS: "/api/inter/brands",
  INTER_PERFUMES_BY_BRAND: (brand) => `/api/inter/brands/${brand}/perfumes`,
  INTER_SEARCH: "/api/inter/search",
  INTER_DROPDOWN: "/api/inter/dropdown",
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

// International perfume service functions
export const fetchInterPerfumes = async () => {
  return await apiRequest(API_ENDPOINTS.INTER_PERFUMES);
};

export const fetchInterBrands = async () => {
  return await apiRequest(API_ENDPOINTS.INTER_BRANDS);
};

export const fetchInterPerfumesByBrand = async (brand) => {
  return await apiRequest(API_ENDPOINTS.INTER_PERFUMES_BY_BRAND(brand));
};

export const searchInterPerfumes = async (query) => {
  return await apiRequest(
    `${API_ENDPOINTS.INTER_SEARCH}?q=${encodeURIComponent(query)}`
  );
};

export const fetchInterDropdownData = async () => {
  return await apiRequest(API_ENDPOINTS.INTER_DROPDOWN);
};

// Combined service to get both local and international perfumes for dropdown
export const fetchAllPerfumesForDropdown = async () => {
  try {
    const [localPerfumes, interPerfumes] = await Promise.all([
      apiRequest(API_ENDPOINTS.PERFUMES),
      fetchInterDropdownData(),
    ]);

    console.log("Local perfumes response:", localPerfumes);
    console.log("International perfumes response:", interPerfumes);

    // Format local perfumes - fix: localPerfumes is directly an array, not nested in data
    const localFormatted = Array.isArray(localPerfumes)
      ? localPerfumes.map((perfume) => ({
          id: perfume._id,
          name: perfume.name,
          brand: perfume.brand,
          label: `${perfume.brand} - ${perfume.name}`,
          type: "local",
        }))
      : [];

    // Format international perfumes - fix the flat mapping
    const interFormatted =
      interPerfumes.success && interPerfumes.data?.flat
        ? interPerfumes.data.flat.map((perfume) => ({
            id: perfume.id,
            name: perfume.name,
            brand: perfume.brand,
            label: `${perfume.brand} - ${perfume.name}`,
            type: "international",
          }))
        : [];

    console.log("Local formatted:", localFormatted.length);
    console.log("International formatted:", interFormatted.length);

    return {
      success: true,
      data: {
        all: [...localFormatted, ...interFormatted],
        local: localFormatted,
        international: interFormatted,
      },
    };
  } catch (error) {
    console.error("Error fetching combined perfume data:", error);
    return {
      success: false,
      error: error.message,
      data: { all: [], local: [], international: [] },
    };
  }
};

// Combined service to get all brands for dropdown
export const fetchAllBrandsForDropdown = async () => {
  try {
    const [localBrands, interBrands] = await Promise.all([
      apiRequest(API_ENDPOINTS.PERFUME_BRANDS),
      fetchInterBrands(),
    ]);

    console.log("Local brands response:", localBrands);
    console.log("International brands response:", interBrands);

    // Fix: both local and international brands have success/data structure
    const localBrandsList = localBrands.success ? localBrands.data || [] : [];
    const interBrandsList = interBrands.success ? interBrands.data || [] : [];

    console.log("Local brands list:", localBrandsList);
    console.log("International brands list:", interBrandsList);

    // Combine and deduplicate brands
    const allBrands = [
      ...new Set([...localBrandsList, ...interBrandsList]),
    ].sort();

    console.log("Combined brands:", allBrands.length);

    return {
      success: true,
      data: {
        all: allBrands,
        local: localBrandsList,
        international: interBrandsList,
      },
    };
  } catch (error) {
    console.error("Error fetching combined brand data:", error);
    return {
      success: false,
      error: error.message,
      data: { all: [], local: [], international: [] },
    };
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
