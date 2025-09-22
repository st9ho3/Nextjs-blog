# Λog: A Feature-Rich, Server-Rendered Blogging Platform

Λog is a full-stack blogging platform built with Next.js and Firebase. It provides a seamless and modern writing experience with a rich text editor, secure authentication, and a server-rendered frontend.

-----

### 🚀 Live Demo

  * **Live Site:** [https://nextjs-blog-ten-liard-59.vercel.app](https://nextjs-blog-ten-liard-59.vercel.app)
  * **Repository:** [https://github.com/yourusername/project-name](https://github.com/yourusername/project-name)

-----

### 🎯 About

This project is a comprehensive blogging platform designed to provide a modern and efficient solution for content creators. The primary motivation behind building Λog was to create a full-stack application that leverages the power of Next.js for server-side rendering and static site generation, combined with the real-time capabilities of Firebase for authentication and database management.

The target users for this platform are writers, developers, and content creators who are looking for a simple, yet powerful, tool to publish their work. What makes this project unique is its seamless integration of the **Blocknote** rich text editor, which offers a Notion-like editing experience with support for various block types, including markdown shortcuts and real-time collaboration. The custom HTML renderer ensures that the content is displayed beautifully and consistently across all devices.

-----

### ✨ Features

  * ✅ **Authentication:** Secure user authentication (Sign Up, Sign In, Sign Out) with Firebase Authentication and session management via HTTP-only cookies.
  * ✅ **Rich Text Editor:** A powerful and intuitive rich text editor built with **Blocknote** that supports headings, paragraphs, lists, code blocks, tables, and image uploads.
  * ✅ **Content Rendering:** A custom HTML renderer to display Blocknote content with proper styling and structure.
  * ✅ **API Routes:** A comprehensive set of API routes for managing users, articles, and authentication.
  * ✅ **SSR and SSG:** Built with Next.js App Router for optimal performance with server-side rendering and static site generation.
  * 🔄 **In Progress:** Full implementation of social sharing, liking, and commenting functionalities.
  * 📋 **Planned:** Real-time notifications and a dedicated admin dashboard for content management.

-----

### 🛠️ Tech Stack

**Frontend:**

  * **React 19**
  * **Next.js 15** (App Router)
  * **TypeScript**
  * **CSS Modules**

**Backend:**

  * **Next.js API Routes**
  * **Firebase Authentication**
  * **Firestore** (Database)
  * **Firebase Storage** (File Uploads)

**Tools & Services:**

  * **Git & GitHub**
  * **Vercel** (Deployment)
  * **ESLint**

-----

### 🚀 Installation

**Prerequisites**

  * **Node.js** (v18 or higher)
  * **npm** or **yarn**

**Local Development**

```bash
# Clone the repository
git clone https://github.com/yourusername/project-name.git

# Navigate to project directory
cd project-name

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Firebase configuration

# Start development server
npm run dev
```

**Environment Variables**

To run this project, you will need to add the following environment variables to your `.env.local` file:

`NEXT_PUBLIC_FIREBASE_API_KEY`  
`NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`  
`NEXT_PUBLIC_FIREBASE_PROJECT_ID`  
`NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`  
`NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`  
`NEXT_PUBLIC_FIREBASE_APP_ID`

-----

### 💡 Usage

The application provides a straightforward and intuitive user experience. After registering and signing in, users can start creating new articles using the rich text editor. The editor supports markdown shortcuts for quick formatting. Once an article is published, it will be publicly visible and associated with the author's profile.

-----

### 📚 API Documentation

**Authentication**

  * `POST /api/login`
      * **Description:** Creates a session cookie for the user upon successful login.
      * **Request Body:**
        ```json
        {
          "idToken": "your_firebase_id_token"
        }
        ```
  * `POST /api/register`
      * **Description:** Registers a new user and creates an author profile in Firestore.
      * **Request Body:**
        ```json
        {
          "name": "Your Name",
          "email": "user@example.com",
          "password": "password"
        }
        ```
  * `POST /api/logout`
      * **Description:** Revokes the user's session cookie.

**Endpoints**

  * `GET /api/articles` - Retrieve all articles.
  * `GET /api/authors` - Retrieve all authors.
  * `GET /api/user` - Get the currently authenticated user's data.

-----

### 📸 Screenshots

**Desktop View** 

**Mobile View** *(Add a screenshot of the mobile view here)*

**Writing Editor** *(Add a screenshot of the writing editor here)*

-----

### 🚧 Future Improvements

  * [ ] Add user authentication with OAuth providers (Google, GitHub, etc.).
  * [ ] Implement real-time notifications for comments and likes.
  * [ ] Develop a comprehensive admin dashboard for content moderation and user management.
  * [ ] Add testing with a framework like Jest and React Testing Library.
  * [ ] Implement performance monitoring and analytics to track user engagement.

-----

### 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

-----

### 👤 Contact

**Your Name**

  * **Email:** your.email@example.com
  * **LinkedIn:** [linkedin.com/in/yourprofile](https://www.google.com/search?q=https://linkedin.com/in/yourprofile)
  * **Portfolio:** [yourportfolio.com](https://yourportfolio.com)
  * **GitHub:** [@yourusername](https://github.com/yourusername)

-----

⭐ If you found this project helpful, please give it a star\!
