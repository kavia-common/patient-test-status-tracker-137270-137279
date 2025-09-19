import { render, screen, fireEvent } from '@testing-library/react';
import PatientsTable from './PatientsTable';

test('renders patients and supports actions', () => {
  const patients = [
    { id: '1', name: 'Test A', age: 30, testType: 'CBC', status: 'Pending', updatedAt: 'now' },
    { id: '2', name: 'Test B', age: 31, testType: 'PCR', status: 'Flagged', updatedAt: 'now' }
  ];
  const onFlag = jest.fn();
  const onUnflag = jest.fn();
  const onRefresh = jest.fn();

  render(<PatientsTable patients={patients} onFlag={onFlag} onUnflag={onUnflag} onRefresh={onRefresh} />);

  expect(screen.getByText(/Patients/)).toBeInTheDocument();
  expect(screen.getAllByRole('row').length).toBeGreaterThan(1);

  fireEvent.click(screen.getByText('↻ Refresh'));
  expect(onRefresh).toHaveBeenCalled();

  fireEvent.click(screen.getByText('Flag'));
  expect(onFlag).toHaveBeenCalled();

  fireEvent.click(screen.getByText('Unflag'));
  expect(onUnflag).toHaveBeenCalled();
});
