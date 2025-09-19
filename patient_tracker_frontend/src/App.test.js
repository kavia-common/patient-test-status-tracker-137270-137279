import { render, screen } from '@testing-library/react';
import App from './App';

test('renders patient tracker shell', () => {
  render(<App />);
  expect(screen.getByText(/Patient Tracker/i)).toBeInTheDocument();
  expect(screen.getByText(/Case List/i)).toBeInTheDocument();
});
