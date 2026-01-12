import './CourseList.css'
import Course from './models/course.js'
import * as requestUtil from './utility/requests.js'
import * as filterUtil from './utility/filters.js'
import React, {useEffect, useState} from 'react';



function CourseList() {
  const [courses, setCourses] = useState([]);
  let [activeCourses, setActiveCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  let courseObjs;
  useEffect(() => {
    (async () => {
        try {
            const data = await requestUtil.getRequest("http://localhost:3030/courses");
            console.log(data);
            
            const courseObjs = data.map(c => 
                new Course(c.code, c.title, c.isRequired ?? c.is_required, 
                    c.area, c.languages, c.technologies, c.averageGPA
            ));
            setCourses(courseObjs);
            setActiveCourses(courseObjs);
        } finally {
            setLoading(false);
        }
        
    })()
  }, [])


  const [filters, setFilters] = useState([]);
  const [loadingFilters, setLoadingFilter] = useState(true);
  useEffect(() => {
    (async () => {
        try {
            const data = await requestUtil.getRequest("http://localhost:3030/courses/technologies");
            console.log(data);
            
            const courseObjs = data.map(c => 
                new Course(c.code, c.title, c.isRequired ?? c.is_required, 
                    c.area, c.languages, c.technologies, c.averageGPA
            ));
            setFilters(data);
        } finally {
            setLoadingFilter(false);
        }
        
    })()
  }, [])



  return (
    <div className="CourseList">
      
        <ul>
            
            {loadingFilters ? `Loading Filters...` : `Loaded ${filters.length} technologies...`}
                
            {filters.map(filter => (
                    <li key={filter}>
                        <button onClick={() =>
                            
                            setActiveCourses(filterUtil.filterTechnology(activeCourses, filter))}>
                            {filter}
                        </button>
                         {filter} 
                    </li>
            ))}
        </ul>
        
        <br></br>
        <hr></hr>

        <ul>
            
            {loading ? `Loading...` : `Found ${activeCourses.length} course(s)...`}
            
            
            {activeCourses.map(course => (
                <li key={course.code}>
                    {course.code} {course.title},
                    
                </li>
            ))}

        </ul>
      
    </div>
  );
}

export default CourseList;