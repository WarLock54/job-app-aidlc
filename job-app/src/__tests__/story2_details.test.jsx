import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { jobsData } from '../services/mockData';

const renderAt = (path) => {
  window.location.hash = `#${path}`;
  return render(<App />);
};

describe('Story 2: Viewing Job Details', () => {
  it('TC-2.1: clicking a job title navigates to the dedicated job page', async () => {
    const user = userEvent.setup();
    const job = jobsData[0];
    renderAt('/');

    await user.click(screen.getAllByText(job.title)[0]);

    expect(window.location.hash).toBe(`#/job/${job.id}`);
    expect(screen.getByRole('heading', { level: 2, name: job.title })).toBeInTheDocument();
  });

  it('TC-2.2: job page shows title, company, location, description and an Apply button', () => {
    const job = jobsData[0];
    renderAt(`/job/${job.id}`);

    expect(screen.getByRole('heading', { level: 2, name: job.title })).toBeInTheDocument();
    const meta = screen.getByRole('heading', { level: 4 });
    expect(meta).toHaveTextContent(job.company);
    expect(meta).toHaveTextContent(job.location);
    expect(screen.getByText(job.description)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
  });
});
