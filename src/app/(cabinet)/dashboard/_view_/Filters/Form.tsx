import { type TUser }            from 'api/entities';
import { type ReactNode }        from 'react';
import { useGetCachedResources } from 'hooks';
import {
  Form,
  CheckPicker,
  SelectPicker,
}                                from 'rsuite';
import { WithCachedResources }   from 'components/WithCachedResources';
import sortBy                    from 'lodash/sortBy';
import API, { useGet }           from 'api';

export type TDashboardFiltersState = Partial<{
  users: TUser[];
  userIds: number[];
  groupId: number;
  projectId: number;
  sprintId: number;
}>

export type TDashboardFiltersFormProps = {
  value: TDashboardFiltersState;
  onChange: (value: TDashboardFiltersState) => void;
}

export const DashboardFiltersFormInitialState: TDashboardFiltersState = {
  users: [],
  userIds: [],
  groupId: null,
  projectId: null,
  sprintId: null,
};

const DashboardViewFiltersFormWCR = ({
  value,
  onChange,
}: TDashboardFiltersFormProps): ReactNode => {
  const {
    users: usersData,
    groups: groupsData,
    projects: projectsData,
  } = useGetCachedResources([ 'users', 'groups', 'projects' ]);
  const { data: sprintsData, isValidating: sprintsLoading } = useGet(
    () => value.projectId
      ? API.versions.getUrl({ id: value.projectId })
      : null
  );
  const sortedSprints = sortBy(sprintsData?.versions || [], 'id').reverse();

  // ----------------------------------------------------------------------

  return (
    <Form
      fluid
      formValue={value}
      onChange={onChange}
    >
      <div className="columns">
        <Form.Group className="column size25">
          <Form.ControlLabel>Сотрудники</Form.ControlLabel>
          <Form.Control
            name="userIds"
            accepter={CheckPicker}
            block
            data={usersData.users.map(item => ({
              label: `${item.lastname} ${item.firstname}`, value: item.id,
            }))}
            onChange={(fieldValue) => {
              onChange({
                ...value,
                groupId: null,
                userIds: fieldValue,
              });
            }}
          />
        </Form.Group>

        <Form.Group className="column size25">
          <Form.ControlLabel>Группа сотрудников</Form.ControlLabel>
          <Form.Control
            name="groupId"
            accepter={SelectPicker}
            block
            data={groupsData.groups.map(item => ({
              label: item.name, value: item.id,
            }))}
            onChange={(fieldValue) => {
              onChange({
                ...value,
                groupId: fieldValue,
                userIds: [],
              });
            }}
          />
        </Form.Group>

        <Form.Group className="column size25">
          <Form.ControlLabel>Проект</Form.ControlLabel>
          <Form.Control
            name="projectId"
            accepter={SelectPicker}
            block
            data={projectsData.projects.map(item => ({
              label: item.name, value: item.id,
            }))}
            onChange={(fieldValue) => {
              onChange({
                ...value,
                projectId: fieldValue,
                sprintId: null,
              });
            }}
          />
        </Form.Group>

        <Form.Group className="column size25">
          <Form.ControlLabel>Спринт</Form.ControlLabel>
          <Form.Control
            name="sprintId"
            accepter={SelectPicker}
            block
            loading={sprintsLoading}
            disabled={!value.projectId || sprintsLoading}
            data={sortedSprints.map(item => ({
              label: item.name, value: item.id,
            }))}
          />
        </Form.Group>
      </div>
      
    </Form>
  );
};

export const DashboardViewFiltersForm = (props: TDashboardFiltersFormProps): ReactNode => (
  <WithCachedResources
    resources={{
      projects: {},
    }}
  >
    <DashboardViewFiltersFormWCR {...props} />
  </WithCachedResources>
);