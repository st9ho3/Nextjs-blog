// components/TableRenderer.tsx
import React from 'react';
import { TableContentData, TableRow as TableRowType } from './content'; // Adjust path
import InlineContentRenderer from './InlineContentRenderer';

interface TableRendererProps {
  content: TableContentData;
}

const mapCellStyles = (props: TableRowType['cells'][0]['props']): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    if (props.backgroundColor && props.backgroundColor !== 'default') {
        styles.backgroundColor = props.backgroundColor;
    }
    if (props.textColor && props.textColor !== 'default') {
        styles.color = props.textColor;
    }
    if (props.textAlignment) {
        styles.textAlign = props.textAlignment;
    }
    // Add padding for better spacing
    styles.padding = '0.5em';
    styles.border = '1px solid #ccc'; // Basic border for visibility
    return styles;
}

const TableRenderer: React.FC<TableRendererProps> = ({ content }) => {
  if (!content || !content.rows) {
    return null;
  }

  // Basic table styling
  const tableStyle: React.CSSProperties = {
      borderCollapse: 'collapse',
      width: '100%', // Make table take available width
      margin: '1em 0', // Add some margin
  };

  // Note: columnWidths are provided but applying them directly to <table> or <tbody>
  // isn't standard. Usually applied to <col> elements or individual <td>s.
  // For simplicity here, we are not applying explicit widths based on columnWidths.
  // You might need <colgroup> and <col> for precise control.

  return (
    <table style={tableStyle}>
      <tbody>
        {content.rows.map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {row.cells.map((cell, cellIndex) => {
              if (!cell || !cell.props) return null; // Skip potentially malformed cells
              const cellProps = cell.props;
              return (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  colSpan={cellProps.colspan > 1 ? cellProps.colspan : undefined}
                  rowSpan={cellProps.rowspan > 1 ? cellProps.rowspan : undefined}
                  style={mapCellStyles(cellProps)}
                >
                  <InlineContentRenderer content={cell.content} />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableRenderer;