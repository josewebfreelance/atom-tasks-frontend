import {Timestamp} from "rxjs";

export interface Task {
  id?: string
  title: string
  description: string
  status: boolean;
  creation?: Date;
}
