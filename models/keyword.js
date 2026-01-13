import { connectToDatabase, getCollection, closeDatabaseConnection } from "../server/database.js";


class Keyword {
    static async getKeywordList() {
        
        try {
            const db = await connectToDatabase();
            const keywordCollection = db.collection("keywords");
            
            const keywordDoc = await keywordCollection.findOne({type : "course_keywords" })
            return keywordDoc?.keywords ?? []
        } catch(error) {
            console.error("Failed to fetch course index.");
            return "Error";
        }
    }

}

export default Keyword;

