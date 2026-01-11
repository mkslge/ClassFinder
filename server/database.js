import { MongoClient } from "mongodb";

let client;
let database;
let connect$;

async function _connectToDatabase() {
  if (database) return database;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined");

  client = new MongoClient(uri, { appName: "courses" });
  await client.connect();

  database = client.db("courses");
  console.log(`Connected to database: ${database.databaseName}`);
  return database;
}

export async function connectToDatabase() {
  connect$ ??= _connectToDatabase();
  return connect$; 
}

export async function getCollection(name) {
  const db = await connectToDatabase();
  return db.collection(name);
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = undefined;
    database = undefined;
    connect$ = undefined;
    console.log("Database connection closed");
  }
}
