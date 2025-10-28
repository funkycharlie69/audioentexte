# GitHub Copilot Instructions

This document provides guidance for AI coding agents to effectively contribute to this project.

## Project Overview

This is a Next.js application built with TypeScript and styled with Tailwind CSS. The application is a tool for sales coaching, allowing users to compare sales calls between a "champion" seller and a trainee. It helps the user analyze the calls based on a predefined set of criteria and questions (12 questions) and then provides a detailed synthesis and coaching plan.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) (located in `components/ui`)
- **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/)

## Key Architectural Patterns

- **Component-Based Architecture**: The application is built with React components, with a clear separation of concerns. Reusable UI components are in `components/ui`, while feature-specific components are in `components`.
- **Single-Page Application (SPA)**: The core of the application is the `ExpertSalesCoachApp` component in `app/page.tsx`, which manages the application's state and renders different "steps" (welcome, analysis, synthesis) based on the `appState`.
- **State Management**: The main application state is managed within the `ExpertSalesCoachApp` component using the `useState` hook. The state is passed down to child components as props.
- **Styling Conventions**: Styling is done using Tailwind CSS utility classes. Custom styles are defined in `app/globals.css`.

## Important Files and Directories

- `app/page.tsx`: The main application component, containing the logic for the different steps of the sales coaching tool.
- `components/`: Contains reusable components used throughout the application.
- `components/ui/`: Contains the Shadcn/UI components.
- `lib/utils.ts`: Contains utility functions, including the `cn` function for merging Tailwind CSS classes.

## Development Workflow

- To run the application in development mode, use `pnpm dev`.
- To build the application for production, use `pnpm build`.
- To start the production server, use `pnpm start`.

## Coding Conventions

- Follow the existing coding style and conventions.
- Use TypeScript for all new code.
- Use the `cn` utility function from `lib/utils.ts` to conditionally apply CSS classes.
- When adding new UI components, use Shadcn/UI as a base and customize as needed.
