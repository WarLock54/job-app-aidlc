export const authService = {
  login: (email, password) => {
    const user = { email, role: 'Applicant' };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },
  logout: () => {
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};