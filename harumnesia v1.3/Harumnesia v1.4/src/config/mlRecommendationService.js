// ML Recommendation Service Configuration for Form-based Recommendations
export const ML_RECOMMENDATION_CONFIG = {
  BASE_URL: "https://ml.harumnesia.web.id", // Always use direct ML service
  FALLBACK_URL: "https://ml.harumnesia.web.id", // Use same form-based ML service as fallback
  ENDPOINTS: {
    RECOMMEND: "/recommend",
  },
  TIMEOUT: 15000, // 15 seconds for ML processing
};

// Function to transform form data to ML API format
export const transformFormDataToMLFormat = (formData) => {
  // Convert budget string to price range
  let min_price, max_price;
  switch (formData.budget) {
    case "low":
      min_price = 0;
      max_price = 150000;
      break;
    case "medium":
      min_price = 150000;
      max_price = 300000;
      break;
    case "high":
      min_price = 300000;
      max_price = 1000000;
      break;
    default:
      min_price = 0;
      max_price = 1000000;
  }

  // Convert bottle size to ML
  let size;
  switch (formData.bottleSize) {
    case "travel":
      size = 10; // average of 5-15ml
      break;
    case "small":
      size = 30;
      break;
    case "large":
      size = 75; // average of 50-100ml
      break;
    default:
      size = 50;
  }

  // Convert timeOfUse to situation
  let situation;
  switch (formData.timeOfUse) {
    case "day":
      situation = "Day";
      break;
    case "night":
      situation = "Night";
      break;
    case "versatile":
      situation = "Versatile";
      break;
    default:
      situation = "Versatile";
  }

  // Convert concentration to uppercase
  const concentrate = formData.concentration.toUpperCase();

  // Convert gender to proper case
  const gender = formData.gender;

  return {
    gender,
    situation,
    concentrate,
    size,
    min_price,
    max_price,
    description: formData.aromaDescription || "",
  };
};

// Function to call ML recommendation API
export const getMLRecommendations = async (formData) => {
  const payload = transformFormDataToMLFormat(formData);
  console.log(`📦 Payload:`, payload);

  const urls = [
    `${ML_RECOMMENDATION_CONFIG.BASE_URL}${ML_RECOMMENDATION_CONFIG.ENDPOINTS.RECOMMEND}`,
    `${ML_RECOMMENDATION_CONFIG.FALLBACK_URL}${ML_RECOMMENDATION_CONFIG.ENDPOINTS.RECOMMEND}`,
  ];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`🤖 Trying ML API at: ${url} (attempt ${i + 1})`);

    // Create timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      ML_RECOMMENDATION_CONFIG.TIMEOUT
    );

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `ML API Error ${response.status}: ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log(`✅ ML API Response from ${url}:`, data);

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        console.error(
          `⏰ ML API Timeout at ${url} after ${ML_RECOMMENDATION_CONFIG.TIMEOUT}ms`
        );
      } else {
        console.error(`❌ ML API Error at ${url}:`, error);
      }

      // If this is the last URL, throw the error
      if (i === urls.length - 1) {
        if (error.name === "AbortError") {
          throw new Error("Request timeout - silakan coba lagi");
        }
        throw new Error(`Gagal terhubung ke ML API: ${error.message}`);
      }

      // Otherwise, continue to the next URL
      console.log(`🔄 Trying next endpoint...`);
    }
  }
};

// Function to fetch perfume details from database by ID
export const fetchPerfumeDetails = async (perfumeIds) => {
  try {
    console.log(
      `🔍 Fetching details for ${perfumeIds.length} perfumes:`,
      perfumeIds
    );

    const perfumePromises = perfumeIds.map(async (id) => {
      try {
        const response = await fetch(
          `https://db.harumnesia.web.id/api/perfumes/${id}`
        );
        if (response.ok) {
          const perfume = await response.json();
          return perfume;
        } else {
          console.warn(`⚠️ Perfume not found in database: ${id}`);
          return null;
        }
      } catch (error) {
        console.error(`❌ Error fetching perfume ${id}:`, error);
        return null;
      }
    });

    const perfumes = await Promise.all(perfumePromises);
    const validPerfumes = perfumes.filter((perfume) => perfume !== null);

    console.log(
      `✅ Successfully fetched ${validPerfumes.length} perfumes from database`
    );
    return validPerfumes;
  } catch (error) {
    console.error("❌ Error fetching perfume details:", error);
    throw new Error("Gagal mengambil detail parfum dari database");
  }
};

// Function to combine ML recommendations with database data
export const getEnhancedRecommendations = async (formData) => {
  try {
    // Get ML recommendations
    const mlResponse = await getMLRecommendations(formData);

    if (!mlResponse || !mlResponse.recommendations) {
      throw new Error("Format response ML API tidak valid");
    }

    // Extract perfume IDs from recommendations
    const perfumeIds = mlResponse.recommendations.map((rec) => rec.ID_Perfume);

    // Fetch detailed perfume data from database
    const detailedPerfumes = await fetchPerfumeDetails(perfumeIds);

    // Combine ML data with database data
    const enhancedRecommendations = mlResponse.recommendations.map((mlRec) => {
      const dbPerfume = detailedPerfumes.find(
        (p) =>
          p.perfumeId === mlRec.ID_Perfume ||
          p["ID Perfume"] === mlRec.ID_Perfume
      );

      if (dbPerfume) {
        return {
          ...mlRec,
          // Add any additional fields from database if needed
          dbData: dbPerfume,
          // Use database data as fallback for missing ML fields
          name: mlRec.perfume || dbPerfume.name || dbPerfume.perfume,
          description: dbPerfume.description || "",
          // Combine the data sources
          enhanced: true,
        };
      }

      return {
        ...mlRec,
        name: mlRec.perfume,
        enhanced: false,
      };
    });

    return {
      ...mlResponse,
      recommendations: enhancedRecommendations,
      enhanced: true,
    };
  } catch (error) {
    console.error("❌ Error getting enhanced recommendations:", error);
    throw error;
  }
};
