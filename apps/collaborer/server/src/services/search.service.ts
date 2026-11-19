import type { OrganizationRole } from '../models/organization-member.model.js';
import type { Project } from '../models/project.model.js';
import type { TaskWithAssignee } from '../models/task.model.js';
import { searchRepository } from '../repositories/search.repository.js';

export interface SearchResults {
  projects?: Project[];
  tasks?: TaskWithAssignee[];
}

export const searchService = {
  search(
    organizationId: number,
    userId: number,
    role: OrganizationRole,
    query: string,
    type?: 'projects' | 'tasks'
  ): SearchResults {
    const isOrgManager = role === 'owner' || role === 'admin';
    const results: SearchResults = {};

    if (!type || type === 'projects') {
      results.projects = searchRepository.searchProjects(
        organizationId,
        userId,
        isOrgManager,
        query
      );
    }

    if (!type || type === 'tasks') {
      results.tasks = searchRepository.searchTasks(
        organizationId,
        userId,
        isOrgManager,
        query
      );
    }

    return results;
  }
};
