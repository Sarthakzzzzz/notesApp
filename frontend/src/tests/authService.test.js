import authService from '../services/authService';
import { authAPI } from '../services/api';

jest.mock('../services/api');

describe('AuthService Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('login stores user data correctly', async () => {
    const mockResponse = {
      data: {
        accessToken: 'test-token',
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
        role: 'USER'
      }
    };
    
    authAPI.login.mockResolvedValue(mockResponse);
    
    const result = await authService.login({ username: 'testuser', password: 'password' });
    
    expect(localStorage.getItem('token')).toBe('test-token');
    expect(localStorage.getItem('username')).toBe('testuser');
    expect(result.username).toBe('testuser');
  });

  test('logout clears all data', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('username', 'testuser');
    
    authService.logout();
    
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
  });

  test('getCurrentUser returns null when no token', () => {
    const user = authService.getCurrentUser();
    expect(user).toBeNull();
  });

  test('isAuthenticated returns false when no token', () => {
    const isAuth = authService.isAuthenticated();
    expect(isAuth).toBe(false);
  });
});