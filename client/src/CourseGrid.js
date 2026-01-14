import React from "react";
import CourseCard from "./CourseCard.js";

export default function CourseGrid({ courses }) {
  return (
    <ul className="courseGrid">
      {courses.map(course => (
        <CourseCard key={course.getCode()} course={course} />
      ))}
    </ul>
  );
}