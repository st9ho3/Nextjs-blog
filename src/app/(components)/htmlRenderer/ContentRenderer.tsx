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
  if (!content || content.length === 0) return null;

  const renderedBlocks = [];
  let currentList: { type: 'ol' | 'ul', items: Block[], listClass: string } | null = null;

  for (let i = 0; i < content.length; i++) {
    const block = content[i];
    const isNumberedList = block.type === 'numberedListItem';
    const isBulletedList = block.type === 'bulletListItem';
    const isCheckList = block.type === 'checkListItem';
    const isAnyList = isNumberedList || isBulletedList || isCheckList;
    

    if (isAnyList) {
        const listType = isNumberedList ? 'ol' : 'ul';
        // Get the appropriate CSS Module class for the list type
        const listClass = listType === 'ol' ? styles.orderedList : styles.unorderedList;

        if (currentList && currentList.type === listType) {
            currentList.items.push(block);
        } else {
            if (currentList) {
                const ListTag = currentList.type;
                // Apply the class from the finished list
                 const listStyle: React.CSSProperties = isNested ? { marginLeft: '1.5em', marginTop: '0.5em', marginBottom: '0.5em' } : { }; // Adjust nested margin only if needed

                renderedBlocks.push(
                    <ListTag key={`list-${i - currentList.items.length}`} className={currentList.listClass} style={listStyle}>
                    {currentList.items.map(item => <BlockRenderer key={item.id} block={item} />)}
                    </ListTag>
                );
            }
            // Start new list with its class
            currentList = { type: listType, items: [block], listClass: listClass };
        }
    } else {
        if (currentList) {
            const ListTag = currentList.type;
            const listStyle: React.CSSProperties = isNested ? { marginLeft: '1.5em', marginTop: '0.5em', marginBottom: '0.5em' } : { };

            renderedBlocks.push(
                <ListTag key={`list-${i - currentList.items.length}`} className={currentList.listClass} style={listStyle}>
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
     const listStyle: React.CSSProperties = isNested ? { marginLeft: '.4em', marginTop: '0.5em', marginBottom: '0.5em' } : { }; // Adjust nested margin if needed

    renderedBlocks.push(
      <ListTag key={`list-end`} className={currentList.listClass} style={listStyle}>
        {currentList.items.map(item => <BlockRenderer key={item.id} block={item} />)}
      </ListTag>
    );
  }

  // Apply the wrapper class for padding etc. only if not nested
  return isNested ? (
    <>{renderedBlocks}</>
  ) : (
    <div className={styles.contentWrapper}>{renderedBlocks}</div>
  );
};

export default ContentRenderer;