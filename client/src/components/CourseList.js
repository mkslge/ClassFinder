import './CourseList.css'

import FilterPanel  from './FilterPanel.js'
import CourseGrid from './CourseGrid.js'

import Course from '../models/course.js'
import Filter from '../models/filter.js'
import * as filterUtil from '../utility/filters.js'



import {api} from '../modules/api.js'
import React, { useEffect, useMemo, useState} from 'react'

function CourseList() {
  
  
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const [activeKeys, setActiveKeys] = useState(() => new Set());

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
      }
    })()
  }, [])

  

  const activeCourses = useMemo(() => {
    return filterUtil.applyFilters(courses, activeKeys)
  }, [courses, activeKeys])

  const keywords = useMemo(() => {
    return filterData.keywords.map(
        kw => new Filter(`kw:${kw}`, 
            (course) => course.getKeywords().includes(kw)
        )
    );
  }, [filterData.keywords])


  const techLangs = useMemo(() => {
    return [
        ...filterData.technologies.map(
            tech => new Filter(`tech:${tech}`, (course) => course.getTechnologies().includes(tech))
        ),
        ...filterData.languages.map(
            lang => new Filter(`lang:${lang}`, (course) => course.getLanguages().includes(lang))
        )
    ]
  }, [filterData.technologies, filterData.languages])
  

  const toggleKey = (key) => {
  setActiveKeys(prev => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });
  };

  const isActive = (key) => activeKeys.has(key);

  return (
    <div className="CourseList">
      <div className="container">
        <header className="pageHeader">
          <h1 className="title">Filters</h1>
          <p className="subtitle">Filter by language, technology, and keywords.</p>
        </header>

        <FilterPanel title="Languages & Technologies" 
            loading={loading} 
            count={techLangs.length}
            filters={techLangs}
            isActiveKey={isActive}
            onToggleKey={toggleKey}>

        </FilterPanel>

        <FilterPanel
            title="Keywords"
            loading={loading}
            count={keywords.length}
            filters={keywords}
            isActiveKey={isActive}
            onToggleKey={toggleKey}
            footer={
                <div className="actionsRow">
                <div className="activeCount">
                    Active filters: <strong>{activeKeys.size}</strong>
                </div>
                <button
                    className="clearBtn"
                    type="button"
                    onClick={() => setActiveKeys(new Set())}
                    disabled={activeKeys.size === 0}
                >
                    Clear filters
                </button>
                </div>
            }
        />

        <section className="results">
          <div className="resultsHeader">
            <h1 className="title">Courses</h1>
            <span className="meta">
              {loading ? 'Loading…' : filterUtil.getFindMessage("course", activeCourses.length)}
            </span>
          </div>

          <CourseGrid courses={activeCourses}>
          </CourseGrid>
        </section>
      </div>
    </div>
  )
}

export default CourseList
