import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'remix';
import { Project } from '~/types';
import { formatTimeStamp } from '../utils/date-utils';

type ProjectsTableProps = {
  projects: Project[];
};

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    renderCell: ({ row }) => {
      return <Link to={`/projects/${row.id}`}>{row.name}</Link>;
    },
  },
  {
    field: 'projectDescription',
    description: 'General information about the project.',
    headerName: 'Description',
    width: 400,
  },
  {
    field: 'createdDate',
    description: 'Date the project was created',
    headerName: 'Created',
    type: 'dateTime',
    width: 200,
    valueGetter: ({ value }) => value && new Date(value),
    renderCell: ({ value }) => value && formatTimeStamp(value),
  },
  {
    field: 'modifiedDate',
    description: 'Date the project was most recently modified',
    headerName: 'Modified',
    type: 'dateTime',
    width: 200,
    valueGetter: ({ value }) => value && new Date(value),
    renderCell: ({ value }) => value && formatTimeStamp(value),
  },
];

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={projects}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </div>
  );
}
