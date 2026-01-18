
import { connectToDatabase, getCollection, closeDatabaseConnection } from "../database.js";
import fs from "fs/promises";

import * as Cons from "../utility/constants.js"
import { getTestudoLink, getSemester } from "../utility/term.js";
class Course {
    code;
    title;

    isRequired;

    keywords;

    languages;
    technologies;
    categories;

    averageGPA;

    constructor(code, title, isRequired, keywords, languages, technolgies, categories, averageGPA) {
        this.code = code;
        this.title = title;
        this.isRequired = isRequired;
        this.keywords = keywords;

        this.languages = languages;
        this.technologies = technolgies;
        this.categories = categories;

        this.averageGPA = averageGPA;
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

    
    /* STATIC FUNCTIONS */

    static async getCourseList() {
        
        try {
            const db = await connectToDatabase();
            const courseCollection = db.collection("courses");
            const courses = await courseCollection.find({}).toArray();
            return courses;
        } catch(error) {
            console.error(`Error in get Course List, ${error}`);
            return "Error";
        }
    }

    static async getOfferedCourseList() {
        try {
            const db = await connectToDatabase();
            const courseCollection = db.collection("courses");

            let courses = await courseCollection.find({}).toArray();

            const currSemester = getSemester();

            for(let i= 0; i < courses.length;i++) {
                const offered = await this.isOfferedCourse(courses[i]);
                if(offered) {
                    courses[i].keywords ??= [];
                    courses[i].keywords.push(currSemester)
                }
            }

            return courses
        } catch(error) {
            console.error(`Error in get Course List, ${error}`);
            return "Error";
        }
    }

    static async isOfferedCourse(course) {
        let courseLink = getTestudoLink(course.code);
        

        const res = await fetch(courseLink);
        const html = await res.text();
        if(html.includes("No courses matched your search filters above.")) {
            return false;
        } else {
            return true;
        }
        return !html.includes("No courses matched your search filters above.")
    }


    static jsonToCourse(json) {
        try {
            return new Course(json.code, json.title, json.isRequired, json.keywords, json.languages, json.technologies,json.categories,json.averageGPA);
        } catch(error ) {
            console.error(`Json of Course Object ${json.code} does not have needed fields... ${error}`);
            return "Error in jsonToCourse"
        }
        
    }
}

export default Course