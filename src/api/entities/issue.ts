import { type TCustomField } from './customField';

export type TIssue = Partial<{
  id: number;
  project: { id: number; name: string };
  tracker: { id: number; name: string };
  status: { id: number; name: string };
  priority: { id: number; name: string };
  author: { id: number; name: string };
  assigned_to: { id: number; name: string };
  subject: string;
  description: string;
  done_ratio: number;
  custom_fields: TCustomField[];
  created_on: string;
  updated_on: string;
}>

export type TIssues = {
  issues: TIssue[];
}