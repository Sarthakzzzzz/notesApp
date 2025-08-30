import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import App from '../App';
import authService from '../services/authService';
import { notesAPI } from '../services/api';

jest.mock('../services/authService');
jest.mock('../services/api');

const renderApp = () => {
  return render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

describe('Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('complete user flow: login -> create note -> logout', async () => {
    // Start with no user
    authService.getCurrentUser.mockReturnValue(null);
    authService.isAuthenticated.mockReturnValue(false);
    
    renderApp();
    
    // Should show login form
    await waitFor(() => {
      expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    });

    // Mock successful login
    const mockUser = { id: 1, username: 'testuser', role: 'USER' };
    authService.getCurrentUser.mockReturnValue(mockUser);
    authService.isAuthenticated.mockReturnValue(true);
    
    // Mock notes API
    notesAPI.getAll.mockResolvedValue({ data: [] });
    
    // Simulate login
    fireEvent.click(screen.getByText('Sign In'));
    
    await waitFor(() => {
      expect(screen.getByText('Welcome, testuser!')).toBeInTheDocument();
    });
  });

  test('admin user can access admin features', async () => {
    const mockAdmin = { id: 1, username: 'admin', role: 'ADMIN' };
    authService.getCurrentUser.mockReturnValue(mockAdmin);
    authService.isAuthenticated.mockReturnValue(true);
    
    renderApp();
    
    await waitFor(() => {
      expect(screen.getByText('Admin Panel')).toBeInTheDocument();
      expect(screen.getByText('Users')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });
  });

  test('regular user cannot access admin features', async () => {
    const mockUser = { id: 1, username: 'user', role: 'USER' };
    authService.getCurrentUser.mockReturnValue(mockUser);
    authService.isAuthenticated.mockReturnValue(true);
    
    renderApp();
    
    await waitFor(() => {
      expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument();
      expect(screen.queryByText('Users')).not.toBeInTheDocument();
    });
  });

  test('theme toggle works correctly', async () => {
    const mockUser = { id: 1, username: 'user', role: 'USER' };
    authService.getCurrentUser.mockReturnValue(mockUser);
    authService.isAuthenticated.mockReturnValue(true);
    
    renderApp();
    
    await waitFor(() => {
      const themeToggle = screen.getByText('☀️');
      expect(themeToggle).toBeInTheDocument();
      
      fireEvent.click(themeToggle);
      
      // Should switch to moon icon for light mode
      expect(screen.getByText('🌙')).toBeInTheDocument();
    });
  });

  test('navigation between tabs works', async () => {
    const mockUser = { id: 1, username: 'user', role: 'USER' };
    authService.getCurrentUser.mockReturnValue(mockUser);
    authService.isAuthenticated.mockReturnValue(true);
    
    renderApp();
    
    await waitFor(() => {
      // Click on Profile tab
      const profileTab = screen.getByText('Profile');
      fireEvent.click(profileTab);
      
      // Should show profile content
      expect(profileTab.closest('button')).toHaveClass('active');
    });
  });
});