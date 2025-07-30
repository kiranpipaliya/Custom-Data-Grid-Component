'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
	GridState,
	User,
	Column,
	SortModel,
	FilterValue,
} from '@/types/grid.types';
import { ActionTypes } from '@/app/constants/ActionsTypeConstant';

const initialState: GridState = {
	data: [],
	columns: [],
	visibleColumns: [],
	pinnedColumns: { left: [], right: [] },
	sortModel: [],
	filterModel: {},
	filterModelSearch: {},
	selectedRows: new Set(),
	pagination: {
		page: 1,
		pageSize: 10,
		total: 0,
		totalPages: 0,
	},
	loading: false,
	error: null,
};

type Action =
	| { type: ActionTypes.SET_DATA; payload: User[] }
	| { type: ActionTypes.SET_COLUMNS; payload: Column[] }
	| { type: ActionTypes.SET_VISIBLE_COLUMNS; payload: string[] }
	| { type: ActionTypes.SET_LOADING; payload: boolean }
	| { type: ActionTypes.SET_ERROR; payload: string | null }
	| {
			type: ActionTypes.SET_PAGINATION;
			payload: {
				page: number;
				pageSize: number;
				total: number;
				totalPages: number;
			};
	  }
	| { type: ActionTypes.SET_SELECTED_ROWS; payload: Set<string> }
	| { type: ActionTypes.SET_GLOBAL_SEARCH; payload: string }
	| {
			type: ActionTypes.SET_FILTER;
			payload: {
				field: string;
				filter: FilterValue;
			};
	  }
	| { type: ActionTypes.SET_SORT_MODEL; payload: SortModel[] }
	| { type: ActionTypes.TOGGLE_COLUMN_VISIBILITY; payload: string }
	| { type: ActionTypes.REORDER_COLUMNS; payload: Column[] }
	| {
			type: ActionTypes.PIN_COLUMN;
			payload: { field: string; position: 'left' | 'right' | null };
	  }
	| {
			type: ActionTypes.RESIZE_COLUMN;
			payload: { field: string; width: number };
	  }
	| {
			type: ActionTypes.FREEZE_COLUMN;
			payload: { field: string; frozen: boolean };
	  }
	| {
			type: ActionTypes.GROUP_COLUMNS;
			payload: { field: string; group: string | null };
	  };

const reducer = (state: GridState, action: Action): GridState => {
	switch (action.type) {
		case ActionTypes.SET_DATA:
			return { ...state, data: action.payload };
		case ActionTypes.SET_COLUMNS:
			return {
				...state,
				columns: action.payload,
				visibleColumns: action.payload.map((col) => col.field),
			};

		case ActionTypes.SET_VISIBLE_COLUMNS:
			return { ...state, visibleColumns: action.payload };
		case ActionTypes.SET_LOADING:
			return { ...state, loading: action.payload };
		case ActionTypes.SET_ERROR:
			return { ...state, error: action.payload };
		case ActionTypes.SET_PAGINATION:
			return { ...state, pagination: action.payload };
		case ActionTypes.SET_SELECTED_ROWS:
			return { ...state, selectedRows: action.payload };
		case ActionTypes.SET_SORT_MODEL:
			return { ...state, sortModel: action.payload };
		case ActionTypes.SET_FILTER:
			return {
				...state,
				filterModelSearch: {
					...state.filterModelSearch,
					[action.payload.field]: action.payload.filter,
				},
			};
		case ActionTypes.SET_GLOBAL_SEARCH:
			return {
				...state,
				filterModel: {
					...state.filterModel,
					search: action.payload,
				},
			};
		case ActionTypes.TOGGLE_COLUMN_VISIBILITY:
			return {
				...state,
				columns: state.columns.map((col) =>
					col.field === action.payload
						? {
								...col,
								visible: col.visible === false ? true : false,
						}
						: col,
				),
			};
		case ActionTypes.REORDER_COLUMNS:
			return {
				...state,
				columns: action.payload,
			};

		case ActionTypes.PIN_COLUMN: {
			const updatedColumns = state.columns.map((col) =>
				col.field === action.payload.field
					? { ...col, pinned: action.payload.position }
					: col,
			);

			return {
				...state,
				columns: updatedColumns,
				pinnedColumns: {
					left: updatedColumns
						.filter((col) => col.pinned === 'left')
						.map((col) => col.field),
					right: updatedColumns
						.filter((col) => col.pinned === 'right')
						.map((col) => col.field),
				},
			};
		}

		case ActionTypes.RESIZE_COLUMN:
			return {
				...state,
				columns: state.columns.map((col) =>
					col.field === action.payload.field
						? { ...col, width: action.payload.width }
						: col,
				),
			};

		case ActionTypes.FREEZE_COLUMN:
			return {
				...state,
				columns: state.columns.map((col) =>
					col.field === action.payload.field
						? { ...col, frozen: action.payload.frozen }
						: col,
				),
			};

		case 'GROUP_COLUMNS':
			return {
				...state,
				columns: state.columns.map((col) =>
					col.field === action.payload.field
						? { ...col, group: action.payload.group }
						: col,
				),
			};
		default:
			return state;
	}
};

const DataGridContext = createContext<{
	state: GridState;
	dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const useDataGridContext = () => useContext(DataGridContext);

export const DataGridProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<DataGridContext.Provider value={{ state, dispatch }}>
			{children}
		</DataGridContext.Provider>
	);
};

export const useGrid = () => useContext(DataGridContext);
