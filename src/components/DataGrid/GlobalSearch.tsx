'use client';

import { ActionTypes } from '@/app/constants/ActionsTypeConstant';
import { useGrid } from '@/contexts/DataGridContext';
import React, { useEffect, useState } from 'react';

const GlobalSearch = () => {
	const { dispatch, state } = useGrid();
    const [searchTerm, setSearchTerm] = useState(String(state.filterModel.search || ''));

	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			dispatch({
				type: ActionTypes.SET_GLOBAL_SEARCH,
				payload: searchTerm,
			});
		}, 800);

		return () => clearTimeout(debounceTimer);
	}, [searchTerm, dispatch]);

	return (
		<div className="py-3 flex items-center gap-2">
			<input
				type="text"
				className="border p-2 rounded-md w-full max-w-sm"
				placeholder="🔍 Search across all columns..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	);
};

export default GlobalSearch;
