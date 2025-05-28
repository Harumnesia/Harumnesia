# API Configuration

This directory contains the API configuration for the Harumnesia frontend application.

## Configuration Overview

The `api.js` file centralizes all API-related configurations, making it easy to manage base URLs and endpoints across different environments.

## Environment Variables

Add the following environment variable to your `.env` file:

```bash
# Frontend API Configuration
VITE_API_BASE_URL=http://localhost:5001
```

For different environments:

- **Development**: `VITE_API_BASE_URL=http://localhost:5001`
- **Production**: `VITE_API_BASE_URL=https://your-production-api.com`
- **Staging**: `VITE_API_BASE_URL=https://your-staging-api.com`

## Usage Examples

### Basic API Request

```javascript
import { apiRequest, API_ENDPOINTS } from "../config/api";

// Fetch all perfumes
const fetchPerfumes = async () => {
  try {
    const data = await apiRequest(API_ENDPOINTS.PERFUMES);
    console.log("Perfumes:", data);
  } catch (error) {
    console.error("Error fetching perfumes:", error);
  }
};
```

### Dynamic Endpoints

```javascript
import { apiRequest, API_ENDPOINTS } from "../config/api";

// Fetch perfume by ID
const fetchPerfumeById = async (id) => {
  try {
    const data = await apiRequest(API_ENDPOINTS.PERFUME_BY_ID(id));
    console.log("Perfume:", data);
  } catch (error) {
    console.error("Error fetching perfume:", error);
  }
};

// Fetch perfumes by brand
const fetchPerfumesByBrand = async (brandName) => {
  try {
    const data = await apiRequest(API_ENDPOINTS.PERFUMES_BY_BRAND(brandName));
    console.log("Brand perfumes:", data);
  } catch (error) {
    console.error("Error fetching brand perfumes:", error);
  }
};
```

### Custom API Requests

```javascript
import { createApiUrl } from "../config/api";

// For custom endpoints not defined in API_ENDPOINTS
const customEndpoint = "/api/custom-endpoint";
const fullUrl = createApiUrl(customEndpoint);

const response = await fetch(fullUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
```

## Available Endpoints

- `PERFUMES`: `/api/perfumes` - Get all perfumes
- `PERFUME_BY_ID(id)`: `/api/perfumes/{id}` - Get perfume by ID
- `PERFUMES_BY_PAGE(page)`: `/api/perfumes/page/{page}` - Get paginated perfumes
- `PERFUMES_BY_BRAND(brandName)`: `/api/perfumes/brand/{brandName}` - Get perfumes by brand
- `PERFUME_BRANDS`: `/api/perfumes/brands` - Get all brands
- `BRANDS`: `/api/brands` - Get all brand objects
- `BRAND_BY_ID(id)`: `/api/brands/{id}` - Get brand by ID
- `BRAND_PERFUMES(id)`: `/api/brands/{id}/perfumes` - Get perfumes for a specific brand

## Benefits

1. **Centralized Configuration**: All API URLs are managed in one place
2. **Environment Flexibility**: Easy to switch between development, staging, and production
3. **Type Safety**: Consistent endpoint definitions
4. **Error Handling**: Built-in error handling in `apiRequest` function
5. **Maintainability**: Easy to update API URLs across the entire application

## Migration from Hardcoded URLs

Before:

```javascript
const response = await fetch("http://localhost:5001/api/perfumes");
```

After:

```javascript
const data = await apiRequest(API_ENDPOINTS.PERFUMES);
```

This change provides better error handling, consistency, and environment flexibility.
