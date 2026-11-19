import type { Project } from '../projects/types.js';
import type { TaskWithAssignee } from '../tasks/types.js';

export type SearchResultType = 'projects' | 'tasks';

export interface SearchResults {
  projects?: Project[];
  tasks?: TaskWithAssignee[];
}
