import './CourseList.css'
import Course from './models/course.js'
import * as requestUtil from './utility/requests.js'
import * as filterUtil from './utility/filters.js'
import Filter from './models/filter.js'
import React, { useEffect, useMemo, useState } from 'react'

function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState([])          
  const [activeFilters, setActiveFilters] = useState([])
  const [loadingFilters, setLoadingFilter] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const data = await requestUtil.getRequest("http://localhost:3030/courses")
        const courseObjs = data.map(c =>
          new Course(c.code, c.title, c.isRequired ?? c.is_required,
            c.area, c.languages, c.technologies, c.averageGPA)
        )
        setCourses(courseObjs)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const techs = await requestUtil.getRequest("http://localhost:3030/courses/technologies")
        let filterObjs = techs.map(tech =>
          new Filter(tech, (course) => course.getTechnologies().includes(tech))
        )

        const langs = await requestUtil.getRequest("http://localhost:3030/courses/languages")
        filterObjs = [...filterObjs, ...langs.map(lang => 
            new Filter(lang, (course) => course.getLanguages().includes(lang)))
        ]
        setFilters(filterObjs)
      } finally {
        setLoadingFilter(false)
      }
    })()
  }, [])

  
  const activeCourses = useMemo(() => {
    return filterUtil.applyFilters(courses, activeFilters)
  }, [courses, activeFilters])

  return (
    <div className="CourseList">
      <ul>
        {loadingFilters ? `Loading Filters...` : `Loaded ${filters.length} technologies...`}

        {filters.map(f => (
          <li key={f.getName()}>
            <button onClick={() => setActiveFilters(prev => filterUtil.toggleFilter(prev, f))}>
              {f.getName()}
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <ul>
        {loading ? `Loading...` : `Found ${activeCourses.length} course(s)...`}

        {activeCourses.map(course => (
          <li key={course.getCode()}>
            {course.getCode()} {course.getTitle()}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CourseList
