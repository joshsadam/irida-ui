import { render, screen } from '../../src/test-utils';
import ProjectsTable from '../projects-table';
import { Project } from '../../types';

const projects: Project[] = [
  {
    name: 'Project One',
    createdDate: '2022-02-07 21:37:26.0',
    modifiedDate: '2022-02-15 07:12:11.0',
    id: 1,
    projectDescription: 'A very interesting project',
    organism: 'E. coli',
  },
];

test('Renders the projects table with 5 projects', async () => {
  render(<ProjectsTable projects={projects} />);
  screen.getByText(/project one/i);

  // Following ensures that the date formatters are working properly
  screen.getByText(/2022-02-07, 9:37 p.m./);
});
