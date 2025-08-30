export const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;
    // Add 5 minute buffer to prevent edge cases
    return Date.now() >= (decoded.exp * 1000) - (5 * 60 * 1000);
  } catch (error) {
    return true;
  }
};

export const getUserFromToken = (token) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded) return null;
    return {
      username: decoded.sub,
      role: decoded.role,
      userId: decoded.userId
    };
  } catch (error) {
    return null;
  }
};