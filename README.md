# Harumnesia Backend API

Backend server untuk aplikasi Harumnesia - Platform Rekomendasi Parfum Lokal Indonesia.

## Features

- REST API untuk manajemen parfum lokal
- Integrasi dengan MongoDB Atlas
- Support untuk rekomendasi parfum berbasis ML
- CORS configuration untuk frontend integration
- File upload untuk gambar parfum
- Brand management system

## Tech Stack

- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Environment**: dotenv
- **Process Manager**: PM2

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

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get brand by ID
- `POST /api/brands` - Create new brand
- `PUT /api/brands/:id` - Update brand
- `DELETE /api/brands/:id` - Delete brand
- `GET /api/brands/:id/perfumes` - Get perfumes by brand ID

## Environment Variables

Required environment variables (see `.env.example`):

- `PORT` - Server port (default: 5001)
- `NODE_ENV` - Environment (development/production)
- `MONGO_URI` - MongoDB connection string
- `FRONTEND_URL` - Frontend URL for CORS
- `JWT_SECRET` - JWT secret for authentication
- `ML_SERVICE_URL` - ML service endpoint

## Deployment

### Using PM2

1. Install PM2 globally:
```bash
npm install -g pm2
```

2. Start with PM2:
```bash
npm run pm2:start
```

3. Other PM2 commands:
```bash
npm run pm2:stop      # Stop the application
npm run pm2:restart   # Restart the application
npm run pm2:logs      # View logs
npm run pm2:delete    # Delete from PM2
```

### Manual Deployment

1. Set NODE_ENV to production:
```bash
export NODE_ENV=production
```

2. Start the server:
```bash
npm start
```

## Database Seeding

To populate the database with initial data:

```bash
npm run seed
```

## Testing

Test international perfume API:
```bash
npm run test-inter
```

Test ML service connection:
```bash
npm run test-ml
```

## Project Structure

```
server/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── allPerfumeController.js
│   ├── brandController.js
│   └── interPerfumeController.js
├── models/
│   ├── AllPerfume.js
│   ├── Brand.js
│   └── InterPerfume.js
├── routes/
│   ├── allPerfumeRoutes.js
│   ├── brandRoutes.js
│   └── interPerfumeRoutes.js
├── uploads/               # File uploads directory
├── logs/                  # PM2 logs directory
├── .env                   # Environment variables
├── .env.example          # Environment template
├── ecosystem.config.js   # PM2 configuration
├── package.json
├── seeder.js            # Database seeder
├── server.js            # Main server file
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
