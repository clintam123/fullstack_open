import React from "react";
import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <>
          <h2>
            name: {part.name} - exerciseCount: {part.exerciseCount}
          </h2>
          <p>description: {part.description}</p>
          <br />
        </>
      );
    case "groupProject":
      return (
        <>
          <h2>
            name: {part.name} - exerciseCount: {part.exerciseCount}
          </h2>
          <p>groupProjectCount: {part.groupProjectCount}</p>
          <br />
        </>
      );
    case "submission":
      return (
        <>
          <h2>
            name: {part.name} - exerciseCount: {part.exerciseCount}
          </h2>
          <p>exerciseSubmissionLink: {part.exerciseSubmissionLink}</p>
          <br />
        </>
      );
    case "special":
      return (
        <>
          <h2>
            name: {part.name} - exerciseCount: {part.exerciseCount}
          </h2>
          <p>description: {part.description}</p>
          <p>required skills: {part.requirements.join(",")}</p>
          <br />
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
