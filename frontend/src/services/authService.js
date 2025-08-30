import { authAPI, setToken } from './api';
import { getUserFromToken, isTokenExpired, isTokenNearExpiry } from '../utils/jwtUtils';

class AuthService {
  constructor() {
    this.initializeAuth();
  }

  initializeAuth() {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      setToken(token);
    } else if (token) {
      this.logout();
    }
  }

  async login(credentials) {
    try {
      const response = await authAPI.login(credentials);
      const { accessToken, id, username, email, role } = response.data;
      
      this.setAuthData(accessToken, { id, username, email, role });
      return { id, username, email, role, token: accessToken };
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  async register(userData) {
    try {
      const response = await authAPI.register(userData);
      return response.data;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  }

  setAuthData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('role', user.role);
    setToken(token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setToken('');
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    
    if (isTokenExpired(token)) {
      this.logout();
      return null;
    }

    return {
      id: localStorage.getItem('userId'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      role: localStorage.getItem('role'),
      token
    };
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return token && !isTokenExpired(token);
  }

  hasRole(role) {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;