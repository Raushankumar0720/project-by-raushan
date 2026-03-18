# Mandi_X Frontend

Mandi_X is a comprehensive agricultural marketplace platform connecting farmers directly with buyers.

## Features

- Modern landing page with animations
- Role-based dashboards (Farmer, Buyer, Agent, Transporter, Admin)
- Marketplace with crop listings
- Responsive design with Tailwind CSS
- Zustand state management

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Zustand
- React Router DOM
- Lucide React icons

## Installation

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── store/         # Zustand store
├── lib/           # Utilities
└── i18n/          # Internationalization
```

## License

MIT
