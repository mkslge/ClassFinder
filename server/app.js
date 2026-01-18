import express from "express";
import http from "http"
import cors from "cors";
import "dotenv/config"; 
import { connectToDatabase, getCollection, closeDatabaseConnection } from "./database.js";
import Course from "../models/course.js";
import Keyword from "../models/keyword.js";
import { getSemester } from "../utility/term.js";


const hostname = '0.0.0.0';
const portNumber = 3030;
const app = express();


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\\n')
})

app.listen(portNumber, hostname, () => {
    console.log(`Server running at http://${hostname}:${portNumber}/`)
});

/*app.use(cors({
    origin: "http://10.216.190.240:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))*/
app.use(cors());
app.use(express.json());     



app.get("/", async(req, res) => {
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

app.get("/courses", async(req, res) => {
    try {
        let courses = await Course.getCourseList();


        res.send(courses);
    } catch(error) {
        res.status(500).send("Error in courses");
    }
});

app.get("/courses/offered", async(req, res) => {
    try {
        let courses = await Course.getOfferedCourseList();


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
            if(technologies !== undefined) {
                for(let j = 0; j < technologies.length;j++) {
                    set.add(technologies[j]);
                }
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
            if(languages !== undefined) {
                for(let j = 0; j < languages.length;j++) {
                    set.add(languages[j]);
                }
            }
            
        }

        let result = [...set];
        res.json(result);
    } catch(error) {
        console.log(`Error in /courses/languages, ${error}`);
    }
});



app.get("/courses/categories", async(req, res) => {
    try {
        let courses = await Course.getCourseList();
        let set = new Set();
        for(let i = 0; i < (await courses).length;i++) {
            let categories = courses[i].categories;
            if(categories !== undefined) {
                for(let j = 0; j < categories.length;j++) {
                    set.add(categories[j]);
                }
            }
        }

        let result = [...set];
        res.json(result);
    } catch(error) {
        console.error(`Error in courses/categories. ${error}`);
    }
});

app.get("/courses/keywords", async(req, res) => {
    try {
        let courses = await Course.getCourseList();
        let set = new Set();

        for(let i =0; i < (await courses).length;i++) {
            
            let keywords = courses[i].keywords;
            if(keywords !== undefined) {
                for(let j = 0; j < keywords.length;j++) {
                    set.add(keywords[j]);
                }
            }
            
        }

        let result = [...set];
        res.json(result);
    } catch(error) {
        console.log(`Error in /courses/keywords, ${error}`);
    }
});


app.get("/courses/update/semester", async(req, res) => {
    try {
        let currSem = getSemester();

        const db = await connectToDatabase();
        const courseCollection = db.collection("courses");
        const courses = await courseCollection.find({}).toArray();

        let coursesToUpdate = []

        for(let i = 0; i < courses.length;i++) {
            if(await Course.isOfferedCourse(courses[i])) {
                coursesToUpdate.push(courses[i].code);
            }
        }

        const result = await courseCollection.updateMany(
        { code: { $in: coursesToUpdate } },
        { $addToSet: { keywords: currSem } }
        );
        res.send(`${result.modifiedCount} courses changed`)
    } catch(error) {
        console.log(`error in /courses/update/semester, ${error}`);
    }
});




app.post("/addvisitor", async(req, res) => {
    try {
        const visitorColl = await getCollection("visitors");
        const result = await visitorColl.findOneAndUpdate(
            {},
            {$inc: {visitorCount: 1}},
            {returnDocument: "after"}
        )
        res.json(
            {success:true, visitors: result.visitorCount}
        )

    } catch(error) {
        console.error(`Error in /addvisitor, ${error}`)
    }
});

app.get("/changekey", async(req, res) => {
    try {
        const db = await connectToDatabase();
        

        const collection = await getCollection("courses");

        await collection.updateMany(
            { area: { $exists: true } },
            { $rename: { area: "keywords" } }
            );

        res.send(`Changed key in db ${db.databaseName}`);
    } catch(error) {
        console.log("Error in /changekey");
        res.status(500).send(`Error, DB Couldn't Connect. ${error}`);
    }
});

app.post("/categories/add", async (req, res) => {
  try {
    const { category, codes } = req.body;

    
    if (
      !category ||
      !Array.isArray(codes) ||
      codes.length === 0
    ) {
      return res.status(400).json({
        error: "category (string) and codes (non-empty array) are required"
      });
    }

    const collection = await getCollection("courses");

    const result = await collection.updateMany(
      { code: { $in: codes } },
      { $addToSet: { categories: category } }
    );

    res.json({
      category,
      matched: result.matchedCount,
      modified: result.modifiedCount
    });

  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});









