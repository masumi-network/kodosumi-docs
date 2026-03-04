# Kodosumi Documentation

Official documentation for [Kodosumi](https://kodosumi.io) - the runtime environment for managing and executing agentic services at scale.

This site is built with Next.js and [Fumadocs](https://fumadocs.dev).

Run development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Explore

In the project, you can see:

- `lib/source.ts`: Code for content source adapter, [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access your content.
- `app/layout.config.tsx`: Shared options for layouts, optional but preferred to keep.

| Route                     | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `app/(home)`              | The route group for documentation pages.               |
| `content/docs/guides/`    | Main documentation guides and tutorials.               |
| `content/docs/cli/`       | CLI (koco) reference documentation.                    |
| `content/docs/api-reference/` | API reference documentation.                       |
| `app/api/search/route.ts` | The Route Handler for search.                          |

### Fumadocs MDX

A `source.config.ts` config file has been included, you can customise different options like frontmatter schema.

Read the [Introduction](https://fumadocs.dev/docs/mdx) for further details.

## Project Structure

- `content/docs/` - Documentation content in MDX format
  - `guides/` - Getting started guides and tutorials
  - `cli/` - CLI reference
  - `api-reference/` - API documentation
- `app/` - Next.js app router pages and layouts
- `components/` - React components
- `public/` - Static assets (images, logos, etc.)

## LLM-Enabled Features

This documentation site is fully LLM-enabled with special endpoints for AI consumption:

### Markdown API

Access any page as markdown by appending `.md` to the URL:
- HTML: `https://docs.kodosumi.io/guides/develop`
- Markdown: `https://docs.kodosumi.io/guides/develop.md`

### Special Endpoints

- `/llms.txt` - Complete documentation in plain text format
- `/md-index` or `/md-index.md` - Index of all available markdown pages
- All endpoints are CORS-enabled and bot-friendly

### How It Works

The middleware intercepts requests ending in `.md` or `.markdown` and rewrites them to the `/mdx/[...slug]` route, which:
1. Fetches the page content from the Fumadocs source
2. Converts MDX/JSX to clean markdown using remark
3. Serves it with proper caching headers

## Deployment

### Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t kodosumi-docs .

# Run the container
docker run -p 3000:3000 kodosumi-docs

# Or use docker-compose
docker-compose up --build
```

### Digital Ocean Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Digital Ocean using:
- App Platform (recommended)
- Droplets with Docker
- Container Registry + Kubernetes

## Build

Build for production:

```bash
npm run build
npm start
```

The build will:
1. Generate MDX files from content
2. Generate OpenAPI documentation from external sources
3. Create optimized static pages
4. Output standalone server for Docker

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.vercel.app) - learn about Fumadocs
