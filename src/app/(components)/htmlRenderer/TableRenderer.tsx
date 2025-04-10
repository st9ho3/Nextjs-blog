// components/TableRenderer.tsx
import React from 'react';
import { TableContentData, TableRow as TableRowType } from './content';
import InlineContentRenderer from './InlineContentRenderer';
import styles from './ContentRenderer.module.css'; // Import styles for .tableCell

interface TableRendererProps {
  content: TableContentData;
}

// Styles specific to CELL properties from JSON (overrides)
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
    // Padding/border are now handled by CSS module's .tableCell
    return styles;
}

const TableRenderer: React.FC<TableRendererProps> = ({ content }) => {
  if (!content || !content.rows) {
    return null;
  }

  return (
    // Table tag itself might not need a class if styled via .tableWrapper table
    <table>
      <tbody>
        {content.rows.map((row, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {row.cells.map((cell, cellIndex) => {
              if (!cell || !cell.props) return null;
              const cellProps = cell.props;
              const inlineCellStyle = mapCellStyles(cellProps); // Get overrides

              return (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className={styles.tableCell} // Apply the specific class
                  colSpan={cellProps.colspan > 1 ? cellProps.colspan : undefined}
                  rowSpan={cellProps.rowspan > 1 ? cellProps.rowspan : undefined}
                  style={inlineCellStyle} // Apply JSON overrides
                >
                  {cell.content && cell.content.length > 0
                    ? <InlineContentRenderer content={cell.content} />
                    : <> </>
                  }
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