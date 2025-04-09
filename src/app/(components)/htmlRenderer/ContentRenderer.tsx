// components/ContentRenderer.tsx
import React from 'react';
import { Block } from './content';
import BlockRenderer from './BlockRenderer';
import styles from './ContentRenderer.module.css'; // Import the CSS module

interface ContentRendererProps {
  content: Block[];
  isNested?: boolean;
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
    const isCheckList = block.type === 'checkListItem';
    const isAnyList = isNumberedList || isBulletedList || isCheckList;

    if (isAnyList) {
        const listType = isNumberedList ? 'ol' : 'ul';

        if (currentList && currentList.type === listType) {
            currentList.items.push(block);
        } else {
            if (currentList) {
                const ListTag = currentList.type;
                // Keep inline style for nested list margin adjustment or move to CSS
                const listStyle: React.CSSProperties = isNested ? { margin: '0.5em 0 0.5em 1.5em' } : { margin: '1em 0 1em 2em' };
                renderedBlocks.push(
                    <ListTag key={`list-${i - currentList.items.length}`} style={listStyle}>
                    {currentList.items.map(item => <BlockRenderer key={item.id} block={item} />)}
                    </ListTag>
                );
            }
            currentList = { type: listType, items: [block] };
        }
    } else {
        if (currentList) {
            const ListTag = currentList.type;
            const listStyle: React.CSSProperties = isNested ? { margin: '0.5em 0 0.5em 1.5em' } : { margin: '1em 0 1em 2em' };
            renderedBlocks.push(
                <ListTag key={`list-${i - currentList.items.length}`} style={listStyle}>
                {currentList.items.map(item => <BlockRenderer key={item.id} block={item} />)}
                </ListTag>
            );
            currentList = null;
        }
        renderedBlocks.push(<BlockRenderer key={block.id} block={block} />);
    }
  }

  if (currentList) {
    const ListTag = currentList.type;
     const listStyle: React.CSSProperties = isNested ? { margin: '0.5em 0 0.5em 1.5em' } : { margin: '1em 0 1em 2em' };
    renderedBlocks.push(
      <ListTag key={`list-end`} style={listStyle}>
        {currentList.items.map(item => <BlockRenderer key={item.id} block={item} />)}
      </ListTag>
    );
  }

  // Apply the wrapper class only if it's NOT nested content
  // Nested content (like lists within lists) shouldn't get the main padding/styles
  return isNested ? (
    <>{renderedBlocks}</>
  ) : (
    <div className={styles.contentWrapper}>{renderedBlocks}</div> // Apply the class here
  );
};

export default ContentRenderer;