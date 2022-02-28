import { render, screen } from '../../src/test-utils';
import Login from '../login';

test('Renders login form', async () => {
  render(<Login />);
  const username = screen.getByLabelText(/username/i);
  const password = screen.getByLabelText(/password/i);
  const submit = screen.getByText(/sign in$/i);

  expect(username).toHaveAttribute('name', 'username');
  expect(username).toHaveAttribute('required');
  expect(password).toHaveAttribute('name', 'password');
  expect(password).toHaveAttribute('required');
});

test('Renders login form with error', async () => {
  render(<Login errors={true} />);
  const username = screen.getByLabelText(/username/i);
  const password = screen.getByLabelText(/password/i);
  const submit = screen.getByText(/sign in$/i);

  expect(username).toHaveAttribute('name', 'username');
  expect(username).toHaveAttribute('required');
  expect(password).toHaveAttribute('name', 'password');
  expect(password).toHaveAttribute('required');

  const alert = screen.getAllByRole('alert');
});
