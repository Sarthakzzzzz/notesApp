import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import NoteModal from '../components/NoteModal';

describe('Component Tests', () => {
  
  test('Login component renders correctly', () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} />);
    
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  test('Login form validation works', () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} />);
    
    const submitBtn = screen.getByText('Sign In');
    fireEvent.click(submitBtn);
    
    // Form should not submit without required fields
    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  test('Register component renders correctly', () => {
    render(<Register />);
    
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  test('NoteModal renders for new note', () => {
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();
    
    render(<NoteModal note={null} onSave={mockOnSave} onClose={mockOnClose} />);
    
    expect(screen.getByText('Create New Note')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Content')).toBeInTheDocument();
  });

  test('NoteModal renders for editing note', () => {
    const mockNote = { id: 1, title: 'Test Note', content: 'Test Content' };
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();
    
    render(<NoteModal note={mockNote} onSave={mockOnSave} onClose={mockOnClose} />);
    
    expect(screen.getByText('Edit Note')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Note')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Content')).toBeInTheDocument();
  });

  test('NoteModal close button works', () => {
    const mockOnSave = jest.fn();
    const mockOnClose = jest.fn();
    
    render(<NoteModal note={null} onSave={mockOnSave} onClose={mockOnClose} />);
    
    const closeBtn = screen.getByText('×');
    fireEvent.click(closeBtn);
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});