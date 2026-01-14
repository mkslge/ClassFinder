import React from "react";
import * as Util from "./utility/utility.js";

export default function CourseCard({ course }) {
  const code = course.getCode();
  const title = course.getTitle();

  return (
    <li className="courseCard">
      <div className="courseTop">
        <span className="courseCode">{code}</span>
      </div>

      <div className="courseTitle">{title}</div>

      <div>
        <a
          href={`https://planetterp.com/course/${code}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          PlanetTerp Link
        </a>
        <br />
        <a
          href={Util.getTestudoLink(code)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Testudo Link
        </a>
      </div>
    </li>
  );
}
