

interface Author {
    id: string; // Unique ID for the author
    name: string; // Author's full name
    email: string; // Author's email
    password: string; // Hashed password for security
    profilePicture: string; // URL to profile picture
    bio: string; // Short bio
    articles: string[]; // Array of article IDs written by the author
    categories: string[]; // Categories the author is interested in
    socialLinks: { // Social links object
      twitter: string;
      linkedin: string;
      github: string;
    };
    createdAt: string; // Timestamp when the author profile was created
    updatedAt: string; // Timestamp when the author profile was last updated
  }
  interface Article {
    image: string;
    profile: string;
    name: string;
    id: string;
    title: string;
    subtitle: string;
    date: string;
    claps: number;
    comments: number;
    saves: number;
    tags: string[];
  }
  