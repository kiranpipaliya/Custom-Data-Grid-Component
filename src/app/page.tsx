'use client';

import DataGridWrapper from '@/components/DataGrid/DataGridWrapper';
import { DataGridProvider } from '@/contexts/DataGridContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/utils/cn';

export default function Home() {
	const { theme } = useTheme();
	return (
		<main
			className={cn(
				'min-h-screen p-6 transition-colors duration-300',
				theme === 'dark'
					? 'bg-[#111] text-white'
					: 'bg-gray-50 text-black',
			)}
		>
			<DataGridProvider>
				<DataGridWrapper />
			</DataGridProvider>
		</main>
	);
}
