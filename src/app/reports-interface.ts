export interface IIdFromTo{
  id?: number;

  from?: Date;

  to?: Date;
}
export interface IPersonStatistics{
  completionRate?: number;

  yearsOfEmployment?: number;

  overtimeRatio?: number;

  pay?: number;

  sumOfStoryPointsDone?: number;

  tasksAndHours?: Array<ITasksAndHours>;

  storyPointsDone?: Array<IStoryPointsDone>;
}

export interface ITasksAndHours{
  taskName?: string;

  timeOfCompletion?: number;
}

export interface IStoryPointsDone{
  date?: number[];

  storyPoints?: number;
}

export interface IProjectStatistics{
  timeTracked?: number;

  velocity?: number;

  moneySpent?: number;

  numberOfEmployees?: number;

  tasksDone?: number;

  data?: Array<IBurnDown>;

  taskDoneByType?: Array<ITaskCompletedByType>;

  sprintCompletion?: Array<ISprintCompletion>;
}

export interface ITaskCompletedByType{
  type?: string;

  numberOfTasks?: number;
}

export interface ISprintCompletion{
  committed?: number;

  uncommitted?: number;

  sprintNumber?: number;
}

export interface IBurnDown{
  committed?: number;

  uncommitted?: number;

  date?: number[];
}

export interface IDatePlaceholder{
  name?: string;

  from?: Date;

  to?: Date;
}


