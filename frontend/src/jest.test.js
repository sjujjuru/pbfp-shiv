import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogoutPage from './LogoutPage/LogoutPage';

describe('LogoutPage component', () => {
  test('calls onLogout when the button is clicked', () => {
    // Create a mock function for onLogout
    const mockLogoutHandler = jest.fn();

    render(<LogoutPage onLogout={mockLogoutHandler} />);

    // Find the button and simulate a click
    fireEvent.click(screen.getByText(/logout/i));

    // Check if the onLogout function was called
    expect(mockLogoutHandler).toHaveBeenCalled();
  });
});