class Course {
    code;
    title;

    is_required;

    keywords;
    languages;
    technologies;
    categories

    averageGPA;

    constructor(code, title, isRequired, keywords, languages, technolgies, categories, averageGPA) {
        this.code = code;
        this.title = title;
        this.isRequired = isRequired;
        this.keywords = keywords ?? [];
        this.languages = languages ?? [];
        this.technologies = technolgies ?? [];
        this.categories = categories ?? [];
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

    getCategories() {
        return this.categories;
    }

    getAverageGPA() {
        return this.averageGPA;
    }

    getAverageGPADisplay() {
        return this.averageGPA !== -1 ? this.averageGPA : "Unknown";
    }

    getGPAColor(aGPA) {
        if (aGPA === "Unknown" || Number.isNaN(Number(aGPA))) return "#888";

        const gpa = Number(aGPA);
        const clamped = Math.max(0, Math.min(4, gpa));
        const t = clamped / 4; 

        const r = Math.round(255 * (1 - t));
        const g = Math.round(180 * t + 50);
        const b = 80;

        return `rgb(${r}, ${g}, ${b})`;
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
                    json.categories ?? [],
                    json.averageGPA
        )
    }

    static sortCourses(list) {
        return list.sort((c1, c2) => c1.code.localeCompare(c2.code))
    }
    
}

export default Course