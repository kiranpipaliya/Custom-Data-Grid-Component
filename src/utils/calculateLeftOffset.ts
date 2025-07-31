import { Column, PinnedColumns } from '@/types/grid.types';

export const calculateLeftOffset = (
	field: string,
	columns: Column[],
	pinnedColumns: PinnedColumns,
): number => {
	let offset = 0;
	for (const col of columns) {
		if (col.field === field) break;
		if (pinnedColumns.left.includes(col.field)) {
			offset += col.width ?? 100;
		}
	}
	return offset;
};

export const calculateRightOffset = (
	field: string,
	columns: Column[],
	pinnedColumns: PinnedColumns,
): number => {
	let offset = 0;
	for (let i = columns.length - 1; i >= 0; i--) {
		const colDef = columns[i];
		if (colDef.field === field) break;
		if (pinnedColumns.right.includes(colDef.field)) {
			offset += colDef.width ?? 100;
		}
	}
	return offset;
};
