// app/_lib/blockNote-server.ts
import { PartialBlock } from "@blocknote/core";
// Import only what's needed from server-util
import { BlocksToFullHTML } from "@blocknote/server-util";

export async function generateHtmlFromBlocks(content: PartialBlock[] | null | undefined): Promise<string> {
  if (!content || content.length === 0) {
    console.warn("No content provided to generateHtmlFromBlocks.");
    return ""; // Return empty string for no content
  }
  
  let htmlContent = "";
  try {
    // Instead of using ServerBlockNoteEditor which requires React context,
    // use the lower-level conversion utility directly
    htmlContent = await BlocksToFullHTML(content);
  } catch (error) {
    console.error("Error converting BlockNote content to HTML:", error);
    htmlContent = "<p>Sorry, there was an error rendering the article content.</p>";
  }
  
  return htmlContent;
}