import { DataGridProvider } from '@/contexts/DataGridContext';
import ColumnVisibilityToggle from '../features/ColumnVisibilityToggle';
import DataGrid from './DataGrid';
import GlobalSearch from './GlobalSearch';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DataGridExport from './DataGridExport';

const DataGridWrapper = () => {
  return (
    <DndProvider backend={HTML5Backend}>
   <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">User DataGrid</h2>
        <ColumnVisibilityToggle />
      </div>
      <div className='flex items-center justify-between'>
        <GlobalSearch />
        <DataGridExport/>
      </div>
        <DataGrid />
    </div>
    </DndProvider>
 
  );
};

export default DataGridWrapper