const express = require("express");
const router = express.Router();
const data = require("../data");
const jobsData = data.jobs;
const userData = data.users;
const reviewData = data.reviews;
const ObjectId = require("mongodb").ObjectId;
const xss = require("xss");

router.post("/", async (req, res) => {
  let { compensation, perHour, title, description, datePosted, address } =
    req.body;
  const creatorId = xss(req.session.AuthCookie.id);
  let user;
  try {
    user = await userData.readByID(creatorId);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }

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
      "active"
    );
    user.jobsActive.push(newJob._id.toString());
    try {
      userData.update({ id: creatorId, jobsActive: user.jobsActive });
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
  const jobID = xss(req.params.id);
  try {
    if (!ObjectId.isValid(jobID)) {
      throw "Job id is not valid"
    }
    let job = await jobsData.readByID(jobID);

    if (!job) {
      throw "No job with that id"
    }

    const employerID = xss(req.session.AuthCookie.id);
    const employeeID = job.employeeId.toString();
    const employer = await userData.readByID(employerID);
    const employee = await userData.readByID(employeeID);

    if (!employer || !employee) {
      throw "No user with that id"
    }

    job.status = "completed";

    // update job
    try {
      await jobsData.updateJob(jobID, job);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
      return;
    }

    // move job to correct array
    employer.jobsInProgressAsEmployer =
      employer.jobsInProgressAsEmployer.filter(function (item) {
        return item !== jobID;
      });
    employee.jobsInProgressAsEmployee =
      employee.jobsInProgressAsEmployee.filter(function (item) {
        return item !== jobID;
      });
    employer.jobsProvided.push(jobID);
    employee.jobsWorked.push(jobID);
    try {
      userData.update({
        id: employerID,
        jobsInProgressAsEmployer: employer.jobsInProgressAsEmployer,
        jobsProvided: employer.jobsProvided,
      });
    } catch (e) {
      console.error(e);
    }

    try {
      userData.update({
        id: employeeID,
        jobsInProgressAsEmployee: employee.jobsInProgressAsEmployee,
        jobsWorked: employee.jobsWorked,
      });
    } catch (e) {
      console.error(e);
    }

    res.json({ userId: req.params.id, updated: true });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

//get every job
router.get("/", async (req, res) => {
  try {
    /* I dont know that error checking is necessary for inputs here since its a get */
    let everyJob = await jobsData.getJobs();

    res.json(everyJob);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/search/:searchTerm", async (req, res) => {
  try {
    if (typeof xss(req.params.searchTerm) !== "string") {
      throw "Search term must be a string";
    }
    if (
      !xss(req.params.searchTerm) ||
      xss(req.params.searchTerm).trim() === ""
    ) {
      throw "No terms provided";
    }
    let searchData = await jobsData.searchByTerms(xss(req.params.searchTerm));
    res.json(searchData);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "job not found" });
  }
});

router.get("/:id", async (req, res) => {
  if (!xss(req.params.id)) {
    res.status(404).send({ message: "Id is not given" });
    return;
  }
  if (!ObjectId.isValid(xss(req.params.id))) {
    res.status(404).send({ message: "Id is not valid" });
    return;
  }
  try {
    const jobById = await jobsData.readByID(xss(req.params.id));
    const posterInfo = await userData.readByID(jobById.creatorId.toString());

    // need to get average rating and we currently dont have a better way
    let rateAvg = 0;

    let reviewsOf = await reviewData.getReviewsReceivedForUser(
      posterInfo._id.toString()
    );

    for (let i = 0; i < reviewsOf.length; i++) {
      rateAvg += reviewsOf[i].rating;
    }
    if (rateAvg === 0) {
      rateAvg = "N/A";
    } else {
      rateAvg = Math.round((rateAvg / reviewsOf.length) * 100) / 100;
    }
    let username;
    if (!xss(req.session.AuthCookie)) {
      username = false;
    } else {
      username = xss(req.session.AuthCookie.username);
    }

    jobById.datePosted = jobById.datePosted.toDateString();

    res.render("partials/job", {
      data: {
        title: jobById.title,
        logged: { uname: username },
        job: jobById,
        poster: posterInfo,
        average: rateAvg,
      },
    });
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

router.patch("/:id", async (req, res) => {
  
  try {
    
    const currentJob = await jobsData.readByID(xss(req.params.id));
    req.body = JSON.parse(JSON.stringify(req.body));
    
    if (req.body.perHour) {
      await checkPerHour(req.body.perHour);
    }
    currentJob.perHour = req.body.perHour;
    if (req.body.compensation) {
      await checkCompensation(req.body.compensation);
    }

    if (req.body.title) {
      await checkTitle(req.body.title);
    }

    if (req.body.description) {
      await checkDescription(req.body.description);
    }
    
    for (let key in req.body) {

      if (req.body[key]) {
        currentJob[key] = req.body[key];
      }
    }
    
    let update = await jobsData.updateJob(xss(req.params.id), currentJob);

    res.json(update);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  let jobId = xss(req.params.id);
  const userId = xss(req.session.AuthCookie.id);
  let user;
  try {
    user = await userData.readByID(userId);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e });
  }

  if (!jobId) {
    throw "Job id not given";
  }
  if (!ObjectId.isValid(jobId)) {
    throw "Job id is not a valid object id";
  }

  
  if (!userId) {
    throw "Only a signed in user can delete";
  }
  // remove job
  try {
    await jobsData.removeJob(jobId);

    // remove job from user's job array
    user.jobsActive = user.jobsActive.filter(function (item) {
      return item !== jobId;
    });
    try {
      userData.update({ id: userId, jobsActive: user.jobsActive });
    } catch (e) {
      console.error(e);
    }

    res.json({ userId: xss(req.params.id), deleted: true });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

async function checkCompensation(compensation) {
  let error = false;
  let message = "";
  if (isNaN(compensation) || !Number(compensation) > 0) {
    error = true;
    message = "Compensation must be a positive number";
  }

  return { error: error, message: message };
}

async function checkPerHour(perHour) {
  let error = false;
  let message = "";

  if (
    typeof perHour !== "boolean" ||
    perHour === null ||
    perHour === undefined
  ) {
    error = true;
    message = "Perhour must be of type boolean";
  }

  return { error: error, message: message };
}

async function checkTitle(title) {
  let error = false;
  let message = "";

  if (typeof title !== "string" || !title.trim()) {
    error = true;
    message = "Title must be a non empty string";
  }

  return { error: error, message: message };
}

async function checkDescription(description) {
  let error = false;
  let message = "";

  if (
    !description ||
    typeof description !== "string" ||
    !description.trim() ||
    description === null ||
    description === ""
  ) {
    error = true;
    message = "Description must be a non empty string";
  }

  return { error: error, message: message };
}

async function checkDatePosted(datePostedObj) {
  let error = false;
  let message = "";

  if (!(datePostedObj instanceof Date) || isNaN(datePostedObj.valueOf())) {
    error = true;
    message = "Date posted must be of type date";
  }

  return { error: error, message: message };
}

async function checkAddress(address) {
  let error = false;
  let message = "";

  if (typeof address !== "object" || !address || address === null) {
    error = true;
    message = "Address must be of type object";
  }

  if (!address.street) {
    error = true;
    message = "Address must contain a street";
  }

  if (typeof address.street !== "string" || !address.street.trim()) {
    error = true;
    message = "Address street name must be a non empty string";
  }

  if (
    !address.zipCode ||
    address.zipCode.length !== 5 ||
    isNaN(parseInt(address.zipCode))
  ) {
    error = true;
    message = "Address zipcode must be a number";
  }

  if (
    !address.state ||
    typeof address.state !== "string" ||
    !address.state.trim()
  ) {
    error = true;
    message = "Address state must be a string";
  }

  if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(address.zipCode)) {
    error = true;
    message = "'zipCode' parameter must a valid US zip code";
    return { error: error, message: message };
  }

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
    "DC",
  ];
  if (!states.includes(address.state.toUpperCase())) {
    error = 400;
    message =
      "'state' parameter must a valid US state abbreviation of the format 'XX'";
    return { error: error, message: message };
  }

  if (typeof address.town !== 'string' || !address.town || !(address.town.trim())) {
    error = true; 
    message = "Address town must be a string"; 
  }

  return { error: error, message: message };
}

async function checkCreatorId(creatorId) {
  let error = false;
  let message = "";

  if (!ObjectId.isValid(creatorId) || !creatorId) {
    error = true;
    message = "Creator id must be of type ObjectId";
  }

  return { error: error, message: message };
}

async function checkInputs(
  compensation,
  perHour,
  title,
  description,
  datePosted,
  address,
  creatorId
) {
  let errorCode = 0;
  let message = "";

  let error = false;
  let errorObj = {
    compensation: compensation,
    perHour: perHour,
    title: title,
    description: description,
    datePosted: new Date(datePosted),
    address: address,
    creatorId: creatorId,
  };

  let errorFunctions = [
    checkCompensation,
    checkPerHour,
    checkTitle,
    checkDescription,
    checkDatePosted,
    checkAddress,
    checkCreatorId,
  ];

  let index = 0;

  for (let [key, value] of Object.entries(errorObj)) {
    value = await errorFunctions[index](value);

    if (value && value.error) {
      return { errorCode: 400, message: value.message };
      // throw value.message;
    }

    index++;
  }

  return { errorCode: 0, message: "" };
}

module.exports = router;
