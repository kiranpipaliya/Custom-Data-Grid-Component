import { ColumnEnum, RenderFunction } from '@/types/grid.types';

import React from 'react';
import dayjs from 'dayjs';
import { Column } from '@/types/grid.types';
import AvatarCell from '@/components/AvatarCell';

export type ColumnConfig = Column & {
	render?: RenderFunction;
};

export const COLUMN_CONFIG: Record<ColumnEnum, ColumnConfig> = {
	[ColumnEnum.ID]: {
		field: ColumnEnum.ID,
		headerName: 'ID',
		type: 'number',
		width: 80,
		sortable: true,
		filterable: true,
		visible: true,
		resizable: true,
		render: (value) => <>{value}</>,
	},

	[ColumnEnum.NAME]: {
		field: ColumnEnum.NAME,
		headerName: 'Name',
		type: 'text',
		width: 150,
		sortable: true,
		filterable: true,
		visible: true,
		resizable: true,
		render: (value) => <>{value}</>,
	},

	[ColumnEnum.EMAIL]: {
		field: ColumnEnum.EMAIL,
		headerName: 'Email',
		type: 'text',
		width: 200,
		sortable: true,
		filterable: true,
		visible: true,
		resizable: true,
		render: (value) => <>{value}</>,
	},

	[ColumnEnum.ROLE]: {
		field: ColumnEnum.ROLE,
		headerName: 'Role',
		type: 'text',
		width: 120,
		sortable: true,
		filterable: true,
		visible: true,
		resizable: true,
		render: (value) => <>{value}</>,
	},

	[ColumnEnum.DEPARTMENT]: {
		field: ColumnEnum.DEPARTMENT,
		headerName: 'Department',
		type: 'text',
		width: 150,
		sortable: true,
		filterable: true,
		visible: true,
		resizable: true,
		render: (value) => <>{value}</>,
	},

	[ColumnEnum.SALARY]: {
		field: ColumnEnum.SALARY,
		headerName: 'Salary',
		type: 'number',
		width: 120,
		sortable: true,
		filterable: true,
		visible: true,
		resizable: true,
		render: (value) => `₹${Number(value).toLocaleString('en-IN')}`,
	},

	[ColumnEnum.JOIN_DATE]: {
		field: ColumnEnum.JOIN_DATE,
		headerName: 'Join Date',
		type: 'date',
		width: 140,
		sortable: true,
		filterable: true,
		visible: true,
		resizable: true,
		render: (value) =>
			!!value ? dayjs(value as string).format('DD MMM YYYY') : '',
	},

	[ColumnEnum.STATUS]: {
		field: ColumnEnum.STATUS,
		headerName: 'Status',
		type: 'select',
		width: 100,
		sortable: true,
		filterable: true,
		visible: true,
		resizable: true,
		render: (value) => (
			<span
				className={`px-2 py-1 rounded text-xs font-medium ${
					value === 'active'
						? 'bg-green-100 text-green-800'
						: 'bg-red-100 text-red-800'
				}`}
			>
				{value as string}
			</span>
		),
	},

	[ColumnEnum.AVATAR]: {
		field: ColumnEnum.AVATAR,
		headerName: 'Avatar',
		type: 'text',
		width: 60,
		sortable: false,
		filterable: false,
		visible: true,
		resizable: false,
		render: (value) => {
			return <AvatarCell src={value as string} />;
		},
	},
};
