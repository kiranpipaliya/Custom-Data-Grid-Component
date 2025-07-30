import { useGrid } from '@/contexts/DataGridContext';
import { Column } from '@/types/grid.types';
import React from 'react';
import { ArrowLeftToLine, ArrowRightToLine, X } from 'lucide-react';
import { Button } from '../ui/button';
import { ActionTypes } from '@/app/constants/ActionsTypeConstant';

type PinUnpinButtonsPropsType = {
	col: Column;
};

const PinUnpinButtons = ({ col }: PinUnpinButtonsPropsType) => {
	const { dispatch } = useGrid();
	const handlePing = (position: 'left' | 'right' | null) => {
		dispatch({
			type: ActionTypes.PIN_COLUMN,
			payload: { field: col.field, position: position },
		});
	};
	return (
		<div className="inline-flex gap-1">
			<Button
				variant="ghost"
				onClick={() => handlePing('left')}
				title="Pin Left"
				className=" hover:bg-blue-100 text-blue-600 transition-colors !p-0 h-auto"
			>
				<ArrowLeftToLine className="w-4 h-4" />
			</Button>

			<Button
				variant="ghost"
				onClick={() => handlePing('right')}
				title="Pin Right"
				className="hover:bg-blue-100 text-blue-600 transition-colors !p-0 h-auto"
			>
				<ArrowRightToLine className="w-4 h-4" />
			</Button>

			<Button
				variant="ghost"
				onClick={() => handlePing(null)}
				title="Unpin"
				className="hover:bg-gray-200 text-gray-600 transition-colors !p-0 h-auto"
			>
				<X className="w-4 h-4" />
			</Button>
		</div>
	);
};

export default PinUnpinButtons;
