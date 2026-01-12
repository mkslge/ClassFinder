
export function filterTechnology(courses, technology) {
    console.log(`filtering technologies`);
    return courses.filter( course => 
    (
        course.getTechnologies().includes(technology)
    ))
}

export function filterLanguage(courses, language) {
    return courses.filter( course => 
    (
        course.getLanguages().includes(language)
    ))
}

export function filterArea(courses, area) {
    return courses.filter( course => 
    (
        course.getArea() === area
    ));
}

