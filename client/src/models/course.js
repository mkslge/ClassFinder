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
    
}

export default Course