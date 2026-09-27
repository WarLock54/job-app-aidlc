/**
 * ⚠️ MOCK AUTH SERVICE — NOT PRODUCTION READY.
 * Herhangi bir email/şifre kombinasyonunu kabul eder, sunucu tarafı
 * doğrulama/token yoktur, oturum localStorage'da tutulur.
 * Gerçek kullanıcı verisi işlenmeden önce bkz. aidlc-docs/SECURITY_POLICY.md.
 */
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