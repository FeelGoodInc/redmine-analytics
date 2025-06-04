import { type IResource } from 'api';
import { type AnyObject } from 'interfaces';
import {
  type ReactNode,
}                         from 'react';
import {
  type TableProps,
  type ColumnProps,
  Table,
  Pagination,
}                         from 'rsuite';
import { useGet }         from 'api';

type TUIPaginationListColumn<T> = {
  key: string;
  label: ReactNode;
  field?: string;
  formatter?: ({ value, rowData }: { value: any; rowData: T }) => ReactNode;
} & ColumnProps<T>;

export type TPaginationList<T> = {
  resource: IResource<any>;
  resourceQuery?: AnyObject;
  dataField: string;
  columns: TUIPaginationListColumn<T>[];
} & Omit<TableProps, 'resource'>;

export const PaginationList = <T, >({
  resource,
  resourceQuery = {},
  dataField,
  columns = [],
  ...rest
}: TPaginationList<T>): ReactNode => {
  const getResourceQuery = (): AnyObject => {
    return resourceQuery;
  };

  // --------------------------------------------

  const { data, isLoading } = useGet(
    resource.getUrl(getResourceQuery()),
  );

  console.log(data, data?.[dataField]);

  // --------------------------------------------

  const getContent = (): ReactNode => {
    return columns.map(column => {
      return (
        <Table.Column
          key={column.key}
          flexGrow={1}
        >
          <Table.HeaderCell>{column.label}</Table.HeaderCell>
          <Table.Cell dataKey={column.field} />
        </Table.Column>
      );
    });
  };

  // --------------------------------------------

  return (
    <div>
      {/* <Pagination total={100} /> */}
      <Table
        wordWrap="break-word"
        cellBordered
        autoHeight
        data={data?.[dataField]}
        {...rest}
      >
        {getContent()}
      </Table>
      {/* <Pagination total={100} /> */}
    </div>
  );
};