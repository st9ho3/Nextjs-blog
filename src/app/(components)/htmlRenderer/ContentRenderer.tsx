// components/ContentRenderer.tsx
import React from 'react';
import { Block } from './content'; // Adjust path
import BlockRenderer from './BlockRenderer';

interface ContentRendererProps {
  content: Block[];
  isNested?: boolean; // Flag to indicate if rendering nested content (e.g., inside a list item)
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content, isNested = false }) => {
  if (!content || content.length === 0) {
    return null;
  }

  const renderedBlocks = [];
  let currentList: { type: 'ol' | 'ul', items: Block[] } | null = null;

  for (let i = 0; i < content.length; i++) {
    const block = content[i];
    const isNumberedList = block.type === 'numberedListItem';
    const isBulletedList = block.type === 'bulletListItem';
    // Treat checklist as a type of bulleted list visually unless specific styling is needed
    const isCheckList = block.type === 'checkListItem';
    const isAnyList = isNumberedList || isBulletedList || isCheckList;

    if (isAnyList) {
      const listType = isNumberedList ? 'ol' : 'ul'; // Group checklists with bullet points visually

      if (currentList && currentList.type === listType) {
        // Continue existing list
        currentList.items.push(block);
      } else {
        // End previous list if different type or starting new
        if (currentList) {
          const ListTag = currentList.type;
          // Nested lists need less margin often
          const listStyle: React.CSSProperties = isNested ? { margin: '0.5em 0 0.5em 1.5em' } : { margin: '1em 0 1em 2em' };
          renderedBlocks.push(
            <ListTag key={`list-${i - currentList.items.length}`} style={listStyle}>
              {currentList.items.map(item => <BlockRenderer key={item.id} block={item} />)}
            </ListTag>
          );
        }
        // Start new list
        currentList = { type: listType, items: [block] };
      }
    } else {
      // Not a list item, end any current list
      if (currentList) {
        const ListTag = currentList.type;
         const listStyle: React.CSSProperties = isNested ? { margin: '0.5em 0 0.5em 1.5em' } : { margin: '1em 0 1em 2em' };
        renderedBlocks.push(
          <ListTag key={`list-${i - currentList.items.length}`} style={listStyle}>
            {currentList.items.map(item => <BlockRenderer key={item.id} block={item} />)}
          </ListTag>
        );
        currentList = null; // Reset list state
      }
      // Render the non-list block
      renderedBlocks.push(<BlockRenderer key={block.id} block={block} />);
    }
  }

  // End any remaining list after the loop
  if (currentList) {
    const ListTag = currentList.type;
    const listStyle: React.CSSProperties = isNested ? { margin: '0.5em 0 0.5em 1.5em' } : { margin: '1em 0 1em 2em' };
    renderedBlocks.push(
      <ListTag key={`list-end`} style={listStyle}>
        {currentList.items.map(item => <BlockRenderer key={item.id} block={item} />)}
      </ListTag>
    );
  }

  // If nested (e.g. inside an <li>), don't wrap in another div.
  // Otherwise, wrap the whole content in a div for potential top-level styling.
  return isNested ? <>{renderedBlocks}</> : <div>{renderedBlocks}</div>;
};

export default ContentRenderer;