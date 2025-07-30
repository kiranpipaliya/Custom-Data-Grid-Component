import { NextRequest, NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

type User = {
	id: number;
	name: string;
	email: string;
	role: 'admin' | 'manager' | 'developer' | 'designer';
	department: string;
	salary: number;
	joinDate: string;
	status: 'active' | 'inactive';
	avatar: string;
};

type FilterConfig = { value: string; type?: string };
type Filters = { [key: string]: FilterConfig };

// Generate dummy data once
let USERS: User[] = [];

if (USERS.length === 0) {
	USERS = Array.from({ length: 1_000_000 }, (_, i) => ({
		id: i + 1,
		name: faker.person.fullName(),
		email: faker.internet.email(),
		role: faker.helpers.arrayElement(['admin', 'manager', 'developer', 'designer']),
		department: faker.commerce.department(),
		salary: faker.number.int({ min: 40000, max: 150000 }),
		joinDate: faker.date.past().toISOString().split('T')[0],
		status: faker.helpers.arrayElement(['active', 'inactive']),
		avatar: faker.image.avatar(),
	}));
}

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;

	const page = parseInt(searchParams.get('page') || '1');
	const pageSize = parseInt(searchParams.get('pageSize') || '10');
	const sortBy = searchParams.get('sortBy') || 'id';
	const sortOrder = searchParams.get('sortOrder') === 'desc' ? -1 : 1;

	let filters: Filters = {};
	try {
		const rawFilters = searchParams.get('filters');
		if (rawFilters) {
			filters = JSON.parse(decodeURIComponent(rawFilters));
		}
	} catch (err) {
		console.error('Invalid filters param:', err);
	}

	let filtered: User[] = [...USERS];

	

	// 2. Apply Column Filters
	Object.entries(filters).forEach(([field, config]) => {
		if (field === 'search' || !config.value?.trim()) return;
		const value = config.value.toLowerCase();
		filtered = filtered.filter((user) => {
			const userValue = String(user[field as keyof User] ?? '').toLowerCase();
			return userValue.includes(value);
		});
	});

	// 3. Sort
	filtered.sort((a, b) => {
		const aVal = a[sortBy as keyof User];
		const bVal = b[sortBy as keyof User];

		const aParsed = typeof aVal === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(aVal)
			? new Date(aVal).getTime()
			: aVal;

		const bParsed = typeof bVal === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(bVal)
			? new Date(bVal).getTime()
			: bVal;

		if (aParsed > bParsed) return sortOrder;
		if (aParsed < bParsed) return -sortOrder;
		return 0;
	});

    // 1. Apply Global Search
	const globalSearch = filters.search as unknown as string;
	if (globalSearch) {
		filtered = filtered.filter((user) =>
			Object.values(user).some((val) =>
				String(val).toLowerCase().includes(globalSearch.toLowerCase())
			)
		);
	}

	// 4. Paginate
	const start = (page - 1) * pageSize;
	const paginated = filtered.slice(start, start + pageSize);

	return NextResponse.json({
		data: paginated,
		total: filtered.length,
		page,
		pageSize,
		totalPages: Math.ceil(filtered.length / pageSize),
	});
}
