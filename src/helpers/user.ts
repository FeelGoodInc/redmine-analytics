import { type TUser }     from 'api/entities';
import { type ReactNode } from 'react';
import compact            from 'lodash/compact';

// -----------------------------------------------------

export const getFullName = (data: TUser): ReactNode => {
  const { firstname, lastname } = data;

  return compact([ lastname, firstname ]).join(' ');
};

// -----------------------------------------------------