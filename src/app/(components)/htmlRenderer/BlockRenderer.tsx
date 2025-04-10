// components/BlockRenderer.tsx
import React, { JSX } from 'react';
import { Block, BlockProps, HeadingBlock, ListItemBlock, CheckListItemBlock, CodeBlock, TableBlock, InlineContent, TableContentData } from './content';
import InlineContentRenderer from './InlineContentRenderer';
import TableRenderer from './TableRenderer';
import ContentRenderer from './ContentRenderer';
import styles from './ContentRenderer.module.css'; // Import the CSS module

// Keep this function: It applies specific overrides from JSON props
const mapBlockStyles = (props?: BlockProps): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    if (!props) return styles;
    if (props.textAlignment) styles.textAlign = props.textAlignment;
    if (props.backgroundColor && props.backgroundColor !== 'default') {
        styles.backgroundColor = props.backgroundColor;
        // Add padding only if background is set, maybe? Or rely on CSS module padding.
        // Consider if inline padding should override module padding.
        // styles.padding = '0.2em 0.4em';
    }
    if (props.textColor && props.textColor !== 'default') styles.color = props.textColor;
    return styles;
}

interface BlockRendererProps {
  block: Block;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const inlineBlockStyle = mapBlockStyles(block.props); // Styles from JSON props
  const children = block.children && block.children.length > 0 ? block.children : null;

  const renderChildren = () => children ? <ContentRenderer content={children} isNested={true}/> : null;

  switch (block.type) {
    case 'heading':
      const headingBlock = block as HeadingBlock;
      const level = headingBlock.props.level || 1;
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      // Dynamically select heading class based on level
      const headingClass = styles[`heading${level}` as keyof typeof styles] || styles.heading6; // Fallback
      return (
        <Tag className={headingClass} style={inlineBlockStyle}>
          <InlineContentRenderer content={headingBlock.content as InlineContent[]} />
          {renderChildren()}
        </Tag>
      );

    case 'paragraph':
      return (
        <p className={styles.paragraph} style={inlineBlockStyle}>
          <InlineContentRenderer content={block.content as InlineContent[]} />
          {renderChildren()}
        </p>
      );

    case 'numberedListItem':
    case 'bulletListItem':
      const listItemBlock = block as ListItemBlock;
      return (
        <li className={styles.listItem} style={inlineBlockStyle}>
          <InlineContentRenderer content={listItemBlock.content as InlineContent[]} />
          {renderChildren()}
        </li>
      );

    case 'checkListItem':
        const checkListItemBlock = block as CheckListItemBlock;
        const isChecked = checkListItemBlock.props.checked;
        return (
            <li className={styles.checkListItem} style={inlineBlockStyle}>
             {/* Checkbox indicator - styling handled by .checkListItem span */}
            <span>
                {isChecked ? '[x]' : '[ ]'}
            </span>
            <InlineContentRenderer content={checkListItemBlock.content as InlineContent[]} />
            {renderChildren()}
            </li>
        );


    case 'codeBlock':
      const codeBlock = block as CodeBlock;
      const langClass = codeBlock.props.language ? `language-${codeBlock.props.language}` : '';
      // Apply base style via class, specific overrides (like alignment?) via inline style
      return (
        <pre className={styles.codeBlock} style={inlineBlockStyle}>
          <code className={langClass}>
            {(codeBlock.content as InlineContent[])?.map(c => c.type === 'text' ? c.text : '').join('')}
          </code>
        </pre>
      );

    case 'table':
      const tableBlock = block as TableBlock;
      // Apply tableWrapper class and potential overrides to the container
      return (
        <div className={styles.tableWrapper} style={inlineBlockStyle}>
            <TableRenderer content={tableBlock.content as TableContentData} />
        </div>
      );

    default:
      console.warn(`Unsupported block type: ${block.type}`, block);
      // Basic fallback, maybe apply paragraph style?
      return (
        <div className={styles.paragraph} style={inlineBlockStyle}>
          {block.content && Array.isArray(block.content)
            ? <InlineContentRenderer content={block.content as InlineContent[]} />
            : /* Handle potential non-array content types if necessary */ null }
          {renderChildren()}
        </div>
      );
  }
};

export default BlockRenderer;