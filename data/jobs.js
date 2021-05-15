const mongoCollections = require("./../config/mongoCollections");
const ObjectId = require("mongodb").ObjectId;
const jobs = mongoCollections.jobs;

async function getJobs() {
  let jobsCollection = await jobs();
  const jobsList = await jobsCollection.find({}).toArray();

  console.log(jobsList)
  return jobsList;
}


//create job 
async function createJob(compensation, perHour, title, description, datePosted, address, creatorId, status) {
  // handle inputs
 
  await checkInputs(
    compensation,
    perHour,
    title,
    description,
    datePosted,
    address,
    creatorId
  );

  const jobsCollection = await jobs();

  let newJob = {
    compensation : Number(compensation),
    perHour : perHour,
    title : title,
    description : description,
    datePosted : new Date(datePosted),
    address : address,
    creatorId : creatorId,
    employeeId : '',
    status : status,
  };

  const insertInfo = await jobsCollection.insertOne(newJob);
  if (insertInfo.insertedCount === 0) throw "Could not create job!";

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

async function removeJob(id) {
  const jobsCollection = await jobs();
  try {
    let jobToDelete = await this.readByID(id);
  } catch (e) {
    console.log(e);
    return;
  }

  const deleteInfo = await jobsCollection.deleteOne({ _id : ObjectId(id) })

  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete post with id of ${id}`;
  }

  return true;
}

async function updateJob(id, jobToUpdate) {
  try {
    let {compensation, perHour, title, description, datePosted, address, creatorId} = jobToUpdate;
    await checkInputs(compensation, perHour, title, description, datePosted, address, creatorId);

    if (!ObjectId.isValid(id)) {
      throw "Update job: Object id is not valid"
    }

    const jobsCollection = await jobs();

    await jobsCollection.updateOne({ _id: ObjectId(id)}, {$set : jobToUpdate})

  } catch (e) {
    console.log(e);
    return;
  }
}

async function checkCompensation(compensation) {
  let error = false;
  let message = "";
  if (isNaN(compensation) || !Number(compensation) > 0) {
    error = true;
    message = "Compensation must be a positive number"
  }

  return {error : error, message : message }
}

async function checkPerHour(perHour) {
  let error = false;
  let message = "";

  if (typeof perHour !== "boolean" || perHour === null || perHour === undefined) {
    error = true;
    message = "Perhour must be of type boolean"
  }

  return {error : error, message : message }
}

async function checkTitle(title) {
  let error = false;
  let message = "";
  
  if (typeof title !== "string" || !(title.trim())) {
    error = true;
    message = "Title must be a non empty string"
  }

  return {error : error, message : message }
}

async function checkDescription(description) {
  let error = false;
  let message = "";

  if (!description || typeof description !== 'string' ||  !description.trim() ||  description === null || description === "") {
    error = true;
    message = "Description must be a non empty string"
  }

  return { error : error, message : message }
}

async function checkDatePosted(datePostedObj) {
  let error = false;
  let message = "";

  if (!(datePostedObj instanceof Date) || isNaN(datePostedObj.valueOf())) {
    error = true;
    message = "Date posted must be of type date"
  }

  return {error : error, message : message }
}

async function checkAddress(address) {
  let error = false;
  let message = "";
  
  if (typeof address !== 'object' || !address || address === null) {
    error = true; 
    message = "Address must be of type object"
    
  }

  if (!address.street) {
    error = true;
    message = "Address must contain a street"
  }

  if (typeof address.street !== 'string' || !address.street.trim()) {
    error = true; 
    message = "Address street name must be a non empty string"
    
  }

  if (!address.zipCode || address.zipCode.length !== 5 || isNaN(parseInt(address.zipCode))) {
      error = true; 
      message = "Address zipcode must be a number"; 
  }

  if (!address.state ||  typeof address.state !== 'string' || !(address.state.trim())) {
    error = true; 
    message = "Address state must be a string"; 
  }

  if (typeof address.town !== 'string' || !address.town || !(address.town.trim())) {
    error = true; 
    message = "Address town must be a number"; 
  }

  return {error : error, message : message };
}

async function checkCreatorId(creatorId) {
  let error = false;
  let message = "";

  if (!ObjectId.isValid(creatorId) || !creatorId) {
    error = true; 
    message = "Creator id must be of type ObjectId"
  }
  
  return {error : error, message : message };
}

async function checkInputs(compensation, perHour, title, description, datePosted, address, creatorId) {
  let error = false;
  let errorObj = {
    compensation : compensation,
    perHour      :      perHour,
    title        :        title,
    description  :  description,
    datePosted   :   new Date(datePosted),
    address      :      address, 
    creatorId    :    creatorId
  }

  let errorFunctions = [checkCompensation, checkPerHour, checkTitle, checkDescription, checkDatePosted,
                        checkAddress, checkCreatorId];

  let index = 0;
    
  for (let [key, value] of Object.entries(errorObj)) {
    value = (await errorFunctions[index](value));
    
    if (value && value.error) {
      throw value.message;
    }

    index++;
  }

}

async function searchByTerms(terms) {
  let jobsList = [];

  if (typeof terms !== 'string'){
    throw "Search term must be a string"
  }
  if (!terms || terms.trim() === '') {
    throw "No terms provided";
  }

  const jobCollection = await jobs();

  terms = terms.toLowerCase();
  termsReg = new RegExp(terms, 'i');
  termsAsNum = parseFloat(terms);

  jobsList = await jobCollection.find({ $or: [
     {title : termsReg},
     {compensation : {$gt : termsAsNum - 1, $lt : termsAsNum + 1}},
     {description : termsReg},
     {'address.town' : termsReg}
  ]}).toArray();

  if (jobsList === []) throw "No jobs with that search term";

  return jobsList;
}

module.exports = { getJobs, createJob, readByID, removeJob, updateJob, searchByTerms };
