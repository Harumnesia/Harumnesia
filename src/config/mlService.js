// ML Service Configuration for Similarity Recommendations
export const ML_SERVICE_CONFIG = {
  // Direct connection to similarity recommendation ML service
  BASE_URL: "https://api.harumnesia.web.id",
  ENDPOINTS: {
    RECOMMEND: "/recommend", // Similarity recommendation endpoint
  },
  TIMEOUT: 15000, // 15 seconds for ML processing
};

// Helper function to call similarity recommendation ML service
export const callMLService = async (perfume) => {
  const url = `${ML_SERVICE_CONFIG.BASE_URL}${ML_SERVICE_CONFIG.ENDPOINTS.RECOMMEND}`;

  console.log(`🔍 Calling Similarity ML Service at: ${url}`);
  console.log(`📦 Payload:`, { perfume });

  // Create timeout controller for better browser compatibility
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    ML_SERVICE_CONFIG.TIMEOUT
  );

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ perfume }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Similarity ML Service Response:`, data);

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`❌ Similarity ML Service Error:`, error);
    throw error;
  }
};
