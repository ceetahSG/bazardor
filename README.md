# বাজার দর

A modern Bangla market price tracker built with Next.js, designed to help users monitor daily price movements for food and household products in Bangladesh.

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4.0-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Auth-BetterAuth-111827?style=for-the-badge" alt="Better Auth" />
</div>

## Overview

বাজার দর brings together market pricing data, category browsing, and user authentication in a clean, mobile-friendly dashboard. It shows which products became more expensive or cheaper today, helps users compare categories, and provides deeper product detail views for better shopping decisions.

The app fetches live product data from public Bazar Dor APIs and combines it with a polished frontend experience for rapid market awareness.

## Features

- Live product pricing and market movement data
- Category-wise browsing of products
- Trending products with price increases and decreases
- Product detail pages with category context
- Responsive design for mobile, tablet, and desktop
- Email/password sign-in and sign-up
- Social login with Google and GitHub
- Fast Next.js app-router architecture with server-side data fetching

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- HeroUI component library
- Better Auth for authentication
- MongoDB for user/session storage
- Public Bazar Dor API with fallback endpoints

## Project Structure

```text
bazar-dor/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── category/
│   │   ├── productDetails/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── Components/
│   ├── lib/
│   └── assets/
├── .env
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm or another package manager
- MongoDB instance or MongoDB Atlas cluster
- Google and GitHub OAuth credentials

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env.local` file or update your local environment with the required values:

```env
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
MONOGO_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/bazar-dor

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

> Note: the project currently reads `MONOGO_DB_URL` exactly as shown in the codebase. Keep this value secure and do not commit real credentials.

### 3) Run the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev     # Start the development server
npm run build   # Build the production app
npm run start   # Run the production build
npm run lint    # Run ESLint checks
```

## How It Works

The application fetches market data from external Bazar Dor endpoints using a resilient API helper that retries alternate URLs when one source fails. It then renders:

- a home dashboard with rising and falling products
- category pages for focused product discovery
- detail pages that present more information about a specific product
- user authentication flows using Better Auth and MongoDB-backed sessions

## Authentication

The app supports:

- email + password sign up
- email + password sign in
- social login via Google
- social login via GitHub

This is powered by Better Auth and stored using the MongoDB adapter.

## Deployment

This project is ready to be deployed on platforms like Vercel.

For production deployment:

1. Set all required environment variables in your deployment platform.
2. Build the app using `npm run build`.
3. Run the production server with `npm run start`.

## Contributing

Contributions are welcome. If you'd like to improve the app:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and validation
5. Open a pull request

## License

This project is currently unlicensed unless a license is added by the repository owner.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Better Auth](https://better-auth.com/)
- [MongoDB](https://www.mongodb.com/)
- [HeroUI](https://heroui.com/)
- [Bazar Dor API](https://openapi.programming-hero.com/api/bazardor)

---

Built for smarter market awareness and faster everyday shopping decisions.
