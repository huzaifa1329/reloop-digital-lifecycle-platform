# ReLoop Backend

Express + MongoDB API for the ReLoop lifecycle platform.

## Setup

1. Copy `.env.example` to `.env`.
2. Add your MongoDB Atlas connection string as `MONGO_URI`.
3. Add a long `JWT_SECRET`.
4. Set `CLIENT_URL=http://localhost:5173`.
5. For real verification/reset/contact emails, configure the SMTP variables. Gmail requires an App Password.
6. Run `npm install` and `npm run dev`.

The server seeds three demo accounts if they do not already exist:

- Customer: `ahmed@reloop.dev` / `password123`
- Repair Partner: `usman@reloop.dev` / `password123`
- Admin: `admin@reloop.dev` / `password123`

The demo accounts are already email-verified. New registrations require email verification before login.

## Main API areas

- `/api/auth` — registration, login, email verification, password reset, current session
- `/api/products` — product passport CRUD
- `/api/listings` — marketplace CRUD and admin moderation
- `/api/repairs` — customer repair requests and provider status updates
- `/api/notifications` — notification feed/read state
- `/api/donations` and `/api/recycling` — lifecycle requests
- `/api/admin` — users, providers, dashboard metrics, analytics, settings, moderation
- `/api/messages` — contact seller workflow
