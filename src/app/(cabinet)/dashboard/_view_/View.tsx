'use client';
import type { TUser }                from 'api/entities';
import {
  type ReactNode,
  useState,
}                                    from 'react';
import { useGetCachedResources }     from 'hooks';
import { View }                      from 'components/View';
import {
  type TDashboardFiltersState,
  DashboardViewFiltersForm,
  DashboardFiltersFormInitialState,
}                                    from './Filters';
import {
  DashboardViewTasksCountsReport,
}                                    from './Reports';
import isNull                        from 'lodash/isNull';
import sortBy                        from 'lodash/sortBy';
import { FaCity }                    from 'react-icons/fa';
import API, { useGet }               from 'api';

// -------------------------------------------------
// -------------------------------------------------

export type DashboardViewProps = {
  title: string;
}

export const DashboardView = ({
  title,
}: DashboardViewProps): ReactNode => {
  const { users: usersData } = useGetCachedResources([ 'users' ]);
  const [ filters, setFilters ] = useState<TDashboardFiltersState>({
    ...DashboardFiltersFormInitialState,
  });
  const { data: usersByGroup } = useGet<{ users: TUser[] }>(
    () => !isNull(filters.groupId)
      ? API.users.getUrl({ group_id: filters.groupId, status: 1, limit: 100 })
      : null
  );

  // ---------------------------------------------------------------

  const getUsers = (): TUser[] => {
    if (usersByGroup) {
      return usersByGroup.users;
    }

    return usersData.users.filter(user => filters.userIds.includes(user.id));
  };

  const users = sortBy(getUsers(), 'lastname');
  const preparedFilters = { ...filters, users };

  // ---------------------------------------------------------------

  return (
    <View
      title={title}
      icon={<FaCity />}
    >
      <DashboardViewFiltersForm
        value={filters}
        onChange={setFilters}
      />

      <DashboardViewTasksCountsReport filters={preparedFilters} />
    </View>
  );

};