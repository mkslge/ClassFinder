import '../style/CourseList.css'

import FilterPanel  from './FilterPanel.js'
import CourseGrid from './CourseGrid.js'

import Course from '../models/course.js'
import Filter from '../models/filter.js'

import * as filterUtil from '../utility/filterUtil.js'
import * as sortUtil from '../utility/sortUtil.js'

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
    categories: [],
  })

  const [sortKey, setSortKey] = useState("code"); // "code" | "gpa"
  const [sortAsc, setSortAsc] = useState(true);

  const [filterMode, setFilterMode] = useState("OR"); // can be "OR" or "AND"


  
  
  useEffect(() => {

    (async () => {
      try {
        api.addVisitor().catch( () => {});

        const [courseJson, techJson, langJson, kwJson, catJson] = await Promise.all([
            api.getCourses(),
            api.getTechnologies(),
            api.getLanguages(),
            api.getKeywords(),
            api.getCategories()
        ])
        
        let courseObjs = Course.mapCourseJson(courseJson)
        courseObjs = sortUtil.sortCoursesByCode(courseObjs)

        setCourses(courseObjs)
        setFilterData(
            {
                technologies: techJson,
                languages: langJson,
                keywords: /*kwJson,*/
                sortUtil.sortKeywords(kwJson),
                categories: catJson,
            });

      } finally {
        setLoading(false)
      }
    })()
  }, [])
  

  

  const categories = useMemo( ()=> {
    return filterData.categories.map( cat => new Filter(`cat:${cat}`, course => course.categories.includes(cat)))
  }, [filterData.categories])

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

  let keywords = useMemo(() => {
    
    return filterData.keywords.map(
        kw => new Filter(`kw:${kw}`, 
            (course) => course.getKeywords().includes(kw)
        )
    );

  }, [filterData.keywords])


  let activeCourses = useMemo(() => {
    return filterUtil.applyFilters(courses, activeKeys, filterMode)
  }, [courses, activeKeys, filterMode])

  activeCourses = useMemo(() => {
    let result = [...activeCourses];

    if (sortKey === "gpa") {
      result = sortUtil.sortCoursesByGPA(result);
    } else {
      result = sortUtil.sortCoursesByCode(result);
    }

    if (!sortAsc) {
      result = sortUtil.reverse(result);
    }

    return result;
  }, [activeCourses, sortKey, sortAsc]);
  

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

        <FilterPanel title="Categories" 
            loading={loading} 
            count={categories.length}
            filters={categories}
            isActiveKey={isActive}
            onToggleKey={toggleKey}>

        </FilterPanel>

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

                <div className="filterModeToggle">
                  <span className="filterModeLabel">Match</span>

                  <div className="segmentedControl">
                    <button
                      className={`segment ${filterMode === "OR" ? "active" : ""}`}
                      onClick={() => setFilterMode("OR")}
                      type="button"
                    >
                      Any filter
                    </button>

                    <button
                      className={`segment ${filterMode === "AND" ? "active" : ""}`}
                      onClick={() => setFilterMode("AND")}
                      type="button"
                    >
                      All filters
                    </button>

                    

                  </div>

                  
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

          <div className="sortControls">
    <select
      className="sortSelect"
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value)}
    >
      <option value="code">Sort by Course Code</option>
      <option value="gpa">Sort by Difficulty (GPA)</option>
    </select>

    <button
      className={`sortReverseBtn ${sortAsc ? "asc" : "desc"}`}
      onClick={() => setSortAsc(v => !v)}>

        {sortAsc ? "Ascending ↑" : "Descending ↓"}

    </button>
  </div>


          <CourseGrid courses={activeCourses}>
          </CourseGrid>
        </section>
      </div>
    </div>
  )
}

export default CourseList
