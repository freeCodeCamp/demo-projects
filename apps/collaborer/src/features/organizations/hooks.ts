import { useCallback, useEffect, useState } from 'react';
import {
  getStoredOrganizationId,
  setStoredOrganizationId
} from '../../lib/organizations/current-org.js';
import { useSession } from '../../lib/auth/session.js';
import { organizationsApi } from './api.js';
import type { Organization, OrganizationRole } from './types.js';

export type OrganizationsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'empty'; refresh: () => void }
  | {
      status: 'ready';
      organizations: Organization[];
      current: Organization;
      setCurrent: (id: number) => void;
      refresh: () => void;
    };

// Shared by every org-scoped page: which organization is "active" client-side
// (persisted in localStorage, since the backend has no notion of a "current"
// org — every request is explicitly scoped by :organizationId in the URL).
export function useOrganizations(): OrganizationsState {
  const [organizations, setOrganizations] = useState<Organization[] | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    organizationsApi
      .listMine()
      .then(orgs => {
        if (cancelled) return;
        setOrganizations(orgs);
        setCurrentId(prev => {
          if (prev !== null && orgs.some(org => org.id === prev)) return prev;
          const stored = getStoredOrganizationId();
          return orgs.find(org => org.id === stored)?.id ?? orgs[0]?.id ?? null;
        });
      })
      .catch(err => {
        if (!cancelled)
          setError(
            err instanceof Error ? err.message : 'Failed to load organizations.'
          );
      });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const setCurrent = useCallback((id: number) => {
    setStoredOrganizationId(id);
    setCurrentId(id);
  }, []);

  const refresh = useCallback(() => setReloadToken(n => n + 1), []);

  if (error) return { status: 'error', message: error };
  if (!organizations) return { status: 'loading' };
  if (organizations.length === 0) return { status: 'empty', refresh };

  const current =
    organizations.find(org => org.id === currentId) ?? organizations[0]!;

  return { status: 'ready', organizations, current, setCurrent, refresh };
}

// The org-members list is the only place a role is ever exposed (the org list
// endpoint itself doesn't carry it) — pages that need to gate an action on
// "am I this org's admin/owner" derive it from there, same as MembersPage does.
export function useMyOrganizationRole(
  organizationId: number | null
): OrganizationRole | null {
  const session = useSession();
  const [role, setRole] = useState<OrganizationRole | null>(null);

  const userId = session.status === 'authenticated' ? session.user.id : null;

  useEffect(() => {
    if (organizationId === null || userId === null) return;
    let cancelled = false;

    organizationsApi
      .listMembers(organizationId)
      .then(result => {
        if (cancelled) return;
        setRole(
          result.data.find(member => member.user_id === userId)?.role ?? null
        );
      })
      .catch(() => {
        if (!cancelled) setRole(null);
      });

    return () => {
      cancelled = true;
    };
  }, [organizationId, userId]);

  return role;
}
