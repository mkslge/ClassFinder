class Course {
    code;
    title;

    is_required;

    keywords;
    languages;
    technologies;

    averageGPA;

    constructor(code, title, isRequired, keywords, languages, technolgies, averageGPA) {
        this.code = code;
        this.title = title;
        this.isRequired = isRequired;
        this.keywords = keywords ?? [];
        this.languages = languages ?? [];
        this.technologies = technolgies ?? [];
        this.averageGPA = averageGPA;
    }

    getCode() {
        return this.code;
    }

    getTitle() {
        return this.title;
    }

    getIsRequired() {
        return this.isRequired;
    }

    getKeywords() {
        return this.keywords;
    }

    getLanguages() {
        return this.languages;
    }

    getTechnologies() {
        return this.technologies;
    }

    getAverageGPA() {
        return this.averageGPA;
    }

    static mapCourseJson(jsonList) {
        return jsonList.map(courseJson => this.jsonToCourse(courseJson))
    }

    static jsonToCourse(json) {
        return new Course(
                    json.code,
                    json.title,
                    json.isRequired ?? json.is_required,
                    json.keywords ?? [],
                    json.languages ?? [],
                    json.technologies ?? [],
                    json.averageGPA
        )
    }

    static sortCourses(list) {
        return list.sort((c1, c2) => c1.code.localeCompare(c2.code))
    }
    
}

export default Course