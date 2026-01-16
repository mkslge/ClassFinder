import React from "react";
import * as Util from "../utility/utility.js";

export default function CourseCard({ course }) {
  const code = course.getCode();
  const title = course.getTitle();
  const aGPA = course.getAverageGPADisplay();

  return (
    <li className="courseCard">
      <div className="courseHeader">
        <span className="courseCode">{code}</span>
      </div>

      <div className="courseTitle">{title}</div>

      <div className="courseMeta">
        Avg GPA:
        <span
          className="courseGPA"
          style={{ color: course.getGPAColor(aGPA) }}
        >
          {aGPA === "Unknown" ? ` Unknown` : ` ${aGPA}`}
        </span>
      </div>


      <div className="courseActions">
        <a
          href={`https://planetterp.com/course/${code}`}
          target="_blank"
          rel="noopener noreferrer"
          className="courseLink"
        >
          PlanetTerp
        </a>

        <a
          href={Util.getTestudoLink(code)}
          target="_blank"
          rel="noopener noreferrer"
          className="courseLink secondary"
        >
          Testudo
        </a>
      </div>
    </li>
  );
}
