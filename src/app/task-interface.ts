import { PersonInterface } from "./person-Interface";

export interface ITaskGroup{
  workflowDTO?: IWorkFlow;

  tasks?: Array<ITask>;
}

export interface ITask{
  id?: number;

  name?: string;

  description?: string;

  key?: string;

  storyPoints?: number;

  person?: PersonInterface;

  taskType?: ITaskType;

  workflow?: IWorkFlow;
}

export interface ITaskType{

  id?: number;

  name?: string;

  icon?: string;

  color?: string;
}

export interface IWorkFlow{

  id?: number;

  name?: string;
}
