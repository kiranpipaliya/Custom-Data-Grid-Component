import React, { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Column } from '@/types/grid.types';
import { useGrid } from '@/contexts/DataGridContext';
import { useDrag, useDrop } from 'react-dnd';
import PinUnpinButtons from './PinUnpinButtons';
import { TableHead } from '../ui/table';
import { cx } from 'class-variance-authority';
import { handleColumnResize } from '@/utils/handleColumnResize';
import { ActionTypes } from '@/app/constants/ActionsTypeConstant';

type DataGridHeaderCellPropsType = {
	col: Column;
};

const DataGridHeaderCell = (props: DataGridHeaderCellPropsType) => {
	const { col } = props;
	const {
		state: {
			columns,
			visibleColumns,
			sortModel,
			pinnedColumns,
			filterModelSearch,
		},
		dispatch,
	} = useGrid();
	const [inputValues, setInputValues] = useState<{ [key: string]: string }>(
		() =>
			columns.reduce((acc, col) => {
				acc[col.field] = filterModelSearch[col.field]?.value || '';
				return acc;
			}, {} as { [key: string]: string }),
	);

	const handleInputChange = (field: string, value: string) => {
		setInputValues((prev) => ({ ...prev, [field]: value }));
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		field: string,
		type: 'text' | 'number' | 'date' | 'select',
	) => {
		if (e.key === 'Enter') {
			dispatch({
				type: ActionTypes.SET_FILTER,
				payload: {
					field,
					filter: { value: inputValues[field], type },
				},
			});
		}
	};

	const toggleSort = (field: string) => {
		const existing = sortModel?.[0];
		let nextSort: 'asc' | 'desc' | null = 'asc';

		if (existing?.field === field) {
			if (existing.sort === 'asc') nextSort = 'desc';
			else if (existing.sort === 'desc') nextSort = null;
		}

		dispatch({
			type: ActionTypes.SET_SORT_MODEL,
			payload: nextSort ? [{ field, sort: nextSort }] : [],
		});
	};

	const moveColumn = (dragField: string, hoverField: string) => {
		const dragIndex = columns.findIndex((col) => col.field === dragField);
		const hoverIndex = columns.findIndex((col) => col.field === hoverField);
		if (dragIndex < 0 || hoverIndex < 0 || dragIndex === hoverIndex) return;

		const updatedColumns = [...columns];
		const [dragged] = updatedColumns.splice(dragIndex, 1);
		updatedColumns.splice(hoverIndex, 0, dragged);

		dispatch({
			type: ActionTypes.REORDER_COLUMNS,
			payload: updatedColumns,
		});
	};

	if (!visibleColumns.includes(col.field)) return;
	const currentSort = sortModel?.[0];
	const isSorted = currentSort?.field === col.field;
	const sortIcon =
		isSorted && currentSort.sort === 'asc' ? (
			<ArrowUp size={12} className="inline-block ml-1" />
		) : isSorted && currentSort.sort === 'desc' ? (
			<ArrowDown size={12} className="inline-block ml-1" />
		) : null;

	const [, dragRef] = useDrag({
		type: 'COLUMN',
		item: { field: col.field },
	});

	const [, dropRef] = useDrop({
		accept: 'COLUMN',
		drop: (item: { field: string }) => {
			if (item.field !== col.field) {
				moveColumn(item.field, col.field);
			}
		},
	});

	const combinedRef = (node: HTMLDivElement | null) => {
		dragRef(node);
		dropRef(node);
	};

	return (
		<TableHead
			ref={combinedRef}
			key={col.field}
			className={cx(
				{
					'pinned-left': pinnedColumns.left.includes(col.field),
					'pinned-right': pinnedColumns.right.includes(col.field),
				},
				'relative py-2 px-4',
			)}
			style={{ width: col.width ?? 'auto', minWidth: 50 }}
		>
			<div
				className={`font-bold select-none flex items-center justify-between`}
			>
				<div
					className="cursor-pointer select-none flex items-center justify-between"
					onClick={() => col.sortable && toggleSort(col.field)}
				>
					{col.headerName}
					{sortIcon}
				</div>
				<PinUnpinButtons col={col} />
			</div>

			{/* Filter input */}
			{col.filterable && (
				<input
					type="text"
					className="mt-1 w-full p-1 border rounded text-xs"
					placeholder={`Filter ${col.field}`}
					value={inputValues[col.field] || ''}
					onChange={(e) =>
						handleInputChange(col.field, e.target.value)
					}
					onKeyDown={(e) =>
						handleKeyDown(
							e,
							col.field,
							(col.type ?? 'text') as
								| 'text'
								| 'number'
								| 'date'
								| 'select',
						)
					}
				/>
			)}
			<div
				className="absolute top-0 right-0 h-full w-2 cursor-col-resize bg-gray-200 hover:bg-gray-300 z-10 flex items-center justify-center"
				onMouseDown={(e) =>
					handleColumnResize(e, col.field, columns, dispatch)
				}
			>
				<div className="h-4 w-1 bg-gray-300 rounded" />
			</div>
		</TableHead>
	);
};

export default React.memo(DataGridHeaderCell);
