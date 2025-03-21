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