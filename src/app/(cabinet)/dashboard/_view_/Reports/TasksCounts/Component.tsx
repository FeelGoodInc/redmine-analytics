import type { TIssue }                 from 'api/entities';
import type { TDashboardFiltersState } from '../../Filters';
import {
  type ReactNode,
  useEffect,
  useState,
}                                      from 'react';
import { PaginationList }              from 'UI';
import { ViewBlock }                   from 'components/View';
import { getFullName }                 from 'helpers/user';
import isEmpty                         from 'lodash/isEmpty';
import API, { type IResource }         from 'api';

type DashboardViewTasksCountsReportProps = {
  filters: TDashboardFiltersState;
}

export const DashboardViewTasksCountsReport = ({
  filters = {},
}: DashboardViewTasksCountsReportProps): ReactNode => {
  const [ usersIssues, setUsersIssues ] = useState([]);
  const { users, projectId, sprintId } = filters;

  // -----------------------------------------------------------

  useEffect(() => {
    if (!isEmpty(users)) {
      Promise.all(
        users.map(user => (
          API.issues.get({
            assigned_to_id: user.id,
            limit: 1,
            ...(sprintId ? { 'cf_26': sprintId } : {}),
          })
          .then(res => {
            return { ...res, userId: user.id };
          })
        ))
      )
      .then(setUsersIssues);
    }
  }, [ JSON.stringify(users), sprintId ]);

  // -----------------------------------------------------------

  const getContent = (): ReactNode => {
    return (
      <>
        {users.map(user => {
          const userIssues = usersIssues.find(item => item.userId === user.id);

          return (
            <ViewBlock
              key={user.id}
              title={getFullName(user)}
              expandable
              backgroundColor="white"
              countBadge={{ value: userIssues?.total_count }}
            >
              <PaginationList<TIssue>
                resource={API.issues as IResource<TIssue>}
                resourceQuery={{
                  assigned_to_id: user.id,
                  limit: 100,
                  sort: 'status:asc',
                  include: 'relations',
                  ...(sprintId ? { 'cf_26': sprintId } : {}),
                }}
                dataField="issues"
                columns={[
                  {
                    key: 'ID',
                    label: 'ID',
                    field: 'id',
                  },
                  {
                    key: 'status',
                    label: 'Статус',
                    field: 'status.name',
                  },
                  {
                    key: 'subject',
                    label: 'Тема',
                    field: 'subject',
                  },
                ]}
              />
            </ViewBlock>
          );
        })}
      </>
    );
  };

  // -----------------------------------------------------------

  return (
    <ViewBlock
      title="Количество назначенных задач"
    >
      {!isEmpty(users) && !isEmpty(usersIssues) && getContent()}
    </ViewBlock>
  );
};