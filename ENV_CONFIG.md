# Environment Configuration Guide

## Development (Local)

### Backend (.env)
```env
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL='http://localhost:5000/api'
```

## Production (Vercel)

### Backend (.env or Vercel Environment Variables)
```env
CORS_ORIGIN=https://ecommerce-h3ri.vercel.app
```

### Frontend (.env or Vercel Environment Variables)
```env
VITE_API_URL='https://ecommerce-pearl-eight-92.vercel.app/api'
```

## Quick Switch Commands

### Switch to Development
```bash
# Backend
cd backend
echo "CORS_ORIGIN=http://localhost:5173" >> .env

# Frontend
cd frontend
echo "VITE_API_URL='http://localhost:5000/api'" > .env
```

### Switch to Production
```bash
# Backend
cd backend
echo "CORS_ORIGIN=https://ecommerce-h3ri.vercel.app" >> .env

# Frontend
cd frontend
echo "VITE_API_URL='https://ecommerce-pearl-eight-92.vercel.app/api'" > .env
```

## Current Configuration
✓ Set to DEVELOPMENT mode (localhost)
