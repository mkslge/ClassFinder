
import { connectToDatabase, getCollection, closeDatabaseConnection } from "../server/database.js";
import fs from "fs/promises";
class Course {
    code;
    title;

    isRequired;

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

    getLanguages() {
        return this.languages;
    }

    getTechnologies() {
        return this.technologies;
    }




    static async getCourseList() {
        
        try {
            const db = await connectToDatabase();
            const courseCollection = db.collection("courses");

            const courses = await courseCollection.find({}).toArray();
            
            return courses;
        } catch(error) {
            console.error("Failed to fetch course index.");
            return "Error";
        }
    }

    static formatJsonCourses(courses) {
        let lst = [];
        for(let i = 0; i < courses.length;i++) {
            lst.push(this.jsonToCourse(courses[i]));
        }
        return lst;
    }


    static jsonToCourse(json) {
        try {
            return new Course(json.code, json.title, json.isRequired, json.area, json.languages, json.technologies, json.averageGPA);
        } catch(error ) {
            console.error(`Json of Course Object ${json.code} does not have needed fields... ${error}`);
            return "Error in jsonToCourse"
        }
        
    }
}

export default Course