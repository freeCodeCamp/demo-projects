import './form.css';
import { useEffect, type ReactNode } from 'react';

const AUTO_DISMISS_MS = 4000;

type AlertProps = {
  variant: 'error' | 'success';
  children: ReactNode;
  // Only pass this for a transient banner shown alongside content that stays
  // on screen (e.g. "Saved." next to a form) — never for a message that's the
  // only thing left to show the user (e.g. a password-reset confirmation).
  onDismiss?: () => void;
};

// Callers should render this unconditionally (never `{error && <Alert>...}`) and
// pass a possibly-empty `children` instead. A live-region container that is only
// mounted once it already has content does not get announced by screen readers —
// the container has to exist first, then get populated. With no children, this
// renders an empty, unstyled (so visually invisible) node that still carries the
// role, ready to be announced the moment content lands in it.
export function Alert({ variant, children, onDismiss }: AlertProps) {
  useEffect(() => {
    if (!onDismiss || !children) return;
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [onDismiss, children]);

  return (
    <div
      className={children ? `alert alert-${variant}` : undefined}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      {children}
    </div>
  );
}
