# `@gel/create` Next.js App

This is a Next.js application bootstrapped with `pnpm create @gel`. It showcases using Gel with the Gel TypeScript query builder and also the Gel Drizzle dialect.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Project Structure

```
.
├── app/
│   └── page.tsx
│   └── ...
├── db/
│   └── mutations.ts
│   └── queries.ts
├── dbschema/
│   └── default.gel
│   └── ...
├── drizzle.config.ts
├── gel.ts
├── gel.toml
├── ...
```

*   **`app/`**: This directory contains the core application logic for your Next.js frontend.
    *   `page.tsx`: The main page that demonstrates querying data from the database.
*   **`db/`**: This directory contains the data access layer modules
    *   `mutations.ts`: This module contains the mutation queries
    *   `queries.ts`: This module contains the data fetching queries
*   **`dbschema/`**: This directory contains your database schema, defined using Gel's schema definition language.
    *   `default.gel`: The main schema file where you define your data models.
*   **`drizzle.config.ts`**: Configuration file for Drizzle Kit, used pulling Gel schema and generating the Drizzle query builder.
*   **`gel.ts`**: This file contains the Gel and Drizzle clients and query builders.
*   **`gel.toml`**: Configuration for the Gel project: what server version is used, and some useful development hooks that run the code gen from Drizzle and Gel when the schema is updated.
