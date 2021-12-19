export interface Diagnose {
  name: string;
  code: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, "ssn">;
