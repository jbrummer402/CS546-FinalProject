const mongoCollections = require("./../config/mongoCollections");
const ObjectId = require("mongodb").ObjectId;
const jobs = mongoCollections.jobs;

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

  const jobsCollection = await jobs();

  const job = await jobsCollection.findOne({ _id: ObjectId(id) });
  if (job === null) throw "No job with that id!";

  return job;
}

async function checkCompensation(compensation) {
  let error = false;
  let message = "";
  if (isNaN(parseFloat(compensation))) {
    error = false;
    message = "Compensation must be of type float"
  }

  return {error : error, message : message }
}

async function checkPerHour(perHour) {
  let error = false;
  let message = "";
  
  if (typeof perHour != "boolean") {
    error = false;
    message = "Perhour must be of type bool"
  }

  return {error : error, message : message }
}

async function checkTitle(title) {
  let error = false;
  let message = "";
  if (typeof title != "string" || !(title.trim())) {
    error = false;
    message = "Title must be a non empty string"
  }

  return {error : error, message : message }
}

async function checkDescription(description) {
  let error = false;
  let message = "";
  if (typeof description != "string" || !(description.trim())) {
    error = false;
    message = "Description must be a non empty string"
  }

  return {error : error, message : message }
}

async function checkDatePosted(datePosted) {
  let error = false;
  let message = "";
  if (!datePosted instanceof Date || isNaN(datePosted.valueOf())) {
    error = false;
    message = "Date posted must be of type date"
  }

  return {error : error, message : message }
}

async function checkAddress(address) {
  let error = false;
  let message = "";

  if (!(typeof address === 'object' && address !== null)) {
    error = true; 
    message = "Address must be of type object"
  }

  return {error : error, message : message};
}

async function checkCreatorId(creatorId) {
  let error = false;
  let message = "";

  if (!ObjectId.isValid(creatorId)) {
    error = true; 
    message = "Creator id must be of type ObjectId"
  }

  return {error : error, message : message};
}

async function checkInputs(compensation, perHour, title, description, datePosted, address, creatorId) {
  let error = false;
  let errorObj = {
    compensation : error,
    perHour : error,
    title : error,
    description : error,
    datePosted : error,
    address : error, 
    creatorId : error
  }
  if (!compensation || !perHour || !title || !description || !datePosted || !address || !creatorId) {
    error = true;

    return {error : error, message : "Inputs must be provided for the following: compensation, perHour, title, description, datePosted, address, creatorId"}

  }    

}

module.exports = { createJob, readByID };
