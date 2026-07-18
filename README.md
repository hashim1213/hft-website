# Bytesavy website

A premium Next.js frontend with WordPress running locally as a headless CMS. WordPress manages editorial content through its familiar admin, while Next.js renders the customer-facing experience.

## Local development

### 1. Start WordPress

Docker Desktop must be running.

```bash
docker compose up -d
```

Open [http://localhost:8080](http://localhost:8080), complete the WordPress installer, and create posts under **Posts**. The frontend reads published posts from the WordPress REST API. When WordPress is unavailable, the homepage uses built-in fallback insights.

### 2. Configure the frontend

The default API URL already points to local WordPress. To customize it, add this to `.env.local`:

```bash
WORDPRESS_API_URL=http://localhost:8080/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

See `.env.example` for the existing contact and authentication variables.

### 3. Start Next.js

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

Set `WORDPRESS_API_URL` to the production WordPress REST base URL and `NEXT_PUBLIC_SITE_URL` to the public website URL, then run:

```bash
npm run build
npm start
```

WordPress responses are cached for 60 seconds in `lib/wordpress.ts`.
