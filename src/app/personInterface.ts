export interface PersonInterface {
  id: number;

  firstName: string;

  lastName: string;

  photo: any;

  middleName: string;

  sex: string;

  dateOfBirth: Date;

  dateOfEmployment: Date;

  experience: string;

  position: string;

  workDuringWeekInHours: number;

  hourlyPay: number;

  address: PersonAddress;

  phone: string;

  user: PersonUser;
}

export interface PersonAddress {
  id: number;

  streetName: string;

  city: string;

  homeNumber: string;

  zipCode: string;

  country: string;
}

export interface PersonUser {

  id: number;

  email: string;

  tempPassword: string;

  roles: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export class Person implements PersonInterface {
  id: number;
  firstName: string;
  lastName: string;
  photo: any;
  middleName: string;
  sex: string;
  dateOfBirth: Date;
  dateOfEmployment: Date;
  experience: string;
  position: string;
  workDuringWeekInHours: number;
  hourlyPay: number;
  address: PersonAddress;
  phone: string;
  user: PersonUser;
  constructor(person: PersonInterface) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.middleName = person.middleName;
    this.sex = person.sex;
    this.dateOfBirth = person.dateOfBirth;
    this.dateOfEmployment = person.dateOfEmployment;
    this.experience = person.experience;
    this.position = person.position;
    this.workDuringWeekInHours = person.workDuringWeekInHours;
    this.hourlyPay = person.hourlyPay;
    this.phone = person.phone;
    this.user = person.user;
    this.address = person.address;
  }

}
