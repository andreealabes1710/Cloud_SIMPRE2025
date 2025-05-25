import { sendMethodNotAllowed, sendOk } from '@/utils/apiMethods.js';
import { getCollection } from '@/utils/functions';
import { ObjectId } from 'mongodb';

const COLLECTION_NAME = 'records';

const getRecords = async () => {
  const collection = await getCollection(COLLECTION_NAME);
  return collection.find({}).toArray();
};

const getRecord = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const collection = await getCollection(COLLECTION_NAME);
  return collection.findOne({ _id: new ObjectId(id) });
};

const postRecord = async (record) => {
  const collection = await getCollection(COLLECTION_NAME);
  return collection.insertOne(record);
};

const putRecord = async (record) => {
  const collection = await getCollection(COLLECTION_NAME);
  const id = record._id;
  delete record._id;
  return collection.updateOne({ _id: new ObjectId(id) }, { $set: record });
};

const deleteRecord = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const collection = await getCollection(COLLECTION_NAME);
  return collection.deleteOne({ _id: new ObjectId(id) });
};

export default async function handler(req, res) {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!allowedMethods.includes(req.method)) {
    return sendMethodNotAllowed(res);
  }

  try {
    if (req.method === 'GET' && req.query.id) {
      const id = req.query.id;
      const record = await getRecord(id);
      return sendOk(res, record);
    }

    if (req.method === 'GET') {
      const records = await getRecords();
      return sendOk(res, records);
    }

    if (req.method === 'POST') {
      const record = req.body;
      const result = await postRecord(record);
      return sendOk(res, result);
    }

    if (req.method === 'PUT') {
      const record = req.body;
      const result = await putRecord(record);
      return sendOk(res, result);
    }

    if (req.method === 'DELETE') {
      const id = req.query.id;
      const result = await deleteRecord(id);
      return sendOk(res, result);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
