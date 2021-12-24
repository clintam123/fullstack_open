import express from "express";

import patientService from "../services/patientService";
import utils from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get("/:id", (req, res) => {
  res.send(patientService.getPatientById(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatientEntry(
      newPatientEntry,
      req.params.id
    );
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get("/:id/entries", (req, res) => {
  res.send(patientService.getPatientEntries(req.params.id));
});

export default router;
