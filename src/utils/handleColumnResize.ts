
import { ActionTypes } from '@/app/constants/ActionsTypeConstant';
import { Column } from '@/types/grid.types';

type ResizeColumnFn = (
	e: React.MouseEvent,
	field: string,
	columns: Column[],
	dispatch: React.Dispatch<{
		type: ActionTypes.RESIZE_COLUMN;
		payload: { field: string; width: number };
	}>,
) => void;

export const handleColumnResize: ResizeColumnFn = (
	e,
	field,
	columns,
	dispatch,
) => {
	e.preventDefault();
	const startX = e.clientX;
	const startCol = columns.find((c) => c.field === field);
	if (!startCol) return;

	const startWidth = startCol.width ?? 100;

	const onMouseMove = (moveEvent: MouseEvent) => {
		const deltaX = moveEvent.clientX - startX;
		const newWidth = Math.max(startWidth + deltaX, 50); // Minimum width = 50px

		dispatch({
			type: ActionTypes.RESIZE_COLUMN,
			payload: { field, width: newWidth },
		});
	};

	const onMouseUp = () => {
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('mouseup', onMouseUp);
	};

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
};
