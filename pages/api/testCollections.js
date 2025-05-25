// /pages/api/testCollections.js
import { connectToDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
  const { database } = await connectToDatabase();
  const collections = await database.listCollections().toArray();

  res.status(200).json(collections.map(c => c.name));
}
