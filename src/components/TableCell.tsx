import React from 'react';
import { CSS_CLASSES } from '../utils/constants';

interface TableCellProps {
  children: React.ReactNode;
  isHeader?: boolean;
  className?: string;
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className = '',
}) => {
  const baseClass = isHeader
    ? CSS_CLASSES.TABLE_HEADER_CELL
    : CSS_CLASSES.TABLE_CELL;

  return <div className={`${baseClass} ${className}`}>{children}</div>;
};

export default TableCell;
