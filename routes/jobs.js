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
  } = req.body;
  const creatorId = req.session.AuthCookie.id;
  const user = await userData.readByID(creatorId);

  // // handle inputs
  const { errorCode, message } = await checkInputs(
      compensation,
      perHour,
      title,
      description,
      datePosted,
      address,
      creatorId
  );
  if (errorCode !== 0) {
    res.json({ error: message });
    return;
  }

  try {
    const newJob = await jobsData.createJob(
      compensation,
      perHour,
      title,
      description,
      datePosted,
      address,
      creatorId,
        'active'
    );
    user.jobsActive.push(newJob._id.toString())
    try {
      userData.update({id: creatorId, jobsActive: user.jobsActive});
    } catch (e) {
      console.error(e);
    }
    res.json(newJob);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  const jobID = req.params.id;
  let job = await jobsData.readByID(jobID);
  const userID = req.session.AuthCookie.id;
  const user = await userData.readByID(userID);

  job.status = 'completed';

  console.log(job)

  // update job
  try {
    await jobsData.updateJob(jobID, job);

    // move job to correct array
    user.jobsInProgressAsEmployer = user.jobsInProgressAsEmployer.filter(function(item) {
      return item !== jobID;
    })
    user.jobsProvided.push(jobID);
    try {
      userData.update({
        id: userID,
        jobsInProgressAsEmployer: user.jobsInProgressAsEmployer,
        jobsProvided: user.jobsProvided});
    } catch (e) {
      console.error(e);
    }

    res.json({ userId: req.params.id, updated: true });
  } catch (e) {
    console.error(e)
    res.sendStatus(500);
  }

})

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
    
    if (typeof xss(req.params.searchTerm) !== 'string'){
      throw "Search term must be a string"
    }
    if (!xss(req.params.searchTerm) || xss(req.params.searchTerm).trim() === '') {
      throw "No terms provided";
    }
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

    jobById.datePosted = jobById.datePosted.toDateString();
    
    res.render('partials/job', {data: {title: jobById.title, logged: {uname: username}, 
      job: jobById, poster: posterInfo, average: rateAvg}});
  } catch (e) {
    res.status(500).send({error : e});
  }
})

router.patch('/:id', async (req, res) => {
  const jobBody = req.body;
  let updatedJob = {};
  try {
    const currentJob = await jobsData.readByID(req.params.id);

    for (let [key, value] in Object.entries(jobBody)) {
      if (currentJob[key] !== value) {
        updatedJob[key] = value;
      }
    }

    return updatedJob;
  } catch (e) {
    res.status(400).json({error : e});
  }
router.delete("/:id", async (req, res) => {
  let jobID = req.params.id;
  const userID = req.session.AuthCookie.id;
  const user = await userData.readByID(userID);

  // TODO: check if jobID is valid

  // TODO: check if jobID exists

  // TODO: make sure only a signed in user can delete

  // remove job
  try {
    await jobsData.removeJob(jobID);

    // remove job from user's job array
    user.jobsActive = user.jobsActive.filter(function(item) {
      return item !== jobID;
    })
    try {
      userData.update({id: userID, jobsActive: user.jobsActive});
    } catch (e) {
      console.error(e);
    }

    res.json({ userId: req.params.id, deleted: true });
  } catch (e) {
    console.error(e)
    res.sendStatus(500);
  }
});

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
  let errorCode = 0;
  let message = "";

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
      return { errorCode: 400, message: value.message }
      // throw value.message;
    }

    index++;
  }

  return { errorCode: 0, message: "" };

}

module.exports = router;
