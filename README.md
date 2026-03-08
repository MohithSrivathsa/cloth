# Cloth Studio Ecommerce

Production-ready ecommerce starter built with Next.js App Router, PostgreSQL, Prisma, Tailwind CSS, Stripe, and Docker.

## Folder structure

```text
/app
  /admin
  /api
  /cart
  /checkout
  /order-success
  /products/[id]
/components
/lib
/prisma
  /migrations
/api
/styles
/docker
/utils
```

## Features

- Product listing + detail pages
- Client-side cart and Stripe checkout
- Stripe webhook order persistence
- Admin login + product CRUD + order dashboard
- Responsive Tailwind UI
- Dockerized Next.js + PostgreSQL

## Build safety check

Before building, the project now runs an automated merge-conflict-marker check to fail fast with a clear error if any `<<<<<<<`, `=======`, or `>>>>>>>` markers are present.

```bash
npm run check:conflicts
```

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment values:

```bash
cp .env.example .env
```

3. Start PostgreSQL and app with Docker (recommended):

```bash
docker compose up --build
```

Or run manually:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

4. Configure Stripe webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## API endpoints

- `GET/POST /api/products`
- `GET/PUT/DELETE /api/products/:id`
- `POST /api/cart`
- `GET /api/orders` (admin)
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `POST /api/stripe/checkout`
- `POST /api/stripe/webhook`

## Security notes

- All secrets are loaded from environment variables.
- Admin endpoints validate cookie-based admin sessions.
- API routes use schema validation with Zod.
- Stripe webhook signatures are verified before writes.
