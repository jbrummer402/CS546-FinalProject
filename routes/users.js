const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const jobsData = data.jobs;
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  let {
    firstName,
    lastName,
    dateOfBirth,
    username,
    password,
    address,
    photoLink,
    email,
  } = req.body;

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
    res.status(errorCode).json({ error: message });
    return;
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
    res.json(newUser);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/signin", async (req, res) => {
  res.render("partials/sign-in", { title: "Sign-In" });
});

//TODO: Better error checking
router.post("/signin", async (req, res) => {
  username = req.body.username.toLowerCase();
  password = req.body.password;
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

router.get("/profile", async (req, res) => {
  // let jobs;
  // try {
  //   jobs = await jobsData.readByID(req.session.AuthCookie.id);
  // } catch (error) {
  //   console.log(error);
  // }

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
    let user = await usersData.readByID(req.params.id);

    // giving this to make my life slightly easier
    let loggedIn = req.session.AuthCookie;
    res.render('partials/emp', 
        {data: {user: user, logged: {uname: loggedIn.username}}});
    
  } catch (e) {
    res.status(404).json({ error: "User not found" });
  }
});

router.get("/username/:username", async (req, res) => {
  try {
    let user = await usersData.readByUsername(req.params.username);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
  }
});

router.delete("/:id", async (req, res) => {
  // check if id is valid
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: "Input id must be a valid ObjectID" });
    return;
  }

  // check if id exists
  try {
    await usersData.readByID(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "User id could not be found" });
    return;
  }

  try {
    await usersData.remove(req.params.id);
    res.json({ userId: req.params.id, deleted: true });
  } catch (e) {
    res.sendStatus(500);
  }
});

//Made into a post request because it is imposible to make a patch request from a form
router.post("/:id", async (req, res) => {
  let {
    firstName,
    lastName,
    dateOfBirth,
    password,
    address,
    photoLink,
    email,
  } = req.body;

  let user = {};

  // check if id is valid
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: "Input id must be a valid ObjectID" });
    return;
  }

  // check if id exists
  try {
    user = await usersData.readByID(req.params.id);
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
    !password &&
    !address &&
    !photoLink &&
    !email
  ) {
    res.status(400).json({
      error:
        "Input must be provided for at least one of the following parameters: 'firstName', 'lastName', 'dateOfBirth'," +
        " 'password', 'address', 'photoLink', 'email'.",
    });
    return;
  }

  // if (
  //   firstName === undefined &&
  //   lastName === undefined &&
  //   dateOfBirth === undefined &&
  //   password === undefined &&
  //   address === undefined &&
  //   photoLink === undefined &&
  //   email === undefined
  // ) {
  //   res.status(400).json({
  //     error:
  //       "Input must be provided for at least one of the following parameters: 'firstName', 'lastName', 'dateOfBirth'," +
  //       " 'password', 'address', 'photoLink', 'email'.",
  //   });
  //   return;
  // }

  if (email !== undefined) {
    const errorObj = await checkEmail(email);
    if (errorObj.errorCode !== 0) {
      res.status(400).json({
        error: errorObj.message,
      });
      return;
    }
  }

  const { errorCode, message } = await checkInputs(
    firstName === undefined ? user.firstName : firstName,
    lastName === undefined ? user.lastName : lastName,
    dateOfBirth === undefined ? user.dateOfBirth : dateOfBirth,
    user.username,
    password === undefined ? user.password : password,
    address === undefined ? user.address : address,
    photoLink === undefined ? user.photoLink : photoLink,
    email === undefined ? user.email : email,
    "PATCH"
  );
  if (errorCode !== 0) {
    res.status(errorCode).json({ error: message });
    return;
  }

  try {
    const user = await usersData.update({
      id: req.params.id,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      password: password,
      address: address,
      photoLink: photoLink,
      email: email,
    });
    res.json(user);
  } catch (e) {
    res.sendStatus(500);
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
