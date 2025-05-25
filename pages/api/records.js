import { connectToDatabase } from "@/lib/mongodb";

const COLLECTION_NAME = "25.records";

export default async function handler(req, res) {
  const { database } = await connectToDatabase();
  const collection = database.collection(COLLECTION_NAME);

  if (req.method === "GET") {
    const records = await collection.find({}).toArray();
    return res.status(200).json({ data: records });
  }

  if (req.method === "POST") {
    const { title, author, year, tags } = req.body;

    if (!title || !author || !year || !tags) {
      return res.status(400).json({ error: "Toate câmpurile sunt necesare." });
    }

    const newRecord = {
      title,
      author,
      year: parseInt(year),
      tags: Array.isArray(tags) ? tags : tags.split(",").map((t) => t.trim()),
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newRecord);
    return res.status(201).json({ success: true, insertedId: result.insertedId });
  }

  if (req.method === "DELETE") {
    const { ObjectId } = await import("mongodb");
    const result = await collection.deleteOne({ _id: new ObjectId(req.query.id) });
    return res.status(200).json({ success: true, deletedCount: result.deletedCount });
  }

  res.status(405).json({ error: "Method Not Allowed" });
}