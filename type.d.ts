

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

  // Defining interfaces for the object structure

interface ArticleAuthor {
  id: string;
  img: string;
  name: string;
}

interface Metadata {
  [key: string]: any; // Key-value pairs for metadata
}

interface Article {
  author: ArticleAuthor;
  comments: any[]; // Adjust type to match the specific comment structure
  content: any[];
  id: string;
  likes: number;
  metadata: Metadata;
  date: string;
  time: string;
  updatetime: string;
  saves: number;
  shares: number;
  tags: string[];
}

type FirestoreData = {
  content?: Block[]; // assuming Block [] is expected for content
  // add any additional properties that you expect
} & { [key: string]: JsonValue | undefined };

interface Block {
  type: string;
  content?: any;
  [key: string]: any;
}

interface TableBlock extends Block {
  type: 'table';
  content: TableBlockContent;
}

interface TableBlockContent {
  rows: Row[];
  [key: string]: any;
}

interface Row {
  cells: Cell[];
  [key: string]: any;
}

interface Cell {
  cell: any[]; // Change this type to something more specific if you know the structure
  [key: string]: any;
}

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

  type JsonContent =
  | { [key: string]: JsonContent }

  type BlockNoteViewProps = {
    editor: BlockNoteEditor;
    editable?: boolean;
    onSelectionChange?: () => void;
    onChange?: () => void;
    theme?:
      | "light"
      | "dark"
      | Theme
      | {
          light: Theme;
          dark: Theme;
        };
    formattingToolbar?: boolean;
    linkToolbar?: boolean;
    sideMenu?: boolean;
    slashMenu?: boolean;
    emojiPicker?: boolean;
    filePanel?: boolean;
    tableHandles?: boolean;
    comments?: boolean;
    children?:
   & HTMLAttributes<HTMLDivElement>};

  