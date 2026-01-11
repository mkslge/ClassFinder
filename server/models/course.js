
import { connectToDatabase, getCollection, closeDatabaseConnection } from "../database.js";
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

            await  fs.writeFile("courses.json", 
                JSON.stringify(courses, null, 2),
                "utf8"
            );
            let formatted_courses = JSON.stringify(courses, null, 2);
            console.log(formatted_courses);
            return formatted_courses;
        } catch(error) {
            console.error("Failed to fetch course index.");
            return "Error";
        }
    }



}

export default Course