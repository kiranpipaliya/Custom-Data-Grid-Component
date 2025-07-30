import { useState, useEffect } from 'react';
import axios from 'axios';

export function useApi(url: string) {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios
			.get(url)
			.then((res) => setData(res.data.data))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, [url]);
	return { data, loading, error };
}
