import './sidebar.css';
import { useEffect, useState, type SubmitEvent } from 'react';
import { authApi } from '../features/auth/api.js';
import { useOrganizations } from '../features/organizations/hooks.js';
import { useSession } from '../lib/auth/session.js';
import { getStoredTheme, setTheme, type Theme } from '../lib/utils/theme.js';
import { Button } from './button.js';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/projects', label: 'Projects' },
  { href: '/organization/members', label: 'Members' },
  { href: '/organization/settings', label: 'Settings' },
  { href: '/notifications', label: 'Notifications' }
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Read after mount, not during render — this component is server-rendered
  // first (client:load), and `window` doesn't exist at that point.
  const [pathname, setPathname] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setThemeState] = useState<Theme>('dark');
  const session = useSession();
  const orgState = useOrganizations();

  useEffect(() => {
    setPathname(window.location.pathname);
    setThemeState(getStoredTheme());
  }, []);

  async function handleLogout() {
    await authApi.logout();
    window.location.href = '/login';
  }

  function handleToggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeState(next);
  }

  function handleSearchSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    window.location.href = `/search?q=${encodeURIComponent(trimmed)}`;
  }

  return (
    <>
      <a href='#main-content' className='skip-link'>
        Skip to main content
      </a>

      <div className='sidebar-mobile-bar'>
        <button
          type='button'
          className='sidebar-toggle'
          aria-expanded={mobileOpen}
          aria-controls='sidebar'
          onClick={() => setMobileOpen(open => !open)}
        >
          <span aria-hidden='true'>☰</span>
          <span className='sr-only'>Toggle navigation</span>
        </button>
        <span className='sidebar-brand'>Collaborer</span>
      </div>

      <aside
        id='sidebar'
        className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}
        aria-label='Main'
      >
        <div className='sidebar-brand-row'>
          <a href='/dashboard' className='sidebar-brand'>
            Collaborer
          </a>
        </div>

        {orgState.status === 'ready' &&
          (orgState.organizations.length > 1 ? (
            <details className='org-switcher'>
              <summary>{orgState.current.name}</summary>
              <div className='org-switcher-menu'>
                {orgState.organizations
                  .filter(org => org.id !== orgState.current.id)
                  .map(org => (
                    <button
                      key={org.id}
                      type='button'
                      className='org-switcher-item'
                      onClick={() => orgState.setCurrent(org.id)}
                    >
                      {org.name}
                    </button>
                  ))}
              </div>
            </details>
          ) : (
            // Nothing to switch to with only one organization — a dropdown
            // that only ever shows the org you're already on reads as a
            // broken toggle, not a disabled feature.
            <p className='org-current'>{orgState.current.name}</p>
          ))}

        <form
          className='sidebar-search'
          role='search'
          onSubmit={handleSearchSubmit}
        >
          <label htmlFor='sidebar-search-input' className='sr-only'>
            Search projects and tasks
          </label>
          <input
            id='sidebar-search-input'
            type='search'
            className='sidebar-search-input'
            placeholder='Search…'
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
          />
        </form>

        <nav className='sidebar-nav' aria-label='Sections'>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`sidebar-link ${pathname === link.href ? 'sidebar-link-active' : ''}`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className='sidebar-footer'>
          {session.status === 'authenticated' && (
            <>
              <span className='sidebar-user'>{session.user.name}</span>
              <a href='/profile' className='sidebar-link'>
                Profile
              </a>
            </>
          )}
          <Button variant='secondary' onClick={handleToggleTheme}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </Button>
          <Button variant='secondary' onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </aside>
    </>
  );
}
