import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders patient tracker shell', () => {
  render(<App />);
  expect(screen.getByText(/Patient Tracker/i)).toBeInTheDocument();
  expect(screen.getByText(/Case List/i)).toBeInTheDocument();
});

test('clicking + Add opens Add Patient modal (stub)', () => {
  render(<App />);
  const addBtn = screen.getByRole('button', { name: /Add patient/i });
  fireEvent.click(addBtn);

  // Modal should appear
  expect(screen.getByRole('dialog', { name: /Add Patient/i })).toBeInTheDocument();

  // Close the modal via Cancel
  fireEvent.click(screen.getByRole('button', { name: /Cancel add/i }));
  // After closing, dialog should no longer be present
  // Note: Using queryByRole to avoid throwing
  expect(screen.queryByRole('dialog', { name: /Add Patient/i })).not.toBeInTheDocument();
});
