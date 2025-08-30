import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { ThemeProvider } from '../contexts/ThemeContext';
import authService from '../services/authService';

jest.mock('../services/authService');

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('App Component Tests', () => {
  beforeEach(() => {
    authService.getCurrentUser.mockReturnValue(null);
    authService.isAuthenticated.mockReturnValue(false);
    authService.logout.mockClear();
  });

  test('renders login form when not authenticated', async () => {
    renderWithTheme(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    });
  });

  test('renders dashboard when authenticated', async () => {
    const mockUser = { id: 1, username: 'testuser', role: 'USER' };
    authService.getCurrentUser.mockReturnValue(mockUser);
    authService.isAuthenticated.mockReturnValue(true);

    renderWithTheme(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
    });
  });

  test('switches between login and register', async () => {
    renderWithTheme(<App />);
    
    await waitFor(() => {
      const createAccountBtn = screen.getByText('Create Account');
      fireEvent.click(createAccountBtn);
      expect(screen.getByText('Join NotesApp')).toBeInTheDocument();
    });
  });

  test('shows admin tabs for admin users', async () => {
    const mockAdmin = { id: 1, username: 'admin', role: 'ADMIN' };
    authService.getCurrentUser.mockReturnValue(mockAdmin);
    authService.isAuthenticated.mockReturnValue(true);

    renderWithTheme(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Admin Panel')).toBeInTheDocument();
      expect(screen.getByText('Users')).toBeInTheDocument();
    });
  });
});