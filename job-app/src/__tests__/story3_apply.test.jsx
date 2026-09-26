import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { jobsData } from '../services/mockData';

const renderAt = (path) => {
  window.location.hash = `#${path}`;
  return render(<App />);
};

const loginAs = (email) =>
  localStorage.setItem('user', JSON.stringify({ email, role: 'Applicant' }));

describe('Story 3: Applying for a Job', () => {
  it('TC-3.1: logged-in applicant clicking Apply sees an application form', async () => {
    const user = userEvent.setup();
    loginAs('applicant@example.com');
    renderAt(`/job/${jobsData[0].id}`);

    await user.click(screen.getByRole('button', { name: /apply/i }));

    expect(document.querySelector('form'), 'application form should be shown').not.toBeNull();
  });

  it('TC-3.2: submitting the filled application form shows a success message', async () => {
    const user = userEvent.setup();
    loginAs('applicant@example.com');
    renderAt(`/job/${jobsData[0].id}`);

    await user.click(screen.getByRole('button', { name: /apply/i }));
    const form = document.querySelector('form');
    expect(form, 'application form should be shown').not.toBeNull();
    for (const field of within(form).queryAllByRole('textbox')) {
      await user.type(field, 'Test input');
    }
    await user.click(within(form).getByRole('button', { name: /submit|apply/i }));

    expect(screen.getByText(/success/i)).toBeInTheDocument();
  });

  it('TC-3.3: guest clicking Apply is prompted to log in or register', async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    renderAt(`/job/${jobsData[0].id}`);

    await user.click(screen.getByRole('button', { name: /apply/i }));

    expect(alertSpy).toHaveBeenCalledWith(expect.stringMatching(/login/i));
    expect(window.location.hash).toBe('#/auth');
    expect(screen.getByRole('heading', { name: /login \/ register/i })).toBeInTheDocument();
  });
});
