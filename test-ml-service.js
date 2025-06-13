// Test script to verify ML service connection
// Run with: node test-ml-service.js

const ML_SERVICE_URL = "https://api.harumnesia.web.id";

async function testMLService() {
  console.log("🧪 Testing ML Service Connection...");
  console.log(`📍 ML Service URL: ${ML_SERVICE_URL}`);

  const testPerfumes = ["glitch", "peace", "luminos"];

  for (const perfume of testPerfumes) {
    console.log(`\n🔍 Testing with perfume: "${perfume}"`);

    try {
      const response = await fetch(`${ML_SERVICE_URL}/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ perfume }),
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("✅ Success! Response:", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("❌ Error:", error.message);

      if (error.name === "AbortError") {
        console.error("   → Request timed out after 5 seconds");
      } else if (error.code === "ECONNREFUSED") {
        console.error(
          "   → Connection refused - ML service might not be running"
        );
      } else if (error.code === "ENOTFOUND") {
        console.error("   → Host not found - check ML service URL");
      }
    }
  }

  console.log("\n🏁 Test completed!");
}

// Check if ML service is accessible
async function checkMLServiceHealth() {
  console.log("\n🏥 Checking ML Service Health...");

  try {
    // Try to reach the base URL
    const response = await fetch(ML_SERVICE_URL, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });

    console.log(`✅ ML Service is reachable (Status: ${response.status})`);
  } catch (error) {
    console.error("❌ ML Service health check failed:", error.message);
  }
}

// Run tests
(async () => {
  await checkMLServiceHealth();
  await testMLService();
})();
