import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobBoard from './components/JobBoard';
import JobDetails from './components/JobDetails';
import Auth from './components/Auth';
import { authService } from './services/authService';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/"><i className="bi bi-briefcase-fill me-2"></i>AI-DLC Job Portal</Link>
          <div className="d-flex">
            {user ? (
              <div className="text-white d-flex align-items-center">
                <span className="me-3">Welcome, {user.email}</span>
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <Link className="btn btn-primary btn-sm" to="/auth">Login / Register</Link>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<JobBoard />} />
        <Route path="/job/:id" element={<JobDetails user={user} />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} />
      </Routes>
    </Router>
  );
}