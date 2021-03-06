const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const jobsData = data.jobs;
const reviewData = data.reviews;
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const xss = require("xss");
const path = require('path');
const multer = require("multer");
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);

//const upload = multer({ dest: 'public/profile_pics/user_uploads' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'public/profile_pics/user_uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true
      });
    }
      cb(null, dir);
  },
  filename: function (req, file, cb) {
      let datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
      let ext = path.extname(file.originalname);
      if(ext !== '.tif' && ext !== '.tiff' && ext !== '.bmp' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif') {
          return callback(new Error('Only images are allowed'));
      }
      callback(null, true);
  },
  limits:{
      fileSize: 1024 * 1024
  }
})

router.post("/", upload.single('profile_picture'), async (req, res) => {
  let photoLink;
  req.body = JSON.parse(JSON.stringify(req.body));

  if(!req.file){
    photoLink = '/public/profile_pics/default.jpg';
  }
  else{
    // file uploaded for profile picture
    photoLink = `/public/profile_pics/user_uploads/${req.file.filename}`;
  }

  let firstName = req.body.firstName ? xss(req.body.firstName) : undefined;
  let lastName = req.body.lastName ? xss(req.body.lastName) : undefined;
  let dateOfBirth = req.body.dateOfBirth
    ? xss(req.body.dateOfBirth)
    : undefined;
  let username = req.body.username ? xss(req.body.username) : undefined;
  let password = req.body.password ? xss(req.body.password) : undefined;
  let email = req.body.email ? xss(req.body.email) : undefined;

  req.body.address = {};
  if(req.body.street){
    req.body.address.street = xss(req.body.street);
  } 
  if(req.body.aptNo){
    req.body.address.aptNo = xss(req.body.aptNo);
  } 
  if(req.body.zipCode){
    req.body.address.zipCode = xss(req.body.zipCode);
  }
  if(req.body.state){
    req.body.address.state = xss(req.body.state);
  } 
  if(req.body.town){
    req.body.address.town = xss(req.body.town);
  }
  if(req.body.country){
    req.body.address.country = xss(req.body.country);
  } 
  let address = req.body.address;

  // handle inputs
  const { errorCode, message } = await checkInputs(
    firstName,
    lastName,
    dateOfBirth,
    username,
    password,
    address,
    photoLink,
    email,
    "POST"
  );
  if (errorCode !== 0) {
    console.error(message);
    res.status(errorCode).json({ error: message });
  }

  try {
    const newUser = await usersData.create(
      firstName,
      lastName,
      dateOfBirth,
      username,
      password,
      address,
      photoLink,
      email
    );
    req.session.AuthCookie = {
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      username: username,
      email: email,
      address: address,
      id: newUser._id,
    };
    res.status(200).json({"accountCreated": "true"});
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

router.get("/", async (req,res) => {
  // call db function that just returns all 
  try{
    const users = await usersData.getAllUsers();
    res.json(users);
  } catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});

router.get("/signin", async (req, res) => {
  res.render("partials/sign-in", { data: {title: "Sign-In" }});
});

//TODO: Better error checking
router.post("/signin", async (req, res) => {
  let username = xss(req.body.username.toLowerCase());
  let password = xss(req.body.password);
  let signedIn = false;

  try {
    let user = await usersData.readByUsername(username);
    if (user.username === username) {
      if (bcrypt.compareSync(password, user.password)) {
        signedIn = true;
        req.session.AuthCookie = {
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          username: user.username,
          email: user.email,
          address: user.address,
          id: user._id,
        };
        res.json({ success: true });
      }
    }

    if (!signedIn) {
      res.json({ success: false });
    }
  } catch (e) {
    res.json({ success: false });
  }
});

router.get("/signout", async (req, res) => {
  req.session.destroy();
  res.render("partials/signedOut", {data: {title: "Signed Out"}});
});

router.get("/profile", async (req, res) => {

  res.render("partials/profile", {
    title: req.session.AuthCookie.username,
    firstName: req.session.AuthCookie.firstName,
    lastName: req.session.AuthCookie.lastName,
    dateOfBirth: req.session.AuthCookie.dateOfBirth,
    username: req.session.AuthCookie.username,
    address: req.session.AuthCookie.address,
    email: req.session.AuthCookie.email,
    id: req.session.AuthCookie.id,
    //TODO: Get jobs from jobs database
    jobs: [
      {
        title: "Moveout",
        description: "Yo come move my stuff",
        compensation: 100,
        address: {
          street: "465 main st",
          aptNo: "9",
          zipCode: "33322",
          state: "NE",
          town: "Hoboken",
          country: "USA",
        },
      },
      {
        title: "Dog Feeder",
        description: "Someones gotta feed my dog and its not gonna be me",
        perHour: 15,
        address: {
          street: "465 main st",
          aptNo: "9",
          zipCode: "33322",
          state: "NE",
          town: "Hoboken",
          country: "USA",
        },
      },
    ],
    //TODO: get reviews from reviews data base
    reviews: [
      {
        reviewerId: "agentcoop",
        revieweeId: "someOtherGuy",
        rating: 5,
        reviewDescription: "This guy was cool",
        dateOfReview: "1/2/2023",
      },
      {
        reviewerId: "agentcoop",
        revieweeId: "ronaldxxx",
        rating: 1,
        reviewDescription: "kinda wak",
        dateOfReview: "1/2/2019",
      },
    ],
  });
});

router.get("/:id", async (req, res) => {
  // handle inputs
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: "Input id must be a valid ObjectID" });
    return;
  }

  try {
    let user = await usersData.readByID(xss(req.params.id));

    // giving this to make my life slightly easier
    // also need reviews of user so adding that
    let reviewsOf = await reviewData.getReviewsReceivedForUser(user._id);
    let loggedIn = req.session.AuthCookie;
    let rateAvg = 0;
    // get names of users associated with reviews
    try {
      for (let i = 0; i < reviewsOf.length; i++) {
        let reviewer = await usersData.readByID(reviewsOf[i].reviewerId);
        let jobReviewed = await jobsData.readByID(reviewsOf[i].jobId.toString());
        reviewsOf[i].reviewerName = `${reviewer.firstName} ${reviewer.lastName}`;
        reviewsOf[i].dateOfReview = reviewsOf[i].dateOfReview.toDateString();
        reviewsOf[i].jobTitle = jobReviewed.title;
        rateAvg += reviewsOf[i].rating;
      }
    } catch {
      // do nothing, just dont show reviews ig
    }

    let jobs = [];
    try {
      // put jobs worked into jobs array
      for (let j = 0; j < user.jobsWorked.length; j++){
        let job = await jobsData.readByID(user.jobsWorked[j]);
        job.typeas = 'Employee';
        jobs.push(job);
      }
      // put jobs provided into jobs array
      for (let k = 0; k < user.jobsProvided.length; k++){
        let job = await jobsData.readByID(user.jobsProvided[k]);
        job.typeas = 'Employer';
        jobs.push(job);
      }
    } catch {
      // just dont show any jobs in select on error
    }

    let isJobs = true;
    if (jobs.length === 0){
      isJobs = false;
    }

    let isReviews = true;
    if (reviewsOf.length === 0){
      isReviews = false;
    }
    if (rateAvg === 0) {
      rateAvg = "N/A";
    } else {
      rateAvg = Math.round((rateAvg / reviewsOf.length) * 100) / 100;
    }
    let username;
    let userID;
    if (!loggedIn) {
      username = false;
      userID = false;
    } else {
      username = loggedIn.username;
      userID = loggedIn.id;
    }

    res.render('partials/emp', 
      {data: {
        title: user.username, 
        user: user, 
        logged: {uname: username, userID: userID}, 
        reviews: reviewsOf, 
        average: rateAvg,
        isReviews : isReviews,
        jobs: jobs,
        isJobs: isJobs
       }
     });
    
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "User not found" });
  }
});

router.get("/username/:username", async (req, res) => {
  try {
    let user = await usersData.readByUsername(xss(req.params.username));
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
  }
});

// search by username
router.get("/search/:searchterm", async (req, res) => {
  try {
    let searchterm = await usersData.searchByUsername(
      xss(req.params.searchterm)
    );
    res.json(searchterm);
  } catch (e) {
    res.status(404).json({ error: "No matches" });
  }
});

router.delete("/", async (req, res) => {
  if(!req.session.AuthCookie){
    res.status(401).json({ error: "You can only delete account you are signed into" });
  } 
  // check if id is valid
  const userID = xss(req.session.AuthCookie.id);
  if (!ObjectId.isValid(userID)) {
    res.status(400).json({ error: "Input id must be a valid ObjectID" });
    return;
  }

  // check if id exists
  let user;
  try {
    user = await usersData.readByID(userID);
  } catch (e) {
    res.status(404).json({ error: "User id could not be found" });
    return;
  }

  // remove user's reviews
  try {
    await reviewData.removeAllReviewsForUser(userID);
  } catch (e) {
    // ignore
  }

  // remove saved profile picture
  // only delete if not default, or one of our test files/ only delete user uploaded photos
  let deleteFile = false;
  let folder = user.photoLink.split('/');
  if(folder.length > 1 && (folder[folder.length - 2] == 'user_uploads')) deleteFile = true;
  if(user.photoLink != '/public/profile_pics/default.jpg' && deleteFile ){
    try{
      await unlinkAsync(`./${user.photoLink}`);
    }
    catch(e){
      console.error(`Error deleting photo for ${user.username}: ${user.photoLink} : ${e}`);
    }
  }
  // remove user
  try {
    await usersData.remove(userID);
    res.json({ userId: userID, deleted: true });
  } catch (e) {
    res.sendStatus(500);
  }
});

router.patch("/pic/:id", upload.single('profile_picture'), async (req, res) =>{
  let id = xss(req.params.id);
  if(id != req.session.AuthCookie.id) res.status(401).json({"error" : "Can only modify picture if you are logged into that account"});
  if(!req.file) res.status(400).json({"error" : "No file found"});
  let user;
  try{
    user = await usersData.readByID(id);
  } 
  catch (e){
    res.status(404).json({error:'User not found'});
  }
  let oldPhotoPath = user.photoLink;
  const update = await usersData.update({id:id, photoLink: `/public/profile_pics/user_uploads/${req.file.filename}`});

  // if user photo is an uploaded file, allow deletion of previous picture
  let deleteFile = false;
  let folder = oldPhotoPath.split('/');
  if(folder.length > 1 && (folder[folder.length - 2] == 'user_uploads')) deleteFile = true;
  if(oldPhotoPath != '/public/profile_pics/default.jpg' && deleteFile ){
    try{
      await unlinkAsync(`./${oldPhotoPath}`); // new picture uploaded, safe to delete old
    }
    catch(e){
      console.error(`Error deleting ${oldPhotoPath} : ${e}`);
    }
  }


  res.status(200).json({message:`Profile picture updated for user ${user.username}`});
});

router.patch("/:id", async (req, res) => {
  let firstName = req.body.firstName ? xss(req.body.firstName) : undefined;
  let lastName = req.body.lastName ? xss(req.body.lastName) : undefined;
  let dateOfBirth = req.body.dateOfBirth
    ? xss(req.body.dateOfBirth)
    : undefined;
  let username = req.body.username ? xss(req.body.username) : undefined;
  let password = req.body.password ? xss(req.body.password) : undefined;
  let address = req.body.address
    ? {
        street: req.body.address.street
          ? xss(req.body.address.street)
          : undefined,
        aptNo: req.body.address.aptNo ? xss(req.body.address.aptNo) : "",
        zipCode: req.body.address.zipCode
          ? xss(req.body.address.zipCode)
          : undefined,
        state: req.body.address.state ? xss(req.body.address.state) : undefined,
        town: req.body.address.town ? xss(req.body.address.town) : undefined,
        country: req.body.address.country
          ? xss(req.body.address.country)
          : undefined,
      }
    : undefined;
  let photoLink = req.body.photoLink ? xss(req.body.photoLink) : undefined;
  let email = req.body.email ? xss(req.body.email) : undefined;
  let jobsActive = req.body.jobsActive;
  let jobsWorked = req.body.jobsWorked;
  let jobsProvided = req.body.jobsProvided;
  let jobsInProgressAsEmployee = req.body.jobsInProgressAsEmployee;
  let jobsInProgressAsEmployer = req.body.jobsInProgressAsEmployer;

  let userID = xss(req.params.id);

  let user = {};

  // check if id is valid
  if (!ObjectId.isValid(userID)) {
    res.status(400).json({ error: "Input id must be a valid ObjectID" });
    return;
  }

  // check if id exists
  try {
    user = await usersData.readByID(userID);
  } catch (e) {
    res.status(400).json({ error: "User id could not be found" });
    return;
  }

  // handle inputs

  //TODO: Checking input with the !firstName format wouldwork better for us since
  //empty strings are going to be passed in but should be ignored
  if (
    !firstName &&
    !lastName &&
    !dateOfBirth &&
    !username &&
    !password &&
    !address &&
    !photoLink &&
    !email &&
    !jobsActive &&
    !jobsWorked &&
    !jobsProvided &&
    !jobsInProgressAsEmployee &&
    !jobsInProgressAsEmployer
  ) {
    res.status(400).json({
      error:
        "Input must be provided for at least one of the following parameters: 'firstName', 'lastName', 'dateOfBirth'," +
        " 'password', 'address', 'photoLink', 'email', 'jobsActive', 'jobsWorked', 'jobsProvided', 'jobsInProgressAsEmployee', " +
        "'jobsInProgressAsEmployer'.",
    });
  }

  if (email !== undefined && email !== user.email) {
    const errorObj = await checkEmail(email);
    if (errorObj.errorCode !== 0) {
      res.status(400).json({
        error: errorObj.message,
      });
      return;
    }
  }

  for (const jobs of [
    jobsActive,
    jobsWorked,
    jobsProvided,
    jobsInProgressAsEmployee,
    jobsInProgressAsEmployer,
  ]) {
    if (jobs !== undefined) {
      const errorObj = await checkJobs(jobs);
      if (errorObj.errorCode !== 0) {
        res.status(400).json({
          error: errorObj.message,
        });
        return;
      }
    }
  }

  const { errorCode, message } = await checkInputs(
    firstName === undefined ? user.firstName : firstName,
    lastName === undefined ? user.lastName : lastName,
    dateOfBirth === undefined ? user.dateOfBirth : dateOfBirth,
    username === undefined ? user.username : username,
    password === undefined ? user.password : password,
    address === undefined ? user.address : address,
    photoLink === undefined ? user.photoLink : photoLink,
    email === undefined ? user.email : email,
    "PATCH"
  );
  if (errorCode !== 0) {
    //res.status(errorCode).json({ error: message });
    res.status(errorCode).json({ error: message });
    return;
  }

  try {
    const user = await usersData.update({
      id: req.params.id,
      firstName: firstName,
      username: username,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      password: password,
      address: address,
      photoLink: photoLink,
      email: email,
      jobsActive: jobsActive,
      jobsWorked: jobsWorked,
      jobsProvided: jobsProvided,
      jobsInProgressAsEmployee: jobsInProgressAsEmployee,
      jobsInProgressAsEmployer: jobsInProgressAsEmployer,
    });
    // so that claim job update doesnt change user
    if (req.session.AuthCookie.id === user._id){
      req.session.AuthCookie = {
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        username: user.username,
        email: user.email,
        address: user.address,
        id: user._id,
      };
    }
    res.status(200).json(user);
  } catch (e) {
    if (e.name === "UserNotUpdatedException")
      res.status(400).json({ error: e.message });
    else res.sendStatus(500);
  }
});

async function checkString(str, paramName) {
  let errorCode = 0;
  let message = "";

  if (typeof str !== "string") {
    errorCode = 400;
    message = `Input for parameter '${paramName}' must be a non-empty string`;
    return { errorCode: errorCode, message: message };
  }
  if (str === "") {
    errorCode = 400;
    message = `Input for parameter '${paramName}' must be a non-empty string`;
    return { errorCode: errorCode, message: message };
  }

  return { errorCode: errorCode, message: message };
}

async function checkDateOfBirth(dateOfBirth, dateOfBirthObj) {
  let errorCode = 0;
  let message = "";

  if (!dateOfBirthObj instanceof Date || isNaN(dateOfBirthObj.valueOf())) {
    errorCode = 400;
    message =
      "Input for parameter 'dateOfBirth' must be in a valid string date format";
    return { errorCode: errorCode, message: message };
  }
  return { errorCode: errorCode, message: message };
}

async function checkAddress(address) {
  let errorCode = 0;
  let message = "";

  if (typeof address !== "object" || address === null) {
    errorCode = 400;
    message = "Input for parameter 'address' must be an object";
    return { errorCode: errorCode, message: message };
  }
  if (
    !"street" in address ||
    !"zipCode" in address ||
    !"state" in address ||
    !"town" in address ||
    typeof address.street !== "string" ||
    typeof address.zipCode !== "string" ||
    typeof address.state !== "string" ||
    typeof address.town !== "string"
  ) {
    errorCode = 400;
    message =
      "Object provided for parameter 'address' must contain keys 'street', 'zipCode', 'state', and 'town', " +
      "whose values must be non-empty strings";
    return { errorCode: errorCode, message: message };
  }

  // check aptNo
  if ("aptNo" in address) {
    if (typeof address.aptNo !== "string") {
      errorCode = 400;
      message = "Parameter 'address.aptNo' must be a string";
      return { errorCode: errorCode, message: message };
    }
  }

  address.street = address.street.trim();
  address.zipCode = address.zipCode.trim();
  address.state = address.state.trim();
  address.town = address.town.trim();

  if (
    address.street === "" ||
    address.zipCode === "" ||
    address.state === "" ||
    address.town === ""
  ) {
    errorCode = 400;
    message =
      "Object provided for parameter 'address' must contain keys 'street', 'zipCode', 'state', and 'town', " +
      "whose values must be non-empty strings";
    return { errorCode: errorCode, message: message };
  }

  // check for valid US zip code
  if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(address.zipCode)) {
    errorCode = 400;
    message = "'zipCode' parameter must a valid US zip code";
    return { errorCode: errorCode, message: message };
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
    errorCode = 400;
    message =
      "'state' parameter must a valid US state abbreviation of the format 'XX'";
    return { errorCode: errorCode, message: message };
  }

  return { errorCode: errorCode, message: message };
}

async function checkEmail(email) {
  let errorCode = 0;
  let message = "";

  // check if email is valid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorCode = 400;
    message = "Email must be in a valid format";
    return { errorCode: errorCode, message: message };
  }

  // check if email is in use
  if (await usersData.emailExists(email)) {
    errorCode = 400;
    message = "Email is already in use";
    return { errorCode: errorCode, message: message };
  }

  return { errorCode: errorCode, message: message };
}

async function checkJobs(jobs) {
  let errorCode = 0;
  let message = "";

  if (!Array.isArray(jobs)) {
    errorCode = 400;
    message = "Jobs must be in an array";
    return { errorCode: errorCode, message: message };
  }

  for (const jobID of jobs) {
    // check if job id is valid
    if (!ObjectId.isValid(jobID)) {
      errorCode = 400;
      message = "Array must contain valid job IDs.";
      return { errorCode: errorCode, message: message };
    }
    // TODO: check if job exists
  }
  return { errorCode: errorCode, message: message };
}

async function checkInputs(
  firstName,
  lastName,
  dateOfBirth,
  username,
  password,
  address,
  photoLink,
  email,
  requestType
) {
  let errorCode = 0;
  let message = "";
  let errorObj = {};
  const dateOfBirthObj = new Date(dateOfBirth);

  if (
    firstName === undefined ||
    lastName === undefined ||
    dateOfBirth === undefined ||
    username === undefined ||
    password === undefined ||
    address === undefined ||
    photoLink === undefined ||
    email === undefined
  ) {
    errorCode = 400;
    message =
      "Inputs must be provided for the following parameters: 'firstName', 'lastName', 'dateOfBirth', 'username'," +
      " 'password', 'address', 'photoLink', and 'email'.";
    return { errorCode: errorCode, message: message };
  }

  // trim string inputs
  firstName = firstName.trim();
  lastName = lastName.trim();
  dateOfBirth = dateOfBirth.trim();
  username = username.trim();
  password = password.trim();
  photoLink = photoLink.trim();
  email = email.trim();

  for (const [inputName, input] of [
    ["firstName", firstName],
    ["lastName", lastName],
    ["dateOfBirth", dateOfBirth],
    ["username", username],
    ["password", password],
    ["photoLink", photoLink],
    ["email", email],
  ]) {
    errorObj = await checkString(input, inputName);
    if (errorObj.errorCode !== 0) {
      return errorObj;
    }
  }

  errorObj = await checkDateOfBirth(dateOfBirth, dateOfBirthObj);
  if (errorObj.errorCode !== 0) {
    return errorObj;
  }

  if (requestType === "POST") {
    if (await usersData.usernameExists(username)) {
      errorCode = 400;
      message = "Username already exists";
      return { errorCode: errorCode, message: message };
    }
  }

  errorObj = await checkAddress(address);
  if (errorObj.errorCode !== 0) {
    return errorObj;
  }

  // check photo link
  if (
    !/^([a-z]:)?((\\|\/)[a-z0-9\s_@\-^!#$%&+={}\[\]]+)+\.(tif|tiff|bmp|jpg|jpeg|png|gif)$/i.test(
      photoLink
    )
  ) {
    errorCode = 400;
    message =
      "'photoLink' parameter must be a valid full file path for an image of one the following types: .tif, .tiff, " +
      ".bmp, 'jpg', 'jpeg', 'png', 'gif'.";
    return { errorCode: errorCode, message: message };
  }

  if (requestType === "POST") {
    errorObj = await checkEmail(email);
    if (errorObj.errorCode !== 0) {
      return errorObj;
    }
  }

  return { errorCode: 0, message: "" };
}

module.exports = router;
