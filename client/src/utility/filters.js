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

export function applyFilters(courses, activeKeys, filterMode) {
  if (!activeKeys || activeKeys.size === 0) return courses;

  const tech = [];
  const lang = [];
  const kw = [];

  for (const key of activeKeys) {
    const [type, value] = key.split(":");
    if (type === "tech") tech.push(value);
    else if (type === "lang") lang.push(value);
    else if (type === "kw") kw.push(value);
  }

  return courses.filter(course => {
    if(filterMode === "AND") {
        const techOk = tech.length === 0 || tech.every(t => course.getTechnologies().includes(t));
        const langOk = lang.length === 0 || lang.every(l => course.getLanguages().includes(l));
        const kwOk = kw.length === 0 || kw.every(k => course.getKeywords().includes(k));
        
        return techOk && langOk && kwOk;
    } else { /** OR filter mode */
        const techOk = tech.length === 0 || tech.some(t => course.getTechnologies().includes(t));
        const langOk = lang.length === 0 || lang.some(l => course.getLanguages().includes(l));
        const kwOk = kw.length === 0 || kw.some(k => course.getKeywords().includes(k));
        return techOk && langOk && kwOk;
    }
  });
}

export function getFindMessage(name, amount) {
    switch (amount) {
        case 0:
            return `No ${name}s found`
        case 1:
            return `1 ${name} found`
        default:
            return `${amount} ${name}s found`
    }
}

export function toggleFilterMode(currMode) {
    return currMode === "OR" ? "AND" : "OR";
}


