import './CourseList.css'
import Course from './models/course.js'

import * as requestUtil from './utility/requests.js'
import * as filterUtil from './utility/filters.js'
import * as Util from './utility/utility.js'

import Filter from './models/filter.js'
import React, { useEffect, useMemo, useState, useRef } from 'react'

function CourseList() {
  const ran = useRef(false);
  
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [loadingFilters, setLoadingFilter] = useState(true)

  const [techLangs, setTechLangs] = useState([])
  const [keywords, setKeywords] = useState([])

  
  
  useEffect(() => {
    if(ran.current ) {
        return;
    } else {
        ran.current = true;
    }
    (async () => {
      try {
        let addVisitor = (async() => await requestUtil.postRequest("http://localhost:3030/addvisitor"));
        addVisitor();
        const courseJson = await requestUtil.getRequest("http://localhost:3030/courses")
        const courseObjs = courseJson.map(c =>
          new Course(
            c.code,
            c.title,
            c.isRequired ?? c.is_required,
            c.keywords ?? [],
            c.languages ?? [],
            c.technologies ?? [],
            c.averageGPA
          )
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
        const techJson = await requestUtil.getRequest("http://localhost:3030/courses/technologies")
        const techObjs = techJson.map(tech => new Filter(tech, (course) => course.getTechnologies().includes(tech)))

        const langJson = await requestUtil.getRequest("http://localhost:3030/courses/languages")
        const langObjs = langJson.map(lang => new Filter(lang, (course) => course.getLanguages().includes(lang)))

        const keywordJson = await requestUtil.getRequest("http://localhost:3030/courses/keywords")
        const keywordObjs = keywordJson.map(kw => new Filter(kw, (course) => course.getKeywords().includes(kw)))

        setFilters([...techObjs, ...langObjs, ...keywordObjs])
        setTechLangs([...techObjs, ...langObjs])
        setKeywords(keywordObjs)
      } finally {
        setLoadingFilter(false)
      }
    })()
  }, [])

  const activeCourses = useMemo(() => {
    return filterUtil.applyFilters(courses, activeFilters)
  }, [courses, activeFilters])

  const toggle = (f) => setActiveFilters(prev => filterUtil.toggleFilter(prev, f))
  const isActive = (f) => activeFilters.some(x => x.getName() === f.getName())

  return (
    <div className="CourseList">
      <div className="container">
        <header className="pageHeader">
          <h1 className="title">Filters</h1>
          <p className="subtitle">Filter by language, technology, and keywords.</p>
        </header>

        <section className="panel">
          <div className="panelHeader">
            <h2>Languages & Technologies</h2>
            <span className="meta">
              {loadingFilters ? 'Loading…' : `${techLangs.length} available`}
            </span>
          </div>

          <ul className="chipGrid">
            {techLangs.map(f => (
              <li key={f.getName()}>
                <button
                  className={`chip ${isActive(f) ? 'isActive' : ''}`}
                  onClick={() => toggle(f)}
                  type="button"
                >
                  {f.getName()}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <div className="panelHeader">
            <h2>Keywords</h2>
            <span className="meta">
              {loadingFilters ? 'Loading…' : `${keywords.length} available`}
            </span>
          </div>

          <ul className="chipGrid">
            {keywords.map(f => (
              <li key={f.getName()}>
                <button
                  className={`chip ${isActive(f) ? 'isActive' : ''}`}
                  onClick={() => toggle(f)}
                  type="button"
                >
                  {f.getName()}
                </button>
              </li>
            ))}
          </ul>

          <div className="actionsRow">
            <div className="activeCount">
              Active filters: <strong>{activeFilters.length}</strong>
            </div>
            <button
              className="clearBtn"
              type="button"
              onClick={() => setActiveFilters([])}
              disabled={activeFilters.length === 0}
            >
              Clear filters
            </button>
          </div>
        </section>

        <section className="results">
          <div className="resultsHeader">
            <h1 className="title">Courses</h1>
            <span className="meta">
              {loading ? 'Loading…' : `${activeCourses.length} course(s) found`}
            </span>
          </div>

          <ul className="courseGrid">
            {activeCourses.map(course => (
              <li key={course.getCode()} className="courseCard">
                <div className="courseTop">
                  <span className="courseCode">{course.getCode()}</span>
                </div>
                <div className="courseTitle">
                    {course.getTitle()}
                </div> 
                <div>
                    <a href={`https://planetterp.com/course/${course.getCode()}`} target="_blank" rel="noopener noreferrer">PlanetTerp Link</a>
                    <br></br>
                    <a href={`${Util.getTestudoLink(course.getCode())}`} target="_blank" rel="noopener noreferrer">Testudo Link</a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default CourseList
