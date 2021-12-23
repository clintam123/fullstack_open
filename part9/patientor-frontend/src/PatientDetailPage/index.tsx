import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Icon, SemanticICONS } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
import { useStateValue } from "../state";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const { data: patientDetailFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT_DETAIL", payload: patientDetailFromApi });
      } catch (err) {
        console.error(err);
      }
    };
    if (patients[id] && patients[id].ssn) {
      setPatient(patients[id]);
    } else {
      void fetchPatientDetail();
    }
  }, [id]);

  const genderIcon = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      default:
        return "genderless";
    }
  };

  return (
    <>
      {patient && (
        <Card>
          <Card.Content header={patient.name} />
          <Card.Content description={`occupation: ${patient.occupation}`} />
          <Card.Content extra>
            <Icon name={genderIcon(patient.gender)} />
            {patient.ssn}
          </Card.Content>
        </Card>
      )}
    </>
  );
};

export default PatientDetailPage;
