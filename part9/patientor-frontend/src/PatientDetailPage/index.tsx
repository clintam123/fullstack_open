import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Icon, Segment, SemanticICONS } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
import { useStateValue, setPatientDetails } from "../state";
import EntryDetails from "../components/EntryDetails";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    const fetchPatientDetail = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientDetailsFromApi);
        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch (err) {
        console.error(err);
      }
    };
    if (patientDetails[id]) {
      setPatient(patientDetails[id]);
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
        <>
          <Card>
            <Card.Content header={patient.name} />
            <Card.Content description={`occupation: ${patient.occupation}`} />
            <Card.Content extra>
              <Icon name={genderIcon(patient.gender)} />
              {patient.ssn}
            </Card.Content>
          </Card>
          <Segment>
            <h2>Entries</h2>
            {patient.entries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  border: "solid 2px",
                  marginTop: 10,
                  marginBottom: 10,
                  padding: 5,
                }}
              >
                <EntryDetails entry={entry} />
              </div>
            ))}
          </Segment>
        </>
      )}
    </>
  );
};

export default PatientDetailPage;