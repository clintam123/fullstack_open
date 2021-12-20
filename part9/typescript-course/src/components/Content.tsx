import React from "react";

import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <>
      {courseParts.map((coursePart: CoursePart) => (
        <Part part={coursePart} key={coursePart.name} />
      ))}
    </>
  );
};

export default Content;
