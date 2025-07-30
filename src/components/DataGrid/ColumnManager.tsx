import React from 'react';
import { useGrid } from '@/contexts/DataGridContext';
import { ActionTypes } from '@/app/constants/ActionsTypeConstant';

const ColumnManager = () => {
	const { state, dispatch } = useGrid();
	const toggleColumn = (field: string) => {
		const newVisible = state.visibleColumns.includes(field)
			? state.visibleColumns.filter((col) => col !== field)
			: [...state.visibleColumns, field];
		dispatch({ type: ActionTypes.SET_VISIBLE_COLUMNS, payload: newVisible });
	};

	return (
		<div className="p-4 border">
			<h4 className="font-bold mb-2">Column Manager</h4>
			{state.columns.map((col) => (
				<label key={col.field} className="block">
					<input
						type="checkbox"
						checked={state.visibleColumns.includes(col.field)}
						onChange={() => toggleColumn(col.field)}
					/>
					{col.headerName}
				</label>
			))}
		</div>
	);
};

export default ColumnManager;
