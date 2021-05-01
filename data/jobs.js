const mongoCollections = require("./../config/mongoCollections");
const ObjectId = require("mongodb").ObjectId;
const jobs = mongoCollections.users;

async function createJob(
  compensation,
  perHour,
  title,
  description,
  datePosted,
  address,
  creatorId
) {
  // handle inputs
  try {
    await checkInputs();
  } catch (e) {
    throw new Error(e);
  }

  const jobsCollection = await jobs();

  let newJob = {};

  const insertInfo = await jobsCollection.insertOne(newJob);
  if (insertInfo.insertedCount === 0) throw "Could not create user!";

  const newId = insertInfo.insertedId;

  const job = await this.readByID(newId.toString());

  return job;
}

async function readByID(id) {
  // handle inputs
  if (id === undefined) throw "Input must be provided for 'id' parameter!";
  if (typeof id !== "string") throw "Input id must be a string!";
  if (!ObjectId.isValid(id)) throw "Input id must be a valid ObjectID!";

  const usersCollection = await users();

  const job = await jobsCollection.findOne({ _id: ObjectId(id) });
  if (job === null) throw "No user with that id!";

  return job;
}

// to be implemented
async function checkInputs() {}

module.exports = { createJob, readByID };
