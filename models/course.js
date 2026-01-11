
import { connectToDatabase, getCollection, closeDatabaseConnection } from "../server/database.js";
import fs from "fs/promises";
class Course {
    code;
    title;

    is_required;

    area;

    languages;
    technologies;

    average_gpa;

    constructor(code, title, is_required, area, languages, technolgies, average_gpa) {
        this.code = code;
        this.title = title;
        this.is_required = is_required;
        this.area = area;
        this.languages = languages;
        this.technologies = technolgies;
        this.average_gpa = average_gpa;
    }



    static async createCourseIndex() {
        
        try {
            const db = await connectToDatabase();
            const courseCollection = db.collection("courses");

            const courses = await courseCollection.find({}).toArray();
            let formatted_courses = this.formatJsonCourses(courses);
            //console.log(formatted_courses);
            return formatted_courses;
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
            return new Course(json.code, json.title, json.is_required, json.area, json.languages, json.technologies, json.average_gpa);
        } catch(error ) {
            console.error(`Json of Course Object ${json.code} does not have needed fields... ${error}`);
            return "Error in jsonToCourse"
        }
        
    }
}

export default Course