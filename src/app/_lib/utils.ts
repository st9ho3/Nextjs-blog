import { Block, PartialBlock } from "@blocknote/core";
import {  doc, getDoc, getDocs, collection, setDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../_db/Firebase";
import { nanoid } from "nanoid";


/**
 * @description Loads content from the session storage.
 * @function loadFromStorage
 * @returns {object|undefined} The parsed JSON object from session storage, or undefined if the key 'editorContent' is not found.
 */
export const loadFromStorage = (loadedContent: string) => {
  const storageString = sessionStorage.getItem(loadedContent === 'editorContent' ? 'editorContent' : 'articleTitle');
  return storageString ? JSON.parse(storageString) : undefined;
};

/**
 * @description Saves content to the session storage as a JSON string.
 * @function saveToStorage
 * @param {object} jsonBlocks - The content to be saved, typically an object representing editor content.
 */
export const saveToStorage = (jsonBlocks: Block[]) => {
  sessionStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
};

/**
 * @description Clears the 'editorContent' item from session storage.
 * @function clearStorage
 */
const clearStorage = () => {
  sessionStorage.removeItem('editorContent');
  sessionStorage.removeItem('articleTitle');
};


  export const getArticles = async (): Promise<Article[]> => {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const articles: Article[] = [];
  
    // Map through the documents and add them to the articles array
    querySnapshot.forEach((doc) => {
       articles.push(doc.data() as Article)
    });
    
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
  
      // Return the processed data with document ID
      return rawData as Article;
  
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
    console.log(firstContent);
    return firstContent.length > 0 ? firstContent[0].props.url : 'No image';
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
      
      return users
    }
  }

  const createArticleObject = (author: Author, content: PartialBlock[]) => {
    const now = new Date();
    const newId = nanoid(); // Generate a unique ID for the article
  
    const article = {
      id: newId, // Generate a unique ID for the article,
      title: loadFromStorage('title'),
      metadata: {
        date: now.toLocaleDateString(), // Human-readable date
        time: now.toLocaleTimeString(), // Human-readable time
        updatetime: now.toISOString(), // ISO format for precise timestamps
      },
      author: { id: author.id, name: author.name, img: author.profilePicture }, // Author's name
      likes: 0, // Initial likes count
      comments: [], // Initially an empty array for comments
      shares: 0, // Initial shares count
      saves: 0, // Initial saves count
      content: content, // Article content (blocks),
      tags: ['politics', 'news'], // Example tags, replace with actual tags
    };
  
    return article;
  };

  export const PublishArticle = async ( author: Author) => {
    const JSONContent = sessionStorage.getItem('editorContent');
    const theContent = JSONContent ? JSON.parse(JSONContent) : undefined;
  
    // 1. Create deep copy of content
    const content = JSON.parse(JSON.stringify(theContent));
  
    // 3. Create article with sanitized content
    const newArticle = createArticleObject(author, content);
  
    // 4. Save to Firestore
    await setDoc(doc(db, "articles", newArticle.id), newArticle);
    console.log("Document written with ID: ", newArticle.id);
    await updateDoc(doc(db, "authors", author.id), {
      articles: arrayUnion(newArticle.id)
    });
    // 5. Clear storage
    clearStorage();
  };