import { useEffect, useState } from 'react';
import { apiFetch } from '../api/client.js';
import type { PublicUser } from '../../features/auth/types.js';

export type SessionState =
  | { status: 'loading' }
  | { status: 'authenticated'; user: PublicUser }
  | { status: 'unauthenticated' };

// Used by every authenticated page to gate content and get the current user —
// deliberately depends only on lib/api, not features/auth/api, to keep lib/
// from depending on features/.
export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    apiFetch<{ data: PublicUser }>('/users/me')
      .then(({ data }) => {
        if (!cancelled) setState({ status: 'authenticated', user: data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'unauthenticated' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
