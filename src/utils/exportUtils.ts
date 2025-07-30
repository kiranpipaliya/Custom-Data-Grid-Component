import { Column, User } from '@/types/grid.types';

export const exportToCSV = (data: User[], columns: Column[], filename = 'data.csv') => {
	const visibleColumns = columns.filter((col) => col.visible !== false);
	const header = visibleColumns.map((col) => col.headerName).join(',');

	const rows = data
		.map((row) =>
			visibleColumns.map((col) => {
				const value = row[col.field as keyof User];
				return `"${String(value ?? '').replace(/"/g, '""')}"`
			}).join(',')
		)
		.join('\n');

	const csvContent = `${header}\n${rows}`;
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
};

export const exportToJSON = (data: User[], columns: Column[], filename = 'data.json') => {
	const visibleFields = columns.filter((col) => col.visible !== false).map((col) => col.field);
	const filteredData = data.map((row) =>
		Object.fromEntries(
			Object.entries(row).filter(([key]) => visibleFields.includes(key))
		)
	);

	const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
		type: 'application/json',
	});
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
};
