import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { Nav } from './nav.js';

describe(Nav, () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.className = 'dark-palette';
  });

  it('persists and applies a theme change', async () => {
    const user = userEvent.setup();
    render(<Nav brand='Test curriculum' />);

    await user.click(screen.getByRole('button', { name: 'Light mode' }));

    expect({
      bodyClass: document.body.className,
      storedTheme: localStorage.getItem('theme'),
      toggleLabel: screen.getByRole('button', { name: 'Dark mode' }).textContent
    }).toEqual({
      bodyClass: 'light-palette',
      storedTheme: 'light',
      toggleLabel: 'Dark mode'
    });
  });
});
