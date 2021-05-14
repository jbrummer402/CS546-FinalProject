const express = require("express");
const router = express.Router();
const data = require("../data");
const jobsData = data.jobs;
const userData = data.users;
const reviewData = data.reviews;
const ObjectId = require("mongodb").ObjectId;
const xss = require('xss');

router.post("/", async (req, res) => {
  let {
    compensation,
    perHour,
    title,
    description,
    datePosted,
    address,
    creatorId,
  } = req.body;

  // // handle inputs
  const { errorCode, message } = await checkInputs();
  if (errorCode !== 0) {
    res.status(errorCode).json({ error: message });
    return;
  }

  try {
    const newJob = await jobsData.create(
      compensation,
      perHour,
      title,
      description,
      datePosted,
      address,
      creatorId
    );
    res.json(newJob);
  } catch (e) {
    res.sendStatus(500);
  }
});

//get every job
router.get("/", async (req, res) => {
  try {
    /* I dont know that error checking is necessary for inputs here since its a get */
    //const { errorCode, message } = await checkInputs();
    /*if (errorCode !== 0) {
      res.status(errorCode).json({ error: message });
      return;
    } */
    let everyJob = await jobsData.getJobs();
    res.json(everyJob);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/search/:searchTerm', async (req, res) => {
  try {
    let searchData = await jobsData.searchByTerms(xss(req.params.searchTerm));
    /*const { errorCode, message } = await checkInputs();
    if (errorCode !== 0) {
      res.status(errorCode).json({ error: message });
      return;
    } */
    res.json(searchData);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "job not found" });
  }
});

router.get('/:id', async(req, res) => {
  if (!req.params.id) {
    res.status(404).send({message: "Id is not given"});
    return;
  }
  if (!ObjectId.isValid(xss(req.params.id))) {
    res.status(404).send({message: "Id is not valid"});
    return;
  }
  try {
    /*const { errorCode, message } = await checkInputs();
    if (errorCode !== 0) {
      res.status(errorCode).json({ error: message });
      return;
    } */

    const jobById = await jobsData.readByID(xss(req.params.id));
    const posterInfo = await userData.readByID(jobById.creatorId.toString());

    // need to get average rating and we currently dont have a better way
    let rateAvg = 0;
    
    let reviewsOf = await reviewData.getReviewsReceivedForUser(posterInfo._id.toString());

    for (let i = 0; i < reviewsOf.length; i++){
      rateAvg += reviewsOf[i].rating;
    }
    if (rateAvg === 0){
      rateAvg = 'N/A';
    } else {
      rateAvg = Math.round((rateAvg/reviewsOf.length)*100)/100;
    }
    let username;
    if (!req.session.AuthCookie){
      username = false;
    } else {
      username = req.session.AuthCookie.username;
    }
    res.render('partials/job', {data: {title: jobById.title, logged: {uname: username}, 
      job: jobById, poster: posterInfo, average: rateAvg}});
  } catch (e) {
    res.status(500).send({error : e});
  }
})

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

module.exports = router;
