import React from 'react';
import { useGrid } from '@/contexts/DataGridContext';
import { TableCell, TableRow } from '../ui/table';
import { getOrderedColumns } from '@/utils/getOrderedColumns';
import { cx } from 'class-variance-authority';
import { User } from '@/types/grid.types';

const DataGridRow = ({ row }: { row: User }) => {
	const {
		state: { columns, visibleColumns, pinnedColumns },
	} = useGrid();
	const orderedColumns = getOrderedColumns(columns, pinnedColumns);
	const renderCell = () => {
		return orderedColumns.map((col) => {
			if (!visibleColumns.includes(col.field)) return;
			const widthStyle = { width: col.width ?? 'auto', minWidth: 50 };
			return (
				<TableCell
					className={cx({
						'pinned-left': pinnedColumns.left.includes(col.field),
						'pinned-right': pinnedColumns.right.includes(col.field),
					})}
					key={col.field}
					style={widthStyle}
				>
					{col?.render?.((row)[col.field], row)}
				</TableCell>
			);
		});
	};
	return (
		<TableRow className="text-sm border-b hover:bg-gray-100 transition">
			{renderCell()}
		</TableRow>
	);
};

export default DataGridRow;
