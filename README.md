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

## Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.vercel.app) - learn about Fumadocs
