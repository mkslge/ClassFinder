class Course {
    code;
    title;

    is_required;

    area;

    languages;
    technologies;

    averageGPA;

    constructor(code, title, isRequired, area, languages, technolgies, averageGPA) {
        this.code = code;
        this.title = title;
        this.isRequired = isRequired;
        this.area = area;
        this.languages = languages;
        this.technologies = technolgies;
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

    getArea() {
        return this.area;
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
    
}

export default Course