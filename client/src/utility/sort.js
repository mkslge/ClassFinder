
import Course from '../models/course.js'


export function sortCoursesByCode(courses) {
    return [...courses].sort( (c1, c2) => 
        c1.code.localeCompare(c2.code)
    )
}

export function sortCoursesByGPA(courses) {
    return [...courses].sort((c1, c2) =>
        c1.averageGPA - c2.averageGPA
    )
}

export function reverse(courses) {
    return [...courses].reverse();
}