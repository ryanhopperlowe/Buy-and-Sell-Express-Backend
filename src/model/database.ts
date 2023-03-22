import { FieldInfo } from "mysql";

export interface QueryResponse<T = unknown> {
  results: T;
  field?: FieldInfo[];
}