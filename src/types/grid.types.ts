export enum ColumnEnum {
	ID = 'id',
	NAME = 'name',
	ROLE = 'role',
	DEPARTMENT = 'department',
	SALARY = 'salary',
	JOIN_DATE = 'joinDate',
	STATUS = 'status',
	AVATAR = 'avatar',
    EMAIL="email"
}

export interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	department: string;
	salary: number;
	joinDate: string;
	status: 'active' | 'inactive';
	avatar?: string;
}

export interface Column {
	field: string;
	headerName: string;
	width?: number;
	type?: 'text' | 'number' | 'date' | 'select';
	sortable?: boolean;
	filterable?: boolean;
	editable?: boolean;
	pinned?: 'left' | 'right' | null;
	visible?: boolean;
	order?: number;
	resizable?: boolean;
	frozen?: boolean;
	group?: string | null;
	render?: (value: any, row: any) => React.ReactNode;
}

export interface PaginationState {
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
}

export interface SortModel {
	field: string;
	sort: 'asc' | 'desc';
}

export interface FilterValue {
	type: 'text' | 'number' | 'date' | 'select';
	value: string;
}

export interface GridState {
	data: User[];
	columns: Column[];
	visibleColumns: string[];
	pinnedColumns: { left: string[]; right: string[] };
	sortModel: SortModel[];
	filterModelSearch: Record<string, FilterValue>;
	filterModel: Record<string, any>;
	selectedRows: Set<string>;
	pagination: PaginationState;
	loading: boolean;
	error: string | null;
}

export interface PinnedColumns {
	left: string[];
	right: string[];
}
