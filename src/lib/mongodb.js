import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

const clientPromise = client.connect();

export default clientPromise;