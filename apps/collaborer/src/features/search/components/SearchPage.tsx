import { useCallback, useEffect, useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { TextField } from '../../../components/text-field.js';
import { formatEnumLabel } from '../../../lib/utils/format.js';
import { useSession } from '../../../lib/auth/session.js';
import { useOrganizations } from '../../organizations/hooks.js';
import { searchApi } from '../api.js';
import type { SearchResults } from '../types.js';

type SearchPageProps = {
  initialQuery: string;
};

export function SearchPage({ initialQuery }: SearchPageProps) {
  const session = useSession();
  const orgState = useOrganizations();
  const currentOrgId = orgState.status === 'ready' ? orgState.current.id : null;

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResults | null>(null);
  const [searching, setSearching] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const runSearch = useCallback((organizationId: number, term: string) => {
    setSearching(true);
    setLoadError(null);
    searchApi
      .search(organizationId, term)
      .then(setResults)
      .catch(err =>
        setLoadError(err instanceof Error ? err.message : 'Search failed.')
      )
      .finally(() => setSearching(false));
  }, []);

  useEffect(() => {
    if (currentOrgId !== null && initialQuery)
      runSearch(currentOrgId, initialQuery);
  }, [currentOrgId, initialQuery, runSearch]);

  if (session.status === 'loading' || orgState.status === 'loading') {
    return (
      <p className='loading-state' role='status'>
        Loading…
      </p>
    );
  }
  if (session.status === 'unauthenticated') {
    if (typeof window !== 'undefined') {
      const here = `${window.location.pathname}${window.location.search}`;
      window.location.href = `/login?redirect=${encodeURIComponent(here)}`;
    }
    return <></>;
  }
  if (orgState.status === 'error') {
    return (
      <p className='error-state' role='alert'>
        {orgState.message}
      </p>
    );
  }
  if (orgState.status === 'empty') {
    return (
      <p className='empty-state'>Create an organization first to search.</p>
    );
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || typeof window === 'undefined') return;
    // A full navigation (rather than fetching in place) so a search is
    // shareable/bookmarkable via the URL, matching every other list view in
    // this app — there's no client-side router here.
    window.location.href = `/search?q=${encodeURIComponent(trimmed)}`;
  }

  const projects = results?.projects ?? [];
  const tasks = results?.tasks ?? [];
  const hasSearched = initialQuery.length > 0;
  const hasResults = projects.length > 0 || tasks.length > 0;

  return (
    <div>
      <form className='form' role='search' onSubmit={handleSubmit} noValidate>
        <TextField
          label='Search'
          type='search'
          placeholder='Search projects and tasks…'
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <div className='form-actions'>
          <Button type='submit' variant='primary' disabled={!query.trim()}>
            Search
          </Button>
        </div>
      </form>

      <Alert variant='error'>{loadError}</Alert>

      {searching && (
        <p className='loading-state' role='status'>
          Searching…
        </p>
      )}

      {!searching && hasSearched && !loadError && !hasResults && (
        <p className='empty-state' role='status'>
          No results for &ldquo;{initialQuery}&rdquo;.
        </p>
      )}

      {!searching && hasResults && (
        <>
          {projects.length > 0 && (
            <section className='page-section'>
              <h2>Projects</h2>
              <div className='widget-grid'>
                {projects.map(project => (
                  <a
                    key={project.id}
                    className='card project-card'
                    href={`/projects/${project.id}`}
                  >
                    <div className='project-card-header'>
                      <h3>{project.name}</h3>
                      <span className='badge badge-neutral'>
                        {formatEnumLabel(project.status)}
                      </span>
                    </div>
                    <p>{project.description || 'No description.'}</p>
                  </a>
                ))}
              </div>
            </section>
          )}

          {tasks.length > 0 && (
            <section className='page-section'>
              <h2>Tasks</h2>
              {tasks.map(task => (
                <div className='list-item' key={task.id}>
                  <a className='list-item-title' href={`/tasks/${task.id}`}>
                    {task.title}
                  </a>
                  <div className='list-item-meta'>
                    <span className='badge badge-neutral'>
                      {formatEnumLabel(task.priority)}
                    </span>
                    <span>{formatEnumLabel(task.status)}</span>
                    {task.assignee_name && <span>{task.assignee_name}</span>}
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}
