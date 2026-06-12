# dev — Salman Kabir

Personal portfolio site built with [Astro](https://astro.build), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Stack

- **Framework** — Astro (SSR mode)
- **UI** — React, Tailwind CSS v4
- **CMS** — Sanity (blog content)
- **Database** — Cloudflare D1 (contact form)
- **Email** — Resend
- **Hosting** — Cloudflare Pages

## Development

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env` and fill in:

```
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
RESEND_API_KEY=re_...
CONTACT_EMAIL=you@example.com
FROM_EMAIL=contact@yourdomain.com
```

## Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name=intro
```

## Studio

Content is managed via Sanity Studio at https://salmaaaankabir-portfolio.sanity.studio
