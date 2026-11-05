import { apiFetch } from '../../lib/api/client.js';
import type { AnalyticsResults } from './types.js';

export const analyticsApi = {
  async getAnalytics(organizationId: number): Promise<AnalyticsResults> {
    const { data } = await apiFetch<{ data: AnalyticsResults }>(
      `/organizations/${organizationId}/analytics`
    );
    return data;
  }
};
