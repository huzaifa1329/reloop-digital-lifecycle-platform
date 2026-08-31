# ReLoop Frontend

React + Vite frontend connected to the Express/MongoDB backend.

## Setup

1. Copy `.env.example` to `.env` if the API is not running on the default URL.
2. Set `VITE_API_URL=http://localhost:5000/api`.
3. Run `npm install`.
4. Run `npm run dev`.

The frontend now uses the API for authentication, products, marketplace listings, repair requests, notifications, donations, recycling, admin moderation and settings. Product photos are stored as compressed data URLs in MongoDB for this student project, so no separate image-storage service is required.
