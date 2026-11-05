import './nav.css';
import { useEffect, useState } from 'react';
import { getStoredTheme, setTheme, type Theme } from '../lib/utils/theme.js';
import { Button } from './button';

type NavProps = {
  brand: string;
};

export function Nav({ brand }: NavProps) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    setThemeState(getStoredTheme());
  }, []);

  function handleToggleTheme() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeState(next);
  }

  return (
    <>
      <a href='#main-content' className='skip-link'>
        Skip to main content
      </a>

      <nav aria-label='Main' className='nav'>
        <div className='nav-start'>
          <a href='/' className='brand'>
            {brand}
          </a>
        </div>

        <div className='nav-actions'>
          <Button variant='secondary' onClick={handleToggleTheme}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </Button>

          <span className='nav-divider' aria-hidden='true'></span>

          <Button variant='secondary' href='/login'>
            Log in
          </Button>

          <Button variant='primary' href='/register'>
            Sign up
          </Button>
        </div>
      </nav>
    </>
  );
}
