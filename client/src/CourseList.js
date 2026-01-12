import './CourseList.css'
import Course from './models/course.js'
import * as requests from './utility/requests.js'

import React, {useEffect, useState} from 'react';



function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
        try {
            const data = await requests.getRequest("http://localhost:3030/courses");
            console.log(data);
            
            const courseObjs = data.map(c => 
                new Course(c.code, c.title, c.isRequired ?? c.is_required, 
                    c.area, c.languages, c.technologies, c.averageGPA
            ));
            setCourses(data);
        } finally {
            setLoading(false);
        }
        
    })()
  }, [])

  return (
    <div className="CourseList">
      <nav class="menu">
        <ul>
            <li>
                <a class="active" href="/" id="home">
                    {loading ? ` Loading...` : `Loaded ${courses.length} courses...`}; 
                </a>
            </li>
            
            {courses.map(course => (
                <li key={course.code}>
                    {course.code} {course.title},
                    <br></br>
                </li>
                
            ))}

        </ul>
      </nav>
    </div>
  );
}

export default CourseList;