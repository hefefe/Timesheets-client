import { PersonInterface } from "./person-Interface";

export interface IProject{
  id?: number;

  name?: string;

  sprintNumber?: number;

  endOfSprint?: Date;

  person?: PersonInterface;

  key?: string;

  sprintDuration?: SprintDurationType;

  photo?: any;

  workflow?: string[];

  persons?: number[];
}

export enum SprintDurationType {
  ONE_WEEK = "one week",
  TWO_WEEKS = "two weeks",
  THREE_WEEKS = "three weeks",
  FOUR_WEEKS = "four weeks"
}
