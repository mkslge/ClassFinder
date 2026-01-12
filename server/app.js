import express from "express";
import cors from "cors";
import "dotenv/config"; 
import { connectToDatabase, getCollection, closeDatabaseConnection } from "./database.js";
import Course from "../models/course.js";

const portNumber = 3030;
const app = express();


app.listen(portNumber, () => {
    console.log(`Server running at http://localhost:${portNumber}`);
});

app.use(cors({
    origin: "http://localhost:3000", // temporary frontend link
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))


app.get("/", async(req, res) => {
    console.log("Hello World!");
    res.send("Hello World");
});

app.get("/connect", async(req, res) => {
    try {
        const db = await connectToDatabase();
        

        const collection = await getCollection("courses");

        res.send(`Connected to ${db.databaseName}`);
    } catch(error) {
        console.log("Error");
        res.status(500).send(`Error, DB Couldn't Connect. ${error}`);
    }
});

app.get("/changekey", async(req, res) => {
    try {
        const db = await connectToDatabase();
        

        const collection = await getCollection("courses");

        await collection.updateMany(
            { average_gpa: { $exists: true } },
            { $rename: { average_gpa: "averageGPA" } }
            );

        res.send(`Changed key in db ${db.databaseName}`);
    } catch(error) {
        console.log("Error in /changekey");
        res.status(500).send(`Error, DB Couldn't Connect. ${error}`);
    }
});

app.get("/courses", async(req, res) => {
    try {
        let courses = await Course.getCourseList();


        res.send(courses);
    } catch(error) {
        res.status(500).send("Error in courses");
    }
});

app.get("/courses/technologies", async(req, res) => {
    try {
        let courses = await Course.getCourseList();
        let set = new Set();

        for(let i =0; i < (await courses).length;i++) {
            let technologies = courses[i].technologies;
            for(let j = 0; j < technologies.length;j++) {
                set.add(courses[i].technologies[j]);
            }
        }

        let result = [...set];
        res.json(result);
    } catch(error) {
        console.log(`Error in /courses/technologies, ${error}`);
    }
});

app.get("/courses/languages", async(req, res) => {
    try {
        let courses = await Course.getCourseList();
        let set = new Set();

        for(let i =0; i < (await courses).length;i++) {
            
            let languages = courses[i].languages;
            for(let j = 0; j < languages.length;j++) {
                set.add(courses[i].languages[j]);
            }
        }

        let result = [...set];
        res.json(result);
    } catch(error) {
        console.log(`Error in /courses/technologies, ${error}`);
    }
});





