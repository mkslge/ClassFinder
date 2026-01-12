import Filter from '../models/filter.js'


export function makeTechnologyFilter(technology) {
  return new Filter(
    `technology:${technology}`,
    (course) => course.getTechnologies().includes(technology)
  )
}

export function makeLanguageFilter(language) {
    return new Filter(
    `language:${language}`,
    (course) => course.getTechnologies().includes(language)
  )
}


export function toggleFilter(activeFilters, filter) {
  const key = filter.getName()
  const exists = activeFilters.some(f => f.getName() === key)

  return exists
    ? activeFilters.filter(f => f.getName() !== key)
    : [...activeFilters, filter]
}

export function applyFilters(allCourses, activeFilters) {
  return activeFilters.reduce(
    (acc, f) => acc.filter(f.getFilterFunction()),
    allCourses
  )
}

