import type { AnyObject }    from 'interfaces';
import { getResourceEntity } from 'api/lib/resource';

export const RESOURCES = {
  users: getResourceEntity<AnyObject>({ url: 'users.json' }),
  groups: getResourceEntity<AnyObject>({ url: 'groups.json' }),
  issues: getResourceEntity<AnyObject>({ url: 'issues/(:id).json' }),
  customFields: getResourceEntity<AnyObject>({ url: 'custom_fields.json' }),
  projects: getResourceEntity<AnyObject>({ url: 'projects.json' }),
  versions: getResourceEntity<AnyObject>({ url: 'projects/:id/versions.json' }),
};

export type ResourcesNames = keyof typeof RESOURCES;