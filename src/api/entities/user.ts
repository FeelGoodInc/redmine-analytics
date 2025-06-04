import type { TCustomField } from './customField';

export type TUser = {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  mail: string;
  created_on: string;
  last_login_on: string;
  custom_fields: TCustomField[];
}