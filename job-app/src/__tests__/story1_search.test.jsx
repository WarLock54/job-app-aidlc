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

const jobCards = () => Array.from(document.querySelectorAll('.job-card'));

describe('Story 1: Job Search and Filtering', () => {
  it('TC-1.1: keyword search shows only jobs matching the keyword', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const keyword = 'Cloud';

    await user.type(screen.getByPlaceholderText(/search/i), keyword);

    const expected = jobsData.filter(
      (j) => j.title.includes(keyword) || j.company.includes(keyword)
    );
    const cards = jobCards();
    expect(expected.length).toBeGreaterThan(0);
    expect(cards).toHaveLength(expected.length);
    cards.forEach((card) => expect(card.textContent.toLowerCase()).toContain(keyword.toLowerCase()));
  });

  it('TC-1.2: category filter shows only jobs in that category', async () => {
    const user = userEvent.setup();
    renderAt('/');

    await user.selectOptions(screen.getByRole('combobox'), 'Data');

    const expected = jobsData.filter((j) => j.category === 'Data');
    const cards = jobCards();
    expect(cards).toHaveLength(expected.length);
    cards.forEach((card) => expect(card.querySelector('.badge')).toHaveTextContent('Data'));
  });

  it('TC-1.3: a search with no results shows a friendly message', async () => {
    const user = userEvent.setup();
    renderAt('/');

    await user.type(screen.getByPlaceholderText(/search/i), 'zzz-no-such-job');

    expect(jobCards()).toHaveLength(0);
    expect(screen.getByText(/no jobs found/i)).toBeInTheDocument();
  });
});
