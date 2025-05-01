# Next.js Frontend Boilerplate

A modern, feature-rich starting point for Next.js 15+ projects with TypeScript, TailwindCSS, ESLint, and more pre-configured.

## Features

- ⚡ **[Next.js 15.3.1](https://nextjs.org/)** - The React framework with App Router
- 🔥 **[Turbopack](https://turbo.build/)** - Incremental bundler for faster development
- 🎨 **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- 📏 **[ESLint](https://eslint.org/)** - Pluggable JavaScript linter with Next.js configuration
- 💖 **[Prettier](https://prettier.io/)** - Opinionated code formatter
- 🧪 **[Vitest](https://vitest.dev/)** - Next generation testing framework
- 🐶 **[Husky](https://typicode.github.io/husky/)** - Git hooks made easy
- 🚫 **[lint-staged](https://github.com/okonet/lint-staged)** - Run linters on git staged files

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:aruncse45/nextjs-frontend-boilerplate.git
   cd nextjs-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── app/            # App router routes
│   ├── components/     # React components
│   ├── lib/            # Utility functions
│   ├── styles/         # Global styles
│   └── types/          # TypeScript type definitions
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
├── tailwind.config.js  # TailwindCSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Starts the development server with Turbopack
- `npm run build` - Builds the app for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint
- `npm run lint:fix` - Runs ESLint with auto-fix
- `npm run lint:strict` - Runs ESLint with stricter rules
- `npm run prettier` - Formats code with Prettier
- `npm run test` - Runs tests with Vitest

## Coding Standards

This boilerplate comes with ESLint and Prettier configured to ensure consistent code quality:

- ESLint enforces good coding practices
- Prettier ensures consistent code formatting
- Pre-commit hooks run linting and formatting before each commit

## Deployment

This Next.js app can be deployed on any platform that supports Node.js, including:

- [Vercel](https://vercel.com/) (recommended for Next.js)
- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## Customization

You can customize this boilerplate by:

1. Updating `package.json` with your project details
2. Modifying ESLint and Prettier configurations to match your preferences
3. Adding additional dependencies as needed for your project

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)