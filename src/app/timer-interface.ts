import { IProject } from "./project-interface";
import { ITask } from "./task-interface";

export interface ITimer{

  description?:string,

  taskId?:number
}

export interface ITrackedData{

  activityDate?: number[];

  workFrom?: number[];

  workTo?: number[];

  time?: number;

  description?:string,

  taskId?:number

  taskName?: string;

  projectKey?: string;
}

export interface ITimeTrackerHistory{

  dateOfActivity?: number[];

  trackedData?: Array<ITrackedData>;

  time?: number;
}

export interface IHistoryWithTotalTime{

  historyDTOs?: Array<ITimeTrackerHistory>;

  time?: number;

  from?: number[];

  to?: number[];
}

export interface IIsStarted{

  startedTime?: number[];

  task?: ITask;

  project?: IProject;

  description?: string;
}
