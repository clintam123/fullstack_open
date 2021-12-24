import {
  NewPatient,
  Gender,
  NewEntry,
  Diagnosis,
  HealthCheckRating,
  NewBaseEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (label: string, data: unknown): string => {
  if (!data || !isString(data)) {
    throw new Error(`Incorrect or missing string: ${label}`);
  }
  return data;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isDiagnosisCodes = (
  diagnosisCodes: Array<unknown>
): diagnosisCodes is Array<Diagnosis["code"]> => {
  return diagnosisCodes.every((code: unknown) => isString(code));
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> => {
  if (!Array.isArray(diagnosisCodes) || !isDiagnosisCodes(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosisCodes");
  }
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (params: any): params is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(params);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "Incorrect or missing healthCheckRating: " + healthCheckRating
    );
  }
  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString("name", object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString("ssn", object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString("occupation", object.occupation),
    entries: [],
  };
  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewEntry => {
  const newBaseEntry: NewBaseEntry = {
    description: parseString("description", object.description),
    date: parseDate(object.date),
    specialist: parseString("specialist", object.specialist),
  };
  if (object.diagnosisCodes)
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);

  if (!object.type || !isString(object.type)) {
    throw new Error(`Missing or invalid entry type`);
  }
  switch (object.type) {
    case "HealthCheck":
      return {
        ...newBaseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };

    case "Hospital":
      return {
        ...newBaseEntry,
        type: "Hospital",
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString("dischargeCriteria", object.discharge.criteria),
        },
      };

    case "OccupationalHealthcare":
      const temp: NewEntry = {
        ...newBaseEntry,
        type: "OccupationalHealthcare",
        employerName: parseString("employerName", object.employerName),
      };
      if (object.sickLeave && object.sickLeave.startDate && object.sickLeave.endDate) {
        const sickLeave = {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        };
        temp.sickLeave = sickLeave;
      }
      return temp;

    default:
      throw new Error(`Incorrect entry type`);
  }
};

export default { toNewPatient, toNewPatientEntry };
