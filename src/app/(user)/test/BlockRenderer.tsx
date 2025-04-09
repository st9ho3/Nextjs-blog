// components/BlockRenderer.tsx
import React from 'react';
import { Block, BlockProps, HeadingBlock, ListItemBlock, CheckListItemBlock, CodeBlock, TableBlock, InlineContent, TableContentData } from './content'; // Adjust path
import InlineContentRenderer from './InlineContentRenderer';
import TableRenderer from './TableRenderer';
import ContentRenderer from './ContentRenderer'; // Import ContentRenderer for nesting

// Helper to map block props to styles
const mapBlockStyles = (props?: BlockProps): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    if (!props) return styles;

    if (props.textAlignment) {
        styles.textAlign = props.textAlignment;
    }
    if (props.backgroundColor && props.backgroundColor !== 'default') {
        styles.backgroundColor = props.backgroundColor;
        styles.padding = '0.2em 0.4em'; // Add padding if background color exists
    }
    if (props.textColor && props.textColor !== 'default') {
        styles.color = props.textColor;
    }
     // Add default margin for block elements
    styles.margin = '0.5em 0';

    return styles;
}

interface BlockRendererProps {
  block: Block;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const blockStyle = mapBlockStyles(block.props);
  const children = block.children && block.children.length > 0 ? block.children : null;

  // Helper to render children recursively
  const renderChildren = () => children ? <ContentRenderer content={children} isNested={true}/> : null;

  switch (block.type) {
    case 'heading':
      const headingBlock = block as HeadingBlock;
      const Tag = `h${headingBlock.props.level || 1}` as React.ElementType;
      return (
        <Tag style={blockStyle}>
          <InlineContentRenderer content={headingBlock.content} />
          {renderChildren()} {/* Headings generally shouldn't have block children, but handle defensively */}
        </Tag>
      );

    case 'paragraph':
      return (
        <p style={blockStyle}>
          <InlineContentRenderer content={block.content as InlineContent[]} />
          {renderChildren()}
        </p>
      );

    case 'numberedListItem':
    case 'bulletListItem':
    case 'checkListItem': // Render structure is <li>, specific content handled below
      const listItemBlock = block as ListItemBlock | CheckListItemBlock;
      const isCheckList = listItemBlock.type === 'checkListItem';
      const isChecked = isCheckList ? (listItemBlock as CheckListItemBlock).props.checked : false;

      // Basic checklist styling (can be improved with CSS)
      const checkListStyle: React.CSSProperties = isCheckList ? { listStyle: 'none', marginLeft: '-1em'} : {}; // Remove default bullet
      const combinedStyle = {...blockStyle, ...checkListStyle};

      return (
        <li style={combinedStyle}>
          {isCheckList && (
            <span style={{ marginRight: '0.5em' }}>
              {/* Basic text representation, could use <input type="checkbox" disabled checked={isChecked} /> */}
              {isChecked ? '[x]' : '[ ]'}
            </span>
          )}
          <InlineContentRenderer content={listItemBlock.content} />
          {/* Render nested children (which will likely be another list) */}
          {renderChildren()}
        </li>
      );

    case 'codeBlock':
      const codeBlock = block as CodeBlock;
      // Basic code block styling
      const codeStyle: React.CSSProperties = {
        backgroundColor: '#f5f5f5',
        padding: '1em',
        overflowX: 'auto', // Allow horizontal scrolling
        fontFamily: 'monospace',
        display: 'block', // Make <pre> behave like a block
        whiteSpace: 'pre', // Preserve whitespace and line breaks
        ...blockStyle, // Apply alignment etc. if needed, though usually left-aligned
      };
      const langClass = codeBlock.props.language ? `language-${codeBlock.props.language}` : '';
      return (
        <pre style={codeStyle}>
          <code className={langClass}>
            {/* Assuming code content is a single text node */}
            {(codeBlock.content as InlineContent[])?.map(c => c.type === 'text' ? c.text : '').join('')}
          </code>
          {/* Code blocks generally don't have children */}
        </pre>
      );

    case 'table':
      const tableBlock = block as TableBlock;
      // Apply block-level text color/bg as defaults, cell props override
      const tableContainerStyle = mapBlockStyles(tableBlock.props);
      return (
        <div style={tableContainerStyle}> {/* Wrapper for potential block styles */}
            <TableRenderer content={tableBlock.content as TableContentData} />
            {/* Tables generally don't have children */}
        </div>
      );

    default:
      console.warn(`Unsupported block type: ${block.type}`, block);
      // Render basic div with content as fallback
      return (
        <div style={blockStyle}>
          <InlineContentRenderer content={block.content as InlineContent[]} />
          {renderChildren()}
        </div>
      );
  }
};

export default BlockRenderer;