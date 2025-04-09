// components/InlineContentRenderer.tsx
import React from 'react';
import { InlineContent, StyleMap, TextInlineContent, LinkInlineContent } from "./content"; // Adjust path if needed

// Helper to convert style map to React CSSProperties
const mapStyles = (styles?: StyleMap): React.CSSProperties => {
  const cssStyles: React.CSSProperties = {};
  if (!styles) return cssStyles;

  if (styles.bold) cssStyles.fontWeight = 'bold';
  if (styles.italic) cssStyles.fontStyle = 'italic';
  // Combine underline and strikethrough
  const textDecorations = [];
  if (styles.underline) textDecorations.push('underline');
  if (styles.strike) textDecorations.push('line-through');
  if (textDecorations.length > 0) cssStyles.textDecoration = textDecorations.join(' ');

  if (styles.code) {
    cssStyles.fontFamily = 'monospace';
    cssStyles.backgroundColor = '#f0f0f0'; // Example code style
    cssStyles.padding = '0.1em 0.3em';
    cssStyles.borderRadius = '3px';
  }
  // Map color names (simple example, extend as needed)
  if (styles.textColor && styles.textColor !== 'default') {
    cssStyles.color = styles.textColor;
  }
  if (styles.backgroundColor && styles.backgroundColor !== 'default') {
    cssStyles.backgroundColor = styles.backgroundColor;
  }

  return cssStyles;
};

interface InlineContentRendererProps {
  content: InlineContent[];
}

const InlineContentRenderer: React.FC<InlineContentRendererProps> = ({ content }) => {
  if (!content || content.length === 0) {
    return null; // Render nothing if content is empty
  }

  return (
    <>
      {content.map((item, index) => {
        const key = item.id || `inline-${index}`; // Use id if available, otherwise index
        const style = mapStyles(item.styles);

        switch (item.type) {
          case 'text':
            const textItem = item as TextInlineContent;
            // If no styles, render plain text, otherwise wrap in span
            return Object.keys(style).length > 0 ? (
              <span key={key} style={style}>
                {textItem.text}
              </span>
            ) : (
               // Use React Fragment for plain text to avoid unnecessary spans
              <React.Fragment key={key}>{textItem.text}</React.Fragment>
            );
          case 'link':
            const linkItem = item as LinkInlineContent;
            return (
              <a key={key} href={linkItem.href} target="_blank" rel="noopener noreferrer" style={style}>
                 {/* Links can contain nested styled content */}
                <InlineContentRenderer content={linkItem.content} />
              </a>
            );
          default:
            // Log unknown inline types
            console.warn(`Unknown inline content type: ${(item as InlineContent).type}`, item);
            return null;
        }
      })}
    </>
  );
};

export default InlineContentRenderer;