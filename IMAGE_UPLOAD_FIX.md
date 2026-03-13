# Image Upload Fix Instructions

## Problem
The error "Image upload service is not configured" appears when trying to upload product images.

## Root Cause
1. The frontend was pointing to a Vercel production API instead of local backend
2. The dotenv configuration wasn't loading the .env file from the correct path
3. Cloudinary credentials weren't being properly validated

## Changes Made

### Backend Changes

1. **backend/src/config/env.js**
   - Fixed dotenv to load .env from correct path using `fileURLToPath` and `dirname`
   - Added debug logging to verify Cloudinary environment variables are loaded

2. **backend/src/config/cloudinary.js**
   - Improved configuration validation
   - Added console logging to confirm Cloudinary setup
   - Better error handling for URL parsing

3. **backend/.env**
   - Updated CORS_ORIGIN to allow local frontend: `http://localhost:5173`

### Frontend Changes

1. **frontend/.env**
   - Changed API URL from Vercel to local: `http://localhost:5000/api`

## How to Test

### Step 1: Test Cloudinary Configuration
```bash
cd backend
node test-cloudinary.js
```

You should see:
```
=== Cloudinary Configuration Test ===

Cloudinary Config Check:
- CLOUDINARY_CLOUD_NAME: ✓
- CLOUDINARY_API_KEY: ✓
- CLOUDINARY_API_SECRET: ✓

✓ Cloudinary is properly configured!
Cloud Name: dh5bedngt
API Key: ***5151

=====================================
```

### Step 2: Start Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
Cloudinary Config Check:
- CLOUDINARY_CLOUD_NAME: ✓
- CLOUDINARY_API_KEY: ✓
- CLOUDINARY_API_SECRET: ✓
Cloudinary configured via individual keys
Server running on port 5000
```

### Step 3: Start Frontend
```bash
cd frontend
npm run dev
```

### Step 4: Test Image Upload
1. Navigate to Vendor Dashboard
2. Click "Add Product"
3. Fill in product details
4. Click "Add Images" and select an image
5. Click "Save Product"

The image should now upload successfully to Cloudinary!

## Troubleshooting

### If Cloudinary still shows as not configured:
1. Verify the .env file exists in `backend/.env`
2. Check that environment variables have no extra spaces
3. Restart the backend server completely (Ctrl+C and restart)

### If CORS errors appear:
1. Make sure backend CORS_ORIGIN matches frontend URL
2. Backend: `http://localhost:5173`
3. Frontend: `http://localhost:5000/api`

### If images still don't upload:
1. Check browser console for errors
2. Check backend terminal for error messages
3. Verify Cloudinary credentials are valid by logging into cloudinary.com

## For Production Deployment

When deploying to Vercel:

1. **Backend .env on Vercel:**
   - Set CORS_ORIGIN to your frontend Vercel URL
   - Ensure all Cloudinary variables are set in Vercel environment variables

2. **Frontend .env for production:**
   - Set VITE_API_URL to your backend Vercel URL

## Notes

- The Cloudinary credentials in the .env file are already configured
- Cloud Name: `dh5bedngt`
- Make sure these credentials are valid and the Cloudinary account is active
