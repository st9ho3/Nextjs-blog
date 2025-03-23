import {  doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../_db/Firebase";

/**
 * @description Loads content from the session storage.
 * @function loadFromStorage
 * @returns {object|undefined} The parsed JSON object from session storage, or undefined if the key 'editorContent' is not found.
 */
export const loadFromStorage = () => {
  const storageString = sessionStorage.getItem('editorContent');
  return storageString ? JSON.parse(storageString) : undefined;
};

/**
 * @description Saves content to the session storage as a JSON string.
 * @function saveToStorage
 * @param {object} jsonBlocks - The content to be saved, typically an object representing editor content.
 */
export const saveToStorage = (jsonBlocks: any) => {
  sessionStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
};

/**
 * @description Clears the 'editorContent' item from session storage.
 * @function clearStorage
 */
const clearStorage = () => {
  sessionStorage.removeItem('editorContent');
};

// The updated desanitizeFromFirestore function with types
function desanitizeFromFirestore(data: FirestoreData): FirestoreData {
    // Safety check for content array
    if (!data?.content || !Array.isArray(data.content)) {
      console.error("Invalid document structure:", data);
      return data; // Return original data as fallback
    }
  
    const restoreNestedArrays = (obj: JsonValue): JsonValue => {
      if (Array.isArray(obj)) {
        return obj.map(restoreNestedArrays);
      }
      if (obj && typeof obj === "object") {
        // Convert array-like objects to real arrays
        if (Object.keys(obj).every((key) => !isNaN(Number(key)))) {
          return Object.values(obj).map(restoreNestedArrays);
        }
        // Recursively process object properties
        return Object.fromEntries(
          Object.entries(obj).map(
            ([key, value]: [string, JsonValue]) => [key, restoreNestedArrays(value)]
          )
        );
      }
      return obj;
    };
  
    // Process the content array specifically
    return {
      ...data,
      content: data.content.map((block: Block) => {
        if (block?.type === "table") {
          // Tell TypeScript that this block is a TableBlock.
          const tableBlock = block as TableBlock;
          return {
            ...tableBlock,
            content: {
              ...tableBlock.content,
              rows:
                tableBlock.content?.rows?.map((row: Row) => ({
                  cells: (row.cells || []).map((cell: Cell) =>
                    restoreNestedArrays(cell?.cell || [])
                  ),
                })) || [],
            },
          };
        }
        return block;
      }),
    };
  }

  export const getArticles = async (): Promise<Article[]> => {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const articles: Article[] = [];
  
    // Map through the documents and add them to the articles array
    querySnapshot.forEach((doc) => {
       articles.push(doc.data() as Article)
    });
    console.log(articles)
    return articles;
  };

  /**
   * @description Retrieves a specific article from Firestore by its ID.
   * @async
   * @function getArticle
   * @param {string} id - The ID of the article to retrieve.
   * @returns {Promise<object|null>} A promise that resolves to the article data if found, or null if not found.
   * @throws {Error} Throws an error if the document retrieval fails.
   */
  export const getArticle = async (id: string): Promise<Article> => {
    try {
      const docRef = doc(db, "articles", id);
      const docSnap = await getDoc(docRef);
  
      if (!docSnap.exists()) {
        throw new Error(`No document found with ID: ${id}`);
      }
  
      // Get raw data and desanitize
      const rawData = docSnap.data();
      const desanitizedData = desanitizeFromFirestore(rawData);
  
      // Return the processed data with document ID
      return {
        ...desanitizedData as any
            };
  
    } catch (error) {
      console.error("Error fetching document:", error);
      throw new Error("Failed to retrieve article. Please try again later.");
    }
  };

  /**
   * @description Extracts the main title (h1 heading) from an article's content.
   * @function getTitles
   * @param {object} article - The article object.
   * @param {object[]} article.content - An array of content blocks representing the article's content.
   * @returns {string} The text content of the first h1 heading found in the article, or an empty string if no h1 is found.
   */
  export const getTitles = (article: Article): string => {
    const firstContent = article.content.filter(
      (content) => content.type === 'heading' && content.props.level === 1
    );
    const filteredHeading = firstContent[0];
  
    // Return empty string if no title is found, prevents errors when accessing properties of undefined
    const title = filteredHeading?.content[0]?.text || "";
    return title;
  };
  
  /**
   * @description Extracts the first subtitle (h2 or h3 heading) from an article's content.
   * @function getSubTitles
   * @param {object} article - The article object.
   * @param {object[]} article.content - An array of content blocks representing the article's content.
   * @returns {string} The text content of the first h2 or h3 heading found in the article, or 'No subtitle' if none is found.
   */
  export const getSubTitles = (article: Article): string => {
    const firstContent = article.content.filter(
      (content) =>
        content.type === 'heading' &&
        (content.props.level === 2 || content.props.level === 3)
    );
    const filteredHeading = firstContent?.[0] || 'No subtitle';
  
    return filteredHeading === 'No subtitle'
      ? 'No subtitle'
      : filteredHeading.content[0].text;
  };
  
  /**
   * @description Extracts the URL of the first image from an article's content.
   * @function getImage
   * @param {object} article - The article object.
   * @param {object[]} article.content - An array of content blocks representing the article's content.
   * @returns {string} The URL of the first image found in the article, or 'No image' if none is found.
   */
  export const getImage = (article: Article): string => {
    const firstContent = article.content.filter(
      (content) => content.type === 'image'
    );
    return firstContent.length > 0 ? firstContent[0].props.url : 'No image';
  };

  /**
   * @description Retrieves all authors from Firestore.
   * @async
   * @function getAuthors
   * @returns {Promise<object[]>} A promise that resolves to an array of author data objects.
   * @throws {Error} Throws an error if the document retrieval fails.
   */
  export const getAuthors = async (): Promise<Author[]> => {
    const querySnapshot = await getDocs(collection(db, "authors"));
    const authors: Author[] = [];
  
    // Map through the documents and add them to the authors array
    querySnapshot.forEach((doc) => {
      authors.push(doc.data() as Author);
    });
  
    return authors;
  };

  type Output = [string, number]

  export const trending = async(): Promise<Output[]> => {
    const articles = await getArticles();
    const tags: string[] = []
    articles.forEach((article) => { 
       article.tags.forEach((tag) => {
        tags.push(tag)
       })
    })
    console.log(tags)
    const tagsCount = tags.reduce((accumulator: Record<string, number>, currentValue: string) => {
      accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
      return accumulator;
    }, {}); // Initial value is an empty object
    const sortedTags = Object.entries(tagsCount).sort((a, b) => b[1] - a[1]);
    return sortedTags
  }

  export const sortAuthors = (authors: Author[]) => {
    if (authors?.length) {
      const sortedUsers = authors.sort((a, b) => b.articles.length - a.articles.length);
      const users = sortedUsers.slice(0, 7);
      console.log(users)
      return users
    }
  }