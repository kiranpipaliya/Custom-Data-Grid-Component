'use client';

import { useGrid } from '@/contexts/DataGridContext';
import DataGridHeaderCell from './DataGridHeaderCell';
import { TableHeader, TableRow } from '../ui/table';
import { getOrderedColumns } from '@/utils/getOrderedColumns';

const DataGridHeader = () => {
	const {
		state: { columns, visibleColumns, pinnedColumns },
	} = useGrid();

	if (!columns || !Array.isArray(columns)) return null;
    const orderedColumns = getOrderedColumns(columns,pinnedColumns)

	return (
		<TableHeader className="border-b bg-gray-100">
			<TableRow>
				{orderedColumns
					.filter((col) => visibleColumns.includes(col.field))
					.map((col) => (
							<DataGridHeaderCell  key={col.field} col={col} />
					))}
			</TableRow>
		</TableHeader>
	);
};

export default DataGridHeader;
