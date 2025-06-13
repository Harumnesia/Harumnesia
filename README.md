# Harumnesia Backend API

Backend server untuk aplikasi Harumnesia - Platform Rekomendasi Parfum Lokal Indonesia.


## Tech Stack

## Installation

1. Clone repository:
```bash
git clone <your-repo-url>
cd harumnesia-backend
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env
# Edit .env file with your actual values
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Perfumes
- `GET /api/perfumes` - Get all perfumes
- `GET /api/perfumes/:id` - Get perfume by ID
- `GET /api/perfumes/page/:pageNumber` - Get paginated perfumes
- `GET /api/perfumes/brands` - Get all brands from perfumes
- `GET /api/perfumes/brand/:brandName` - Get perfumes by brand

## Environment Variables

Required environment variables (see `.env.example`):

- `PORT` - Server port (default: 5001)
- `NODE_ENV` - Environment (development/production)
- `MONGO_URI` - MongoDB connection string
- `FRONTEND_URL` - Frontend URL for CORS
- `ML_SERVICE_URL` - ML service endpoint
