import { useState, useEffect } from 'react';

export function useVirtualScroll<T>(
	data: T[],
	rowHeight: number,
	containerHeight: number,
) {
	const [startOffset, setStartOffset] = useState(0);
	const visibleCount = Math.ceil(containerHeight / rowHeight);

	const start = Math.floor(startOffset / rowHeight);
	const end = start + visibleCount;

	const visibleData = data.slice(start, end);

	useEffect(() => {
		const onScroll = (e: Event) => {
			const target = e.target as HTMLElement;
			setStartOffset(target.scrollTop);
		};
		document
			.getElementById('scroll-container')
			?.addEventListener('scroll', onScroll);
		return () =>
			document
				.getElementById('scroll-container')
				?.removeEventListener('scroll', onScroll);
	}, []);

	return visibleData;
}
