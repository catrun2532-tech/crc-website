import { MongoClient } from "mongodb";

<<<<<<< HEAD
const client = new MongoClient("mongodb://127.0.0.1:27017");

const clientPromise = client.connect();

export default clientPromise;
=======
const uri = "mongodb://127.0.0.1:27017";
const options = {};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise; // ⭐ สำคัญมาก
>>>>>>> 7bc84aa (fix tailwind config)
