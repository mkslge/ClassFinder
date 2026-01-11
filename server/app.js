import express from "express";
import "dotenv/config"; 
import { connectToDatabase, getCollection, closeDatabaseConnection } from "./database.js";


const portNumber = 3030;
const app = express();


app.listen(portNumber, () => {
    console.log(`Server running at http://localhost:${portNumber}`);
});


app.get("/", async(req, res) => {
    console.log("Hello World!");
    res.send("Hello World");
});

app.get("/connect", async(req, res) => {
    try {
        const db = await connectToDatabase();
        console.log(await getCollection("courses"));
        res.send(`Connected to ${db.databaseName}`);
        
    } catch(error) {
        console.log("Error");
        res.status(500).send("Error, DB Couldn't Connect.");
    }
});

app.get("/courses", async(req, res) => {
    try {
        const db = await connectToDatabase();
        let count = await db.collection("courses").estimatedDocumentCount();
        console.log(count);
        res.send(count);
    } catch(error) {
        res.status(500).send("Error, /courses");
    }
});



