import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_ATLAS_URI;
const dbName = process.env.NEXT_ATLAS_DATABASE;

if (!uri) {
  throw new Error('❌ Lipsă variabilă NEXT_ATLAS_URI în .env.local');
}

if (!dbName) {
  throw new Error('❌ Lipsă variabilă NEXT_ATLAS_DATABASE în .env.local');
}

let mongoClient;
let cachedDb;

export async function connectToDatabase() {
  if (mongoClient && cachedDb) {
    return { client: mongoClient, database: cachedDb };
  }

  mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  cachedDb = mongoClient.db(dbName);
  return { client: mongoClient, database: cachedDb };
}
