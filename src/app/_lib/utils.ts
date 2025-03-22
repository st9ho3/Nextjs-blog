// The updated desanitizeFromFirestore function with types
function desanitizeFromFirestore(data: any): FirestoreData {
    // Safety check for content array
    if (!data?.content || !Array.isArray(data.content)) {
      console.error("Invalid document structure:", data);
      return data; // Return original data as fallback
    }
  
    const restoreNestedArrays = (obj: any): any => {
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
            ([key, value]: [string, any]) => [key, restoreNestedArrays(value)]
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