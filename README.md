# 3step-form-app

A responsive product catalog with a three-step form for adding products. The application is built for the [WorkConnect recruitment assignment](docs/Specyfikacja_Zadania.pdf) and follows its [Figma design](https://www.figma.com/design/ik3UeUaEbQ9bdqsB4FSvjY/Zadanie-rekrutacyjne---WorkConnect?node-id=0-1). This showcase branch adds interaction and accessibility improvements while keeping the original three-step flow.

## Features

- A catalog initialized with five example products, displayed five per page in a table or mobile cards.
- A three-step form for product information, pricing, and availability, with validation before moving to the next step.
- Automatic net and gross price calculation when either price or the VAT rate changes.
- Conditional stock quantity and minimum and maximum basket quantity validation.
- Pagination synchronized with the `page` URL parameter.
- New products saved in the browser's `localStorage` and restored when the page is reopened.
- Success toasts after adding, editing, or deleting a product.

## Showcase enhancements

- Polish and English interface text, validation messages, and locale-aware price formatting through `next-intl`. The selected currency stays unchanged when the language changes; no exchange-rate conversion occurs.
- Subtle step transitions and progress-line animation, disabled when the user requests reduced motion.
- Focus moves to the first invalid field after submission and to the new step heading after navigation.
- Edit and delete actions for products added by the user. Deletion requires confirmation. The five example products remain read-only.

## Getting started

Requires Node.js 20.9 or later and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for Polish or [http://localhost:3000/en](http://localhost:3000/en) for English. For a local production run:

```bash
npm run build
npm run start
```

The five initial products are defined in `src/mocks.ts`. Only products added through the form are stored in `localStorage`; clearing the site's browser data removes them. The locale uses the pathname (`/` or `/en`), and pagination uses the `page` query parameter. The application does not use a backend.

## Internationalization

Translations live in `messages/pl.json` and `messages/en.json`. Add a key to both files, then read it with `useTranslations` in a component. Validation messages use the same catalogs through the form hook. `next-intl` provides the request configuration, locale routing, navigation, and number formatting. Supported locales and the default locale are defined in `src/i18n/routing.ts`.

## Project structure

| Path                       | Responsibility                                                |
| -------------------------- | ------------------------------------------------------------- |
| `src/app/[locale]/`        | Locale-aware Next.js page and layout.                         |
| `src/components/products/` | Product screen, table, cards, pagination, dialog, form steps. |
| `src/components/ui/`       | Reusable UI components based on shadcn/ui.                    |
| `src/constants/`           | Select options and VAT rates.                                 |
| `src/hooks/`               | Form and product storage state.                               |
| `src/i18n/`                | Request, routing, and navigation configuration.               |
| `src/schemas/`             | Zod schemas for form values and validation.                   |
| `src/types/`               | Product type and `next-intl` type augmentation.               |
| `src/utils/`               | Price calculations.                                           |
| `messages/`                | Polish and English translation catalogs.                      |
| `src/proxy.ts`             | Locale routing proxy.                                         |
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
| `next-intl`                                  | Locale routing, translations, and number formatting.  |
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
