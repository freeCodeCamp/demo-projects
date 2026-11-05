const STORAGE_KEY = 'currentOrganizationId';

export function getStoredOrganizationId(): number | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored ? Number(stored) : null;
}

export function setStoredOrganizationId(id: number): void {
  window.localStorage.setItem(STORAGE_KEY, String(id));
}
