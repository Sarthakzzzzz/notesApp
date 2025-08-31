import React, { createContext, useContext } from 'react';

const I18nContext = createContext();

const translations = {
  // App
  'NotesApp': 'NotesApp',
  
  // Navigation
  'Dashboard': 'Dashboard',
  'Notes': 'Notes', 
  'Profile': 'Profile',
  'Settings': 'Settings',
  'Admin Panel': 'Admin Panel',
  'System Status': 'System Status',
  'Test Operations': 'Test Operations',
  'Users': 'Users',
  'Logout': 'Logout',
  
  // Common
  'Loading...': 'Loading...',
  'Save': 'Save',
  'Cancel': 'Cancel',
  'Delete': 'Delete',
  'Edit': 'Edit',
  'Create': 'Create',
  'Update': 'Update',
  'Search': 'Search',
  'Filter': 'Filter',
  'All': 'All',
  'Active': 'Active',
  'Inactive': 'Inactive',
  'Refresh': 'Refresh',
  
  // Auth
  'Login': 'Login',
  'Register': 'Register',
  'Username': 'Username',
  'Password': 'Password',
  'Email': 'Email',
  'Role': 'Role',
  'User': 'User',
  'Admin': 'Admin',
  'Create Account': 'Create Account',
  'Creating Account...': 'Creating Account...',
  'Sign In': 'Sign In',
  'Signing In...': 'Signing In...',
  
  // Dashboard
  'Welcome': 'Welcome',
  'Create Your First Note': 'Create Your First Note',
  'Getting Started': 'Getting Started',
  'Create Notes': 'Create Notes',
  'Organize': 'Organize',
  'Edit & Update': 'Edit & Update',
  'Stay Synced': 'Stay Synced',
  'Secure & Private': 'Secure & Private',
  'Lightning Fast': 'Lightning Fast',
  'Responsive Design': 'Responsive Design',
  
  // Notes
  'Title': 'Title',
  'Content': 'Content',
  'New Note': 'New Note',
  'Edit Note': 'Edit Note',
  'No notes found': 'No notes found',
  'Create Note': 'Create Note',
  'Save Note': 'Save Note',
  
  // Profile
  'Update Profile': 'Update Profile',
  'Change Password': 'Change Password',
  'Delete Account': 'Delete Account',
  
  // Admin
  'All Users': 'All Users',
  'Manage system users': 'Manage system users',
  'Access denied. Admin only.': 'Access denied. Admin only.',
  'ID': 'ID',
  'Actions': 'Actions',
  
  // Test Operations
  'API Operations Test': 'API Operations Test',
  'Run All Tests': 'Run All Tests',
  'Running Tests...': 'Running Tests...',
  'Test Results:': 'Test Results:',
  
  // Footer
  'NotesApp - Your Digital Notebook': 'NotesApp - Your Digital Notebook',
  
  // Access Control
  'Access Denied': 'Access Denied',
  'Please log in to access this page.': 'Please log in to access this page.',
  'You don\'t have permission to access this page.': 'You don\'t have permission to access this page.',
  
  // Settings
  'Theme': 'Theme',
  'Light': 'Light',
  'Dark': 'Dark',
  'Notifications': 'Notifications',
  'Language': 'Language',
  'Privacy': 'Privacy',
  'Security': 'Security',
  
  // System Status
  'System Status': 'System Status',
  'Monitor system health and API endpoints': 'Monitor system health and API endpoints',
  'Refresh Status': 'Refresh Status',
  'Current User Info': 'Current User Info',
  
  // Home
  'Welcome to NotesApp': 'Welcome to NotesApp',
  'Your thoughts, organized beautifully': 'Your thoughts, organized beautifully',
  'Get Started': 'Get Started',
  'Learn More': 'Learn More',
  'Features': 'Features',
  'About': 'About'
};

export const I18nProvider = ({ children }) => {
  const t = (key) => translations[key] || key;
  
  return (
    <I18nContext.Provider value={{ t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
};

export const t = (key) => translations[key] || key;