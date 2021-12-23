import React from "react";
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../types";
import { Icon, Rating } from "semantic-ui-react";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <>
      <h2>
        {entry.date} <Icon name="hospital" size="big" />
      </h2>
      <p>{entry.description}</p>
    </>
  );
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> =
  ({ entry }) => {
    return (
      <>
        <h2>
          {entry.date} <Icon name="stethoscope" size="big" />{" "}
          {entry.employerName}
        </h2>
        <p>{entry.description}</p>
      </>
    );
  };

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <>
      <h2>
        {entry.date} <Icon name="user md" size="big" />
      </h2>
      <p>{entry.description}</p>
      <Rating
        icon="heart"
        disabled
        rating={4 - entry.healthCheckRating}
        maxRating={4}
      />
    </>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
