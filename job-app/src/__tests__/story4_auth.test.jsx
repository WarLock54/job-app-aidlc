import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderAt = (path) => {
  window.location.hash = `#${path}`;
  return render(<App />);
};

// The email/password labels are not linked to their inputs, so inputs are queried by type.
const submitCredentials = async (user, email, password) => {
  await user.type(screen.getByRole('textbox'), email);
  await user.type(document.querySelector('input[type="password"]'), password);
  await user.click(screen.getByRole('button', { name: /authenticate/i }));
};

describe('Story 4: User Authentication', () => {
  it('TC-4.1: valid login logs the user in and redirects to the home page', async () => {
    const user = userEvent.setup();
    renderAt('/auth');

    await submitCredentials(user, 'applicant@example.com', 'secret123');

    expect(screen.getByText(/welcome, applicant@example\.com/i)).toBeInTheDocument();
    expect(window.location.hash).toBe('#/');
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('TC-4.2: registering with a valid email and password creates the account and logs in', async () => {
    const user = userEvent.setup();
    renderAt('/auth');

    await submitCredentials(user, 'new.user@example.com', 'newpass123');

    expect(screen.getByText(/welcome, new\.user@example\.com/i)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('user'))).toMatchObject({ email: 'new.user@example.com' });
  });

  it('TC-4.3: logout ends the session and the user becomes a guest', async () => {
    const user = userEvent.setup();
    localStorage.setItem('user', JSON.stringify({ email: 'applicant@example.com', role: 'Applicant' }));
    renderAt('/');
    expect(await screen.findByText(/welcome, applicant@example\.com/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /logout/i }));

    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login \/ register/i })).toBeInTheDocument();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
