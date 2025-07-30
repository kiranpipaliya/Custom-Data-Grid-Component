import React from 'react';
import { useGrid } from '@/contexts/DataGridContext';
import { ActionTypes } from '@/app/constants/ActionsTypeConstant';

const Pagination = () => {
	const { state, dispatch } = useGrid();
	const { page, pageSize, total, totalPages } = state.pagination;

	const handlePageChange = (delta: number) => {
		const nextPage = page + delta;
		if (nextPage > 0 && nextPage <= totalPages) {
			dispatch({
				type: ActionTypes.SET_PAGINATION,
				payload: {
					...state.pagination,
					page: nextPage,
				},
			});
		}
	};

	const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSize = parseInt(e.target.value, 10);
		dispatch({
			type: ActionTypes.SET_PAGINATION,
			payload: {
				...state.pagination,
				page: 1,
				pageSize: newSize,
			},
		});
	};

	return (
		<div className="flex justify-between items-center p-4 bg-gray-50 border-t text-sm">
			<div className="flex items-center space-x-2">
				<label htmlFor="rowsPerPage">Rows per page:</label>
				<select
					id="rowsPerPage"
					value={pageSize}
					onChange={handlePageSizeChange}
					className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-500"
				>
					{[10, 25, 50, 100].map((size) => (
						<option key={size} value={size}>
							{size}
						</option>
					))}
				</select>
			</div>
			<div className="flex items-center space-x-4">
				<button
					onClick={() => handlePageChange(-1)}
					disabled={page === 1}
					className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Previous
				</button>
				<span>
					Page {page} of {totalPages} ({total} items)
				</span>
				<button
					onClick={() => handlePageChange(1)}
					disabled={page === totalPages || totalPages === 0}
					className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Pagination;
