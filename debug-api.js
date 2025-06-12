// Test script for debugging API endpoints
import fetch from "node-fetch";

const API_BASE = "https://db.harumnesia.web.id";

const testEndpoint = async (url, name) => {
  try {
    console.log(`\n🧪 Testing ${name}...`);
    console.log(`URL: ${url}`);

    const response = await fetch(url);
    const data = await response.json();

    console.log(`Status: ${response.status}`);
    console.log(`Success: ${data.success || response.status === 200}`);

    if (data.data) {
      console.log(
        `Data count: ${
          Array.isArray(data.data) ? data.data.length : "Not array"
        }`
      );
      if (Array.isArray(data.data) && data.data.length > 0) {
        console.log(`Sample data:`, data.data[0]);
      }
    } else if (Array.isArray(data)) {
      console.log(`Direct array count: ${data.length}`);
      if (data.length > 0) {
        console.log(`Sample data:`, data[0]);
      }
    }

    return data;
  } catch (error) {
    console.error(`❌ Error testing ${name}:`, error.message);
    return null;
  }
};

const runTests = async () => {
  console.log("🚀 Starting API endpoint tests...");

  // Test local perfumes
  await testEndpoint(`${API_BASE}/api/perfumes`, "Local Perfumes");

  // Test local brands
  await testEndpoint(`${API_BASE}/api/perfumes/brands`, "Local Brands");

  // Test international perfumes
  await testEndpoint(
    `${API_BASE}/api/inter/perfumes`,
    "International Perfumes"
  );

  // Test international brands
  await testEndpoint(`${API_BASE}/api/inter/brands`, "International Brands");

  // Test international dropdown
  await testEndpoint(
    `${API_BASE}/api/inter/dropdown`,
    "International Dropdown"
  );

  console.log("\n✅ All tests completed!");
};

runTests();
