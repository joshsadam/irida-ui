import { render, screen } from '../../src/test-utils';
import Login from '../login';

test('Renders login form', async () => {
  render(<Login />);
  testBasicSetup();

  // Ensure that the error is not displayed
  const loginError = screen.queryByRole('alert');
  expect(loginError).toBeNull();
});

test('Renders login form with error', async () => {
  render(<Login errors={true} />);
  testBasicSetup();

  // Ensure that the error is displayed
  screen.getByRole('alert');
});

test('Login form submit button should be disabled when busy', async () => {
  render(<Login busy={true} />);
  testBasicSetup();

  const button = screen.getByText(/sign in$/i);
  expect(button).toBeDisabled();
});

function testBasicSetup() {
  const username = screen.getByLabelText(/username/i);
  const password = screen.getByLabelText(/password/i);
  screen.getByText(/sign in$/i);

  expect(username).toHaveAttribute('name', 'username');
  expect(username).toHaveAttribute('required');
  expect(password).toHaveAttribute('name', 'password');
  expect(password).toHaveAttribute('required');
}
