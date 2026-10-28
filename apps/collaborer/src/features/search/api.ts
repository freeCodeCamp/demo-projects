import { apiFetch } from '../../lib/api/client.js';
import type { SearchResults, SearchResultType } from './types.js';

export const searchApi = {
  async search(
    organizationId: number,
    query: string,
    type?: SearchResultType
  ): Promise<SearchResults> {
    const params = new URLSearchParams({ q: query });
    if (type) params.set('type', type);
    const { data } = await apiFetch<{ data: SearchResults }>(
      `/organizations/${organizationId}/search?${params.toString()}`
    );
    return data;
  }
};
