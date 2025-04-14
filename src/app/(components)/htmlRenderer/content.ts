// types/content.ts

// --- Inline Content ---
export interface StyleMap {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    code?: boolean; // Assuming 'code' might be an inline style
    textColor?: string; // e.g., "yellow", "default", "pink"
    backgroundColor?: string; // e.g., "red", "default", "gray"
  }
  
  export interface BaseInlineContent {
    type: string;
    id?: string; // Optional, seems present on text sometimes
    styles?: StyleMap;
  }
  
  export interface TextInlineContent extends BaseInlineContent {
    type: "text";
    text: string;
  }
  
  export interface LinkInlineContent extends BaseInlineContent {
    type: "link";
    href: string;
    content: InlineContent[]; // Links can contain styled text
  }
  
  export type InlineContent = TextInlineContent | LinkInlineContent;
  
  
  // --- Block Content ---
  export interface BlockProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6; // For headings
    textAlignment?: "left" | "center" | "right";
    textColor?: string;
    backgroundColor?: string;
    checked?: boolean; // For checkListItem
    language?: string; // For codeBlock
    // Table specific props are handled within TableContent
  }
  
  export interface TableCell {
      content: InlineContent[];
      props: {
          type: "tableCell";
          colspan: number;
          rowspan: number;
          backgroundColor?: string;
          textColor?: string;
          textAlignment?: "left" | "center" | "right";
      };
  }
  
  export interface TableRow {
      cells: TableCell[];
  }
  
  export interface TableContentData {
      type: "tableContent";
      columnWidths?: (number | null)[];
      rows: TableRow[];
  }
  
  export interface BaseBlock {
    id: string;
    type: string;
    props: BlockProps;
    content: InlineContent[] | TableContentData; // Can be inline array OR table data
    children: Block[]; // For nesting (e.g., lists)
  }
  
  // Specific Block Types (using Discriminated Union based on 'type')
  export interface HeadingBlock extends BaseBlock {
      type: "heading";
      props: BaseBlock["props"] & { level: 1 | 2 | 3 | 4 | 5 | 6 };
      content: InlineContent[];
  }
  
  export interface ParagraphBlock extends BaseBlock {
      type: "paragraph";
      content: InlineContent[];
  }
  
  export interface ListItemBlock extends BaseBlock {
      type: "numberedListItem" | "bulletListItem";
      content: InlineContent[];
  }
  
  export interface CheckListItemBlock extends BaseBlock {
      type: "checkListItem";
      props: BaseBlock["props"] & { checked: boolean };
      content: InlineContent[];
  }
  
  export interface CodeBlock extends BaseBlock {
      type: "codeBlock";
      props: BaseBlock["props"] & { language?: string };
      content: InlineContent[]; // Code content is often a single text node
  }
  
  export interface TableBlock extends BaseBlock {
      type: "table";
      content: TableContentData;
      // Table block itself might have props like textColor, but cell props override
  }

  export interface ImageBlock extends BaseBlock {
    type: "image";
    props: BaseBlock["props"] & { // Inherit base props like textAlignment, backgroundColor
        url: string;                 // Changed from src to url
        name?: string;                // Added name (optional)
        caption: string;              // Changed from InlineContent[] to string
        previewWidth?: number;        // Added previewWidth (optional)
        showPreview?: boolean;         // Added showPreview (optional)
    };
    content: []; // Images typically don't have inline content directly
    children: []; // Images typically don't have children blocks
}
  
  
  // Union of all possible block types
  export type Block =
    | HeadingBlock
    | ParagraphBlock
    | ListItemBlock
    | CheckListItemBlock
    | CodeBlock
    | TableBlock
    | ImageBlock
    // Add other block types here if they exist
    | BaseBlock; // Fallback for unspecific types if needed
  
  // Top-level structure
  export interface EditorContent {
      content: Block[];
  }