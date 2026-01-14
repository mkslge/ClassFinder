import './CourseList.css'
import Course from './models/course.js'

import * as filterUtil from './utility/filters.js'
import * as Util from './utility/utility.js'


import Filter from './models/filter.js'
import {api} from './modules/api.js'
import React, { useEffect, useMemo, useState} from 'react'

function CourseList() {
  
  
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const [activeFilters, setActiveFilters] = useState([])
  const [loadingFilters, setLoadingFilter] = useState(true)

  const [filterData, setFilterData] = useState({
    technologies: [],
    languages: [],
    keywords: [],
  })


  
  
  useEffect(() => {

    (async () => {
      try {
        api.addVisitor().catch( () => {});

        const [courseJson, techJson, langJson, keywordJson] = await Promise.all([
            api.getCourses(),
            api.getTechnologies(),
            api.getLanguages(),
            api.getKeywords(),
        ])
        
        
        const courseObjs = Course.mapCourseJson(courseJson)

        setCourses(courseObjs)
        setFilterData(
            {
                technologies: techJson,
                languages: langJson,
                keywords: keywordJson
            });

      } finally {
        setLoading(false)
        setLoadingFilter(false);
      }
    })()
  }, [])

  

  const activeCourses = useMemo(() => {
    return filterUtil.applyFilters(courses, activeFilters)
  }, [courses, activeFilters])

  const keywords = useMemo(() => {
    return filterData.keywords.map(
        kw => new Filter(kw, 
            (course) => course.getKeywords().includes(kw)
        )
    );
  }, [filterData.keywords])


  const techLangs = useMemo(() => {
    return [
        ...filterData.technologies.map(
            tech => new Filter(tech, (course) => course.getTechnologies().includes(tech))
        ),
        ...filterData.languages.map(
            lang => new Filter(lang, (course) => course.getLanguages().includes(lang))
        )
    ]
  }, [filterData.technologies, filterData.languages])
  

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
