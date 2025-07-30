'use client';
import { Button } from '@/components/ui/button';
import { useGrid } from '@/contexts/DataGridContext';
import { exportToCSV, exportToJSON } from '@/utils/exportUtils';
import { Download } from 'lucide-react';

const DataGridExport = () => {
	const {
		state: { data, columns },
	} = useGrid();

	return (
		<div className="flex gap-2">
			<Button
				variant="outline"
				onClick={() => exportToCSV(data, columns)}
			>
				<Download className="w-4 h-4 mr-2" />
				Export CSV
			</Button>
			<Button
				variant="outline"
				onClick={() => exportToJSON(data, columns)}
			>
				<Download className="w-4 h-4 mr-2" />
				Export JSON
			</Button>
		</div>
	);
};

export default DataGridExport;
