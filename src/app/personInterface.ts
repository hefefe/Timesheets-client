export interface PersonInterface {
  id?: number;

  firstName?: string;

  lastName?: string;

  photo?: any;

  middleName?: string;

  sex?: string;

  dateOfBirth?: Date;

  dateOfEmployment?: Date;

  experience?: Experience;

  position?: Position;

  workDuringWeekInHours?: number;

  hourlyPay?: number;

  address?: PersonAddress;

  phone?: string;

  user?: PersonUser;
}

export interface PersonAddress {
  id?: number;

  streetName?: string;

  city?: string;

  homeNumber?: string;

  zipCode?: string;

  country?: string;
}

export interface PersonUser {

  id?: number;

  email?: string;

  tempPassword?: string;

  roles?: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export enum Experience {
  Junior = 'Junior',
  Mid = 'Mid',
  Senior = 'Senior'
}

export enum Position {

  BACKEND = 'backend',
  FRONTEND = 'frontend',
  DEVOPS = 'devops',
  QA = 'quality assurance',
  TEAM_LEADER = 'team leader',
  MANAGER = 'manager'
}

export enum Roles {

  ROLE_USER = 'ROLE_USER',
  ROLE_LEADER = 'ROLE_LEADER',
  ROLE_ADMIN = 'ROLE_ADMIN'
}
