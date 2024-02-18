export type UserGroup = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  login: string;
  firstname: string;
  lastname: string;
  mail: string;
  created_on: string;
  updated_on: string;
  last_login_on: string;
  groups: UserGroup;
};
