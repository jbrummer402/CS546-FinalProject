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
    compensation : compensation,
    perHour : perHour,
    title : title,
    description : description,
    datePosted : datePosted,
    address : address,
    creatorId : creatorId,
    status : status
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
  const jobCollection = await jobs();
  try {
    let jobToDelete = await this.readByID(id);
  } catch (e) {
    console.log(e);
    return;
  }

  const deleteInfo = jobsCollection.removeOne({ _id : ObjectId(id) })
  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete post with id of ${id}`;
  }

  return true;
}

async function updateJob(id, jobToUpdate) {
  try {
    await this.checkInputs(jobToUpdate);

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
  if (isNaN(parseFloat(compensation))) {
    error = true;
    message = "Compensation must be of type float"
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

async function checkDatePosted(datePosted) {
  let error = false;
  let message = "";

  if (!(datePosted instanceof Date) || isNaN(datePosted.valueOf())) {
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

  if (typeof address.street !== 'object' || !address.street || address.street === null) {
    error = true; 
    message = "Address must contain street of type object"
  
  }


  if (!address.street.streetName || typeof address.street.streetName !== 'string' || address.street.streetName === null) {
    if (!address.street.streetName) {
      error = true; 
      message = "Address street name does not exist"
      
    }
  
    if (typeof address.street.streetName !== 'string' || !address.street.streetName.trim() || !isNaN(parseInt(address.street.streetName))) {
      error = true; 
      message = "Address street name must be a non empty string"
      
    }
  }
  
  if (!address.street.streetNo || isNaN(parseInt(address.street.streetNo)) || 
      typeof address.street.streetNo !== 'number' || 
      address.street.streetNo === null) {
      error = true; 
      message = "Address street number must be a number" 
      
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
    datePosted   :   datePosted,
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

  if (typeof terms !== 'object'){
    throw "Search term must be an object"
  }

  if (!terms || !terms.trim()) {
    throw "No terms provided";
  }


  for (let [key, value] in Object.entries(terms)) {
    // search through every term in the search term and make sure they don't raise errors
    await checkInputs((key = value));
    if (String(value).contains) {
      jobsList.append({ key : value });
    }
  }

  if (jobsList === []) throw "No jobs with that search term";

  return jobsList;
}

module.exports = { getJobs, createJob, readByID, removeJob, updateJob, searchByTerms };
