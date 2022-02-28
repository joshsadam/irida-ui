import React from 'react';
import { render } from '@testing-library/react';
import Login from '../login';

test('Renders login form', async () => {
  const { getByLabelText, getByText } = render(<Login />);
  const submit = getByText(/sign in/i);
});
