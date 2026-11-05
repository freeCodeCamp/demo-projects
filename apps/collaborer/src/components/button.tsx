import './button.css';
import type { MouseEventHandler, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'link';
type ButtonSize = 'lg';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler;
  children: ReactNode;
  // For repeated actions whose visible text is generic across rows (e.g. a
  // "Remove" button in every row of a list) — gives each one a distinct
  // accessible name. Must contain the visible text (SC 2.5.3 Label in Name).
  'aria-label'?: string;
};

export function Button({
  variant = 'secondary',
  size,
  href,
  type = 'button',
  disabled = false,
  onClick,
  children,
  'aria-label': ariaLabel
}: ButtonProps) {
  const className = size
    ? `btn btn-${variant} btn-${size}`
    : `btn btn-${variant}`;

  if (href) {
    // Keep `href` present (rather than stripping it) so the link stays
    // focusable and keeps its link semantics when disabled; block activation
    // instead. A keyboard Enter on a link dispatches a click event just like
    // a pointer click, so preventing default here covers both input modes.
    return (
      <a
        href={href}
        className={className}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        onClick={event => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={className}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
}
