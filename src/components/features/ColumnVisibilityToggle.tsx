'use client';

import React from 'react';
import { useGrid } from '@/contexts/DataGridContext';
import { Checkbox } from '@/components/ui/checkbox';
import { ActionTypes } from '@/app/constants/ActionsTypeConstant';

const ColumnVisibilityToggle = () => {
	const {
		state: { columns, visibleColumns },
		dispatch,
	} = useGrid();
	const toggleColumn = (field: string) => {
		const updated = visibleColumns.includes(field)
			? visibleColumns.filter((col) => col !== field)
			: [...visibleColumns, field];
		dispatch({ type: ActionTypes.SET_VISIBLE_COLUMNS, payload: updated });
	};
	return (
		<div className="flex gap-4 flex-wrap p-4 border-b">
			<span className="font-medium">Toggle Columns:</span>
			{columns.map((col) => (
				<label
					key={col.field}
					className="inline-flex items-center gap-2 text-sm cursor-pointer"
				>
					<Checkbox
						checked={visibleColumns.includes(col.field)}
						onCheckedChange={() => toggleColumn(col.field)}
					/>
					{col.headerName}
				</label>
			))}
		</div>
	);
};

export default ColumnVisibilityToggle;
