# Mandi_X Backend

Mandi_X is a comprehensive agricultural marketplace platform connecting farmers directly with buyers.

## Features

- JWT Authentication with role-based access
- MongoDB database with Mongoose ODM
- RESTful API architecture
- Weather integration via OpenWeatherMap
- SMS notifications via Twilio

## Tech Stack

- Node.js + Express.js
- MongoDB (Atlas)
- JWT Authentication
- Zod validation

## Installation

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRE=30d
```

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/crops` - Get all crops
- `POST /api/crops` - Add crop (farmer)
- `GET /api/orders` - Get orders
- `POST /api/orders` - Create order

## License

MIT
