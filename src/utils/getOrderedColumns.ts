
import { Column, PinnedColumns } from '@/types/grid.types';

export const getOrderedColumns = (
  columns: Column[],
  pinnedColumns: PinnedColumns
): Column[] => {
  const leftPinned = columns.filter(col => pinnedColumns.left.includes(col.field));
  const rightPinned = columns.filter(col => pinnedColumns.right.includes(col.field));
  const center = columns.filter(
    col => !pinnedColumns.left.includes(col.field) && !pinnedColumns.right.includes(col.field)
  );

  return [...leftPinned, ...center, ...rightPinned];
};
