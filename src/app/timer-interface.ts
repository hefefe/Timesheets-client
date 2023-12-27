export interface ITimer{

  Description?:string,

  taskId?:number
}

export interface ITrackedData{

  activityDate?: number[];

  workFrom?: number[];

  workTo?: number[];

  time?: number;

  description?:string,

  taskId?:number
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

  taskId?: number;

  projectId?: number;

  description?: string;
}
