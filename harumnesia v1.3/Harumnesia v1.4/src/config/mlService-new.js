// ML Service Configuration
export const ML_SERVICE_CONFIG = {
  // Use external API service
  BASE_URL: "https://api.harumnesia.web.id",
  ENDPOINTS: {
    RECOMMEND: "/recommend",
  },
  TIMEOUT: 10000, // 10 seconds
};

// Helper function to call ML service
export const callMLService = async (perfume) => {
  const url = `${ML_SERVICE_CONFIG.BASE_URL}${ML_SERVICE_CONFIG.ENDPOINTS.RECOMMEND}`;

  console.log(`🔍 Calling ML Service at: ${url}`);
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
    console.log(`✅ ML Service Response:`, data);

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`❌ ML Service Error:`, error);
    throw error;
  }
};

export default ML_SERVICE_CONFIG;
