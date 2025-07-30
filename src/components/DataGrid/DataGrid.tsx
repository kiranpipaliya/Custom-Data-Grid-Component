'use client';

import React, { useCallback, useEffect } from 'react';
import { useGrid } from '@/contexts/DataGridContext';
import axios from 'axios';
import DataGridHeader from './DataGridHeader';
import DataGridRow from './DataGridRow';
import Pagination from './Pagination';
import { Table, TableBody } from '../ui/table';
import { COLUMN_CONFIG } from '@/app/constants/ColumnConfig';
import { ActionTypes } from '@/app/constants/ActionsTypeConstant';

const DataGrid = () => {
	const { state, dispatch } = useGrid();
	const { page, pageSize } = state.pagination;
	const { sortModel, filterModel, filterModelSearch } = state;

	const fetchData = useCallback(async () => {
		try {
			dispatch({ type: ActionTypes.SET_LOADING, payload: true });
			const filtersParam = encodeURIComponent(
				JSON.stringify({ ...filterModel, ...filterModelSearch }),
			);
			const params = new URLSearchParams({
				page: String(page),
				pageSize: String(pageSize),
				filters: filtersParam,
				...(sortModel?.length
					? {
							sortBy: sortModel[0].field,
							sortOrder: sortModel[0].sort,
					  }
					: {}),
			});

			const res = await axios.get(`/api/users?${params.toString()}`);
			const {
				data,
				total,
				page: currentPAge,
				pageSize: pageSizeA,
				totalPages,
			} = res.data;

			dispatch({
				type: ActionTypes.SET_PAGINATION,
				payload: {
					total,
					page: currentPAge,
					pageSize: pageSizeA,
					totalPages,
				},
			});

			dispatch({ type: ActionTypes.SET_DATA, payload: data });
			if (state.columns.length === 0) {
				const configValues = Object.values(COLUMN_CONFIG);
				dispatch({
					type: ActionTypes.SET_COLUMNS,
					payload: configValues.map((cfg) => ({
						field: cfg.field,
						headerName: cfg.headerName,
						sortable: cfg.sortable,
						filterable: cfg.filterable,
						visible: cfg.visible,
						resizable: cfg.resizable,
						width: cfg.width,
						render: cfg.render,
					})),
				});
			}
		} catch (error) {
			console.error('Failed to fetch:', error);
		} finally {
			dispatch({ type: ActionTypes.SET_LOADING, payload: false });
		}
	}, [dispatch,  page, pageSize, sortModel, filterModel, filterModelSearch, state.columns.length]);

	useEffect(() => {
		fetchData();
	}, [page, pageSize, sortModel, filterModel, filterModelSearch, fetchData]);

	if (state.loading) {
		return (
			<div className="flex justify-center items-center p-6">
				<div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
			</div>
		);
	}
	return (
		<div>
			<Table>
				<DataGridHeader />
				<TableBody>
					{state.data.map((row, idx) => (
						<DataGridRow key={idx} row={row} />
					))}
				</TableBody>
			</Table>
			<Pagination />
		</div>
	);
};

export default DataGrid;
