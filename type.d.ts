interface Article {
    id: number,
    title: string,
    content: string
}

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
  