import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Icon, Segment, SemanticICONS, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Patient, Gender, Entry } from "../types";
import { useStateValue, setPatientDetails } from "../state";
import EntryDetails from "../components/EntryDetails";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { addEntry } from "../state";
import AddEntryModal from "../AddEntryModal";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientDetails }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

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
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </>
      )}
    </>
  );
};

export default PatientDetailPage;
