import patients from "../../data/patients";
import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from "../types";
import { v1 as uuid } from "uuid";

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientEntries = (id: string): Entry[] | undefined => {
  return patients.find((p) => p.id === id)?.entries;
};

const addPatientEntry = (newEntry: NewEntry, patientId: string): Entry => {
  const entryWithId: Entry = { ...newEntry, id: uuid() };
  patients.find((p) => p.id === patientId)?.entries.push(entryWithId);
  return entryWithId;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  getPatientById,
  getPatientEntries,
  addPatientEntry,
};
