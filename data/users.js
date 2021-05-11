const mongoCollections = require("./../config/mongoCollections");
const ObjectId = require("mongodb").ObjectId;
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function create(
  firstName,
  lastName,
  dateOfBirth,
  username,
  password,
  address,
  photoLink,
  email
) {
  // handle inputs
  const errorObj = await checkInputs(
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
  if (errorObj.error) {
    throw errorObj.message;
  }

  const usersCollection = await users();

  let newUser = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    dateOfBirth: new Date(dateOfBirth),
    username: username.trim().toLowerCase(),
    password: await bcrypt.hash(password.trim(), saltRounds),
    address: {
      street: address.street.trim(),
      aptNo: address.aptNo ? address.aptNo.trim() : "",
      zipCode: address.zipCode.trim(),
      state: address.state.trim().toUpperCase(),
      town: address.town.trim(),
      country: "USA",
    },
    photoLink: photoLink.trim(),
    email: email.trim().toLowerCase(),
    jobsActive: [],
    jobsWorked: [],
    jobsProvided: [],
    jobsInProgressAsEmployee: [],
    jobsInProgressAsEmployer: []
  };

  const insertInfo = await usersCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) throw "Could not create user!";

  const newId = insertInfo.insertedId;

  const user = await this.readByID(newId.toString());

  return user;
}

async function readByID(id) {
  // handle inputs
  if (id === undefined) throw "Input must be provided for 'id' parameter!";
  if (typeof id !== "string") throw "Input id must be a string!";
  if (!ObjectId.isValid(id)) throw "Input id must be a valid ObjectID!";

  const usersCollection = await users();

  const user = await usersCollection.findOne({ _id: ObjectId(id) });
  if (user === null) throw "No user with that id!";
  user._id = user._id.toString();
  user.dateOfBirth = `${
    user.dateOfBirth.getMonth() + 1
  }/${user.dateOfBirth.getDate()}/${user.dateOfBirth.getFullYear()}`;

  return user;
}

async function readByUsername(username) {
  // handle inputs
  if (username === undefined)
    throw "Input must be provided for 'username' parameter!";
  if (typeof username !== "string") throw "Input username must be a string!";

  const usersCollection = await users();

  const user = await usersCollection.findOne({
    username: username.toLowerCase(),
  });
  if (user === null) throw "No user with that username!";
  user._id = user._id.toString();
  user.dateOfBirth = `${
    user.dateOfBirth.getMonth() + 1
  }/${user.dateOfBirth.getDate()}/${user.dateOfBirth.getFullYear()}`;

  return user;
}

async function remove(id) {
  // handle inputs
  if (id === undefined) throw "Input must be provided!";
  if (typeof id !== "string") throw "Input must be a string!";
  if (!ObjectId.isValid(id)) throw "Input must be a valid ObjectID!";

  const usersCollection = await users();

  const user = await this.readByID(id);
  const deletionInfo = await usersCollection.deleteOne({ _id: ObjectId(id) });

  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete user with id of ${id}!`;
  }

  return `${user.userName} has been successfully deleted`;
}

async function update(updateObj) {
  if (typeof updateObj !== "object" || updateObj === null) {
    throw "Input for parameter 'address' must be an object";
  }

  let {
    id,
    firstName,
    lastName,
    dateOfBirth,
    password,
    address,
    photoLink,
    email,
    jobsActive,
    jobsWorked,
    jobsProvided,
    jobsInProgressAsEmployee,
    jobsInProgressAsEmployer
  } = updateObj;
  let user = {};

  // check if id is valid
  if (id === undefined || typeof id !== "string")
    throw "String input must be provided for 'id' parameter!";

  if (!ObjectId.isValid(id)) {
    throw "Input id must be a valid ObjectID";
  }

  try {
    user = await readByID(id);
  } catch (e) {
    throw new Error(e);
  }

  // handle inputs
  if (
    firstName === undefined &&
    lastName === undefined &&
    dateOfBirth === undefined &&
    password === undefined &&
    address === undefined &&
    photoLink === undefined &&
    email === undefined &&
    jobsActive === undefined &&
    jobsWorked === undefined &&
    jobsProvided === undefined &&
    jobsInProgressAsEmployee === undefined &&
    jobsInProgressAsEmployer === undefined
  ) {
    throw (
        "Input must be provided for at least one of the following parameters: 'firstName', 'lastName', 'dateOfBirth'," +
        " 'password', 'address', 'photoLink', 'email', 'jobsActive', 'jobsWorked', 'jobsProvided', 'jobsInProgressAsEmployee', " +
        "'jobsInProgressAsEmployer'."
    );
  }

  if (email !== undefined) {
    const errorObj = await checkEmail(email);
    if (errorObj.error) {
      throw errorObj.message;
    }
  }

  for (const jobs of [jobsActive, jobsWorked, jobsProvided, jobsInProgressAsEmployee, jobsInProgressAsEmployer]) {
    if (jobs !== undefined) {
      const errorObj = await checkJobs(jobs);
      if (errorObj.error) {
        throw errorObj.message;
      }
    }
  }

  try {
    await checkInputs(
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
  } catch (e) {
    throw new Error(e);
  }

  const usersCollection = await users();

  const updatedUser = {
    firstName: firstName === undefined ? user.firstName : firstName.trim(),
    lastName: lastName === undefined ? user.lastName : lastName.trim(),
    dateOfBirth:
      dateOfBirth === undefined
        ? new Date(user.dateOfBirth)
        : new Date(dateOfBirth),
    username: user.username,
    password:
      password === undefined
        ? user.password
        : await bcrypt.hash(password.trim(), saltRounds),
    address:
      address === undefined
        ? user.address
        : {
            street: address.street.trim(),
            aptNo: address.aptNo ? address.aptNo.trim() : "",
            zipCode: address.zipCode.trim(),
            state: address.state.trim().toUpperCase(),
            town: address.town.trim(),
            country: "USA",
          },
    photoLink: photoLink === undefined ? user.photoLink : photoLink.trim(),
    email: email === undefined ? user.email : email.trim().toLowerCase(),
    jobsActive: jobsActive === undefined ? user.jobsActive : jobsActive,
    jobsWorked: jobsWorked === undefined ? user.jobsWorked : jobsWorked,
    jobsProvided: jobsProvided === undefined ? user.jobsProvided : jobsProvided,
    jobsInProgressAsEmployee: jobsInProgressAsEmployee === undefined ? user.jobsInProgressAsEmployee : jobsInProgressAsEmployee,
    jobsInProgressAsEmployer: jobsInProgressAsEmployer === undefined ? user.jobsInProgressAsEmployer : jobsInProgressAsEmployer,
  };

  const updatedInfo = await usersCollection.updateOne(
    { _id: ObjectId(id) },
    { $set: updatedUser }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update user successfully!";
  }

  return await this.readByID(id);
}

async function usernameExists(username) {
  const usersCollection = await users();

  const user = await usersCollection.findOne({
    username: username.toLowerCase(),
  });
  return user !== null;
}

async function emailExists(email) {
  const usersCollection = await users();

  const user = await usersCollection.findOne({ email: email.toLowerCase() });
  return user !== null;
}

async function checkString(str, paramName) {
  let error = false;
  let message = "";

  if (typeof str !== "string") {
    error = true;
    message = `Input for parameter '${paramName}' must be a non-empty string`;
    return { error: error, message: message };
  }
  if (str === "") {
    error = true;
    message = `Input for parameter '${paramName}' must be a non-empty string`;
    return { error: error, message: message };
  }

  return { error: error, message: message };
}

async function checkDateOfBirth(dateOfBirth, dateOfBirthObj) {
  let error = false;
  let message = "";

  if (!dateOfBirthObj instanceof Date || isNaN(dateOfBirthObj.valueOf())) {
    error = true;
    message =
      "Input for parameter 'dateOfBirth' must be in a valid string date format";
    return { error: error, message: message };
  }
  return { error: error, message: message };
}

async function checkAddress(address) {
  let error = false;
  let message = "";

  if (typeof address !== "object" || address === null) {
    error = true;
    message = "Input for parameter 'address' must be an object";
    return { error: error, message: message };
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
    error = true;
    message =
      "Object provided for parameter 'address' must contain keys 'street', 'zipCode', 'state', and 'town', " +
      "whose values must be non-empty strings";
    return { error: error, message: message };
  }

  // check aptNo
  if ("aptNo" in address) {
    if (typeof address.aptNo !== "string") {
      error = true;
      message = "Parameter 'address.aptNo' must be a string";
      return { error: error, message: message };
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
    error = true;
    message =
      "Object provided for parameter 'address' must contain keys 'street', 'zipCode', 'state', and 'town', " +
      "whose values must be non-empty strings";
    return { error: error, message: message };
  }

  // check for valid US zip code
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

  return { error: error, message: message };
}

async function checkEmail(email) {
  let error = false;
  let message = "";

  // check if email is valid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error = true;
    message = "Email must be in a valid format";
    return { error: error, message: message };
  }

  // check if email is in use
  if (await emailExists(email)) {
    error = true;
    message = "Email is already in use";
    return { error: error, message: message };
  }

  return { error: error, message: message };
}

async function checkJobs(jobs) {
  let error = false;
  let message = "";

  if (!Array.isArray(jobs)) {
    error = true;
    message = "Jobs must be in an array";
    return { error: error, message: message };
  }

  for (const jobID of jobs) {
    // check if job id is valid
    if (!ObjectId.isValid(jobID)) {
      error = true;
      message = "Jobs must be in an array";
      return { error: error, message: message };
    }
    // TODO: check if job exists
  }
  return { error: error, message: message };
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
  let error = false;
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
    error = true;
    message =
      "Inputs must be provided for the following parameters: 'firstName', 'lastName', 'dateOfBirth', 'username'," +
      " 'password', 'address', 'photoLink', and 'email'.";
    return { error: error, message: message };
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
    if (errorObj.error) {
      return errorObj;
    }
  }

  errorObj = await checkDateOfBirth(dateOfBirth, dateOfBirthObj);
  if (errorObj.error) {
    return errorObj;
  }

  if (requestType === "POST") {
    if (await usernameExists(username)) {
      error = true;
      message = "Username already exists";
      return { error: error, message: message };
    }
  }

  errorObj = await checkAddress(address);
  if (errorObj.error) {
    return errorObj;
  }

  // check photo link
  if (
    !/^([a-z]:)?((\\|\/)[a-z0-9\s_@\-^!#$%&+={}\[\]]+)+\.(tif|tiff|bmp|jpg|jpeg|png|gif)$/i.test(
      photoLink
    )
  ) {
    error = true;
    message =
      "'photoLink' parameter must be a valid full file path for an image of one the following types: .tif, .tiff, " +
      ".bmp, 'jpg', 'jpeg', 'png', 'gif'.";
    return { error: error, message: message };
  }

  if (requestType === "POST") {
    errorObj = await checkEmail(email);
    if (errorObj.error) {
      return errorObj;
    }
  }

  return { error: error, message: "" };
}

module.exports = {
  create,
  readByID,
  readByUsername,
  remove,
  update,
  usernameExists,
  emailExists,
};
