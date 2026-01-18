



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

export function sortKeywords(keywords) {
    return keywords.sort(kwComp)
}

function kwComp(kw1, kw2) {
    let sortValue = kwCompHelper(kw1) - kwCompHelper(kw2);
    if(sortValue !== 0) {
        return sortValue;
    }
    return kw1.localeCompare(kw2);
}
function kwCompHelper(kw) {
    const compValues = {
        descriptors: 6,
        credits: 5,
        track: 4,
        area: 3,
        level: 2,
        semester: 1,
    }

    if(kw.includes("Spring") || kw.includes("Fall")) {
        return compValues.semester;
    } else if(kw.includes("Level")) {
        return compValues.level;
    } else if(kw.includes("Area")) {
        return compValues.area;
    } else if(kw.includes("Track")) {
        return compValues.track;
    } else if(kw.includes("Credit")) {
        return compValues.credits;
    } else {
        return compValues.descriptors;
    }
}

