export type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'theme';

const THEME_CLASS: Record<Theme, string> = {
  dark: 'dark-palette',
  light: 'light-palette'
};

export function getStoredTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === 'light' ? 'light' : 'dark';
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.body.classList.remove(THEME_CLASS.dark, THEME_CLASS.light);
  document.body.classList.add(THEME_CLASS[theme]);
}
