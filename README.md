# 3step-form-app

A responsive product catalog with a three-step form for adding products. The application is built for the [WorkConnect recruitment assignment](docs/Specyfikacja_Zadania.pdf) and follows its [Figma design](https://www.figma.com/design/ik3UeUaEbQ9bdqsB4FSvjY/Zadanie-rekrutacyjne---WorkConnect?node-id=0-1). The interface is in Polish.

## Features

- A catalog initialized with five example products, displayed five per page in a table or mobile cards.
- A three-step form for product information, pricing, and availability, with validation before moving to the next step.
- Automatic net and gross price calculation when either price or the VAT rate changes.
- Conditional stock quantity and minimum and maximum basket quantity validation.
- Pagination synchronized with the `page` URL parameter.
- New products saved in the browser's `localStorage` and restored when the page is reopened.
- A success toast after adding a product.

## Getting started

Requires Node.js 20.9 or later and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For a local production run:

```bash
npm run build
npm run start
```

The five initial products are defined in `src/mocks.ts`. Only products added through the form are stored in `localStorage`; clearing the site's browser data removes them. The application does not use a backend.

## Project structure

| Path                       | Responsibility                                                |
| -------------------------- | ------------------------------------------------------------- |
| `src/app/`                 | Next.js route and root layout.                                |
| `src/components/products/` | Product screen, table, cards, pagination, dialog, form steps. |
| `src/components/ui/`       | Reusable UI components based on shadcn/ui.                    |
| `src/constants/`           | Select options and display labels.                            |
| `src/hooks/`               | Form and product storage state.                               |
| `src/schemas/`             | Zod schemas for form values and validation.                   |
| `src/types/`               | Stored product type.                                          |
| `src/utils/`               | Price calculations and product count formatting.              |
| `src/mocks.ts`             | Initial catalog products.                                     |
| `src/styles/globals.css`   | Tailwind setup and design tokens.                             |

## Dependencies

Runtime packages are listed in `dependencies`; build tools and code quality tools are in `devDependencies`. `package-lock.json` locks the resolved versions used by `npm ci`.

| Runtime package                              | Purpose                                               |
| -------------------------------------------- | ----------------------------------------------------- |
| `next`, `react`, `react-dom`                 | App Router and React rendering.                       |
| `@tanstack/react-form`                       | Form state and field validation.                      |
| `zod`                                        | Product form and stored data validation.              |
| `nuqs`                                       | Synchronization of pagination with the URL.           |
| `radix-ui`, `class-variance-authority`, `cn` | UI primitives, component variants, and class merging. |
| `lucide-react`                               | Interface icons.                                      |
| `sonner`                                     | Success toast.                                        |
| `geist`                                      | Geist Sans font.                                      |

| Development package                                      | Purpose                                         |
| -------------------------------------------------------- | ----------------------------------------------- |
| `typescript`, `@types/*`                                 | Type checking and editor types.                 |
| `eslint`, `eslint-config-next`, `eslint-config-prettier` | Linting and compatibility with Prettier.        |
| `prettier`                                               | Code formatting.                                |
| `tailwindcss`, `@tailwindcss/postcss`, `tw-animate-css`  | Styling and animation utilities.                |
| `shadcn`                                                 | CLI for generating the project's UI components. |

## Scripts

| Command                | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the development server.               |
| `npm run build`        | Build the production application.           |
| `npm run start`        | Serve the production build.                 |
| `npm run check`        | Run lint, typecheck, and formatting checks. |
| `npm run lint`         | Check ESLint rules.                         |
| `npm run lint:fix`     | Fix ESLint findings where possible.         |
| `npm run typecheck`    | Check TypeScript without emitting files.    |
| `npm run format:check` | Check Prettier formatting.                  |
| `npm run format`       | Apply Prettier formatting.                  |
