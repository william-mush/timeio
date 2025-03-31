import { render, screen, fireEvent, act } from '@testing-library/react'
import { AlarmManager } from '../Alarm'
import { ALARM_SOUNDS } from '@/services/AlarmSound'

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('AlarmManager', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    mockLocalStorage.clear.mockClear();
    mockLocalStorage.getItem.mockClear();
    mockLocalStorage.setItem.mockClear();
  })

  it('renders the alarm manager with no alarms initially', () => {
    render(<AlarmManager />)
    
    expect(screen.getByText('My Alarms')).toBeInTheDocument()
    expect(screen.getByText('No alarms set. Click "New Alarm" to create one.')).toBeInTheDocument()
  })

  it('opens the new alarm form when clicking the New Alarm button', () => {
    render(<AlarmManager />)
    
    const newAlarmButton = screen.getByText('+ New Alarm')
    fireEvent.click(newAlarmButton)
    
    expect(screen.getByText('Set Alarm Time')).toBeInTheDocument()
  })

  it('validates alarm form inputs correctly', async () => {
    render(<AlarmManager />)
    
    // Open the new alarm form
    fireEvent.click(screen.getByText('+ New Alarm'))
    
    // Try to submit with invalid hours
    const hoursInput = screen.getByLabelText('Hour (24-hour format)')
    fireEvent.change(hoursInput, { target: { value: '24' } })
    
    // The error should appear immediately on change
    expect(screen.getByRole('alert')).toHaveTextContent('Hours must be between 0 and 23')
  })

  it('creates a new alarm successfully', async () => {
    render(<AlarmManager />)
    
    // Open the new alarm form
    fireEvent.click(screen.getByText('+ New Alarm'))
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Hour (24-hour format)'), { target: { value: '7' } })
    fireEvent.change(screen.getByLabelText('Minutes'), { target: { value: '30' } })
    fireEvent.change(screen.getByLabelText('Alarm Label'), { target: { value: 'Test Alarm' } })
    
    // Submit the form
    fireEvent.click(screen.getByText('Add Alarm'))
    
    // Check if the alarm was added
    expect(screen.getByText('Test Alarm')).toBeInTheDocument()
    expect(screen.getByText('07:30')).toBeInTheDocument()
  })

  it('toggles alarm state correctly', async () => {
    render(<AlarmManager />)
    
    // Create an alarm first
    fireEvent.click(screen.getByText('+ New Alarm'))
    fireEvent.change(screen.getByLabelText('Hour (24-hour format)'), { target: { value: '7' } })
    fireEvent.change(screen.getByLabelText('Minutes'), { target: { value: '30' } })
    fireEvent.click(screen.getByText('Add Alarm'))
    
    // Find and click the toggle button using the new aria-label
    const toggleButton = screen.getByRole('switch')
    expect(toggleButton).toHaveAttribute('aria-checked', 'true')
    
    fireEvent.click(toggleButton)
    
    // Check if the alarm was disabled
    expect(toggleButton).toHaveAttribute('aria-checked', 'false')
  })

  it('deletes an alarm correctly', async () => {
    render(<AlarmManager />)
    
    // Create an alarm first
    fireEvent.click(screen.getByText('+ New Alarm'))
    fireEvent.change(screen.getByLabelText('Hour (24-hour format)'), { target: { value: '7' } })
    fireEvent.change(screen.getByLabelText('Minutes'), { target: { value: '30' } })
    fireEvent.click(screen.getByText('Add Alarm'))
    
    // Find and click the delete button
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)
    
    // Check if the alarm was removed
    expect(screen.queryByText('07:30')).not.toBeInTheDocument()
  })

  it('saves alarms to localStorage', async () => {
    render(<AlarmManager />)
    
    // Create an alarm
    fireEvent.click(screen.getByText('+ New Alarm'))
    fireEvent.change(screen.getByLabelText('Hour (24-hour format)'), { target: { value: '7' } })
    fireEvent.change(screen.getByLabelText('Minutes'), { target: { value: '30' } })
    fireEvent.click(screen.getByText('Add Alarm'))
    
    // Check if localStorage.setItem was called with the correct arguments
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'alarms_test@example.com',
      expect.any(String)
    )
  })
}) 