import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button.js';

describe(Button, () => {
  it('does not respond when disabled', async () => {
    const handleClick = vi.fn<() => void>();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={handleClick}>
        Continue
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Continue' });
    await user.click(button);

    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(handleClick).not.toHaveBeenCalled();
  });
});
