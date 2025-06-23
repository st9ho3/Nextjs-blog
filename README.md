# Next.js Blog Project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and enhanced with features for a modern blogging platform.

## Features

* **Framework:** Built with [Next.js] (App Router) for server-side rendering, static site generation.
* **Authentication:** User authentication (Sign Up, Sign In, Sign Out) is handled using Firebase Authentication. Session management is implemented with HTTP-only cookies.
* **Content Creation:** A rich text editor using [Blocknote](https://www.blocknotejs.org/) is provided for writing articles.
    * Supports various block types including headings, paragraphs, lists (bulleted, numbered, checklist), code blocks, tables, and images.
    * Image uploads are handled via a custom hook (`useFileUpload`) that integrates with Firebase Storage.
* **Content Rendering:** A custom HTML renderer is used to display Blocknote content, ensuring proper styling and structure for articles.
* **API Routes:** Backend functionality is provided through Next.js API routes for:
    * User registration (`/api/register`)
    * User login (`/api/login`)
    * User logout (`/api/logout`)
    * Fetching articles (`/api/articles`)
    * Fetching authors (`/api/authors`)
    * Fetching current user data (`/api/user`)
* **Database:** Firestore is used as the database for storing articles and author information.
* **Styling:** Global styles, component-specific CSS modules, and CSS variables are used for styling.
* **Font Optimization:** Uses `next/font` for optimizing and loading fonts (Inter and Brygada 1918).

* **TypeScript:** The project is written in TypeScript, with type definitions provided in `type.d.ts`.

* ## Current Status and Future Enhancements

This project is currently unfinished. Key areas requiring further development include:

* **Social Icons Functionality:** The social icons across the application currently lack full functionality and need to be integrated with relevant actions (e.g., sharing, liking, commenting).

## Visit Blog here
-> [Λog](https://nextjs-blog-ten-liard-59.vercel.app)



## Project Structure

* `src/app/`: Contains the main application routes and layouts.
    * `(auth)/`: Authentication related pages (login, register) and layout.
    * `(components)/`: Reusable UI components used across the application.
    * `(user)/`: User-specific pages like home, article display, and the write page.
* `src/app/_db/`: Firebase configuration, authentication context, and database service functions.
* `src/app/_lib/`: Utility functions for the application.
* `src/editor/`: Configuration and components related to the Blocknote editor.
* `src/hooks/`: Custom React hooks, like `useFileUpload`.
* `public/`: Static assets like images.
* `middleware.ts`: Handles routing logic based on authentication status.
* `next.config.ts`: Next.js configuration, including image remote patterns.
* `eslint.config.mjs`: ESLint configuration.
* `tsconfig.json`: TypeScript configuration.
* `type.d.ts`: Global TypeScript type definitions for the project.
