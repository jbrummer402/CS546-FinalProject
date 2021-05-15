const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const jobsData = data.jobs;
const reviewData = data.reviews;
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const xss = require("xss");

router.get("/account", async (req, res) => {
  // let jobs;
  // try {
  //   jobs = await jobsData.readByID(req.session.AuthCookie.id);
  // } catch (error) {
  //   console.log(error);
  // }

  let user = await usersData.readByID(xss(req.session.AuthCookie.id));

  // TODO: user info in session needs to be updated when an update is made to user's account
  res.render("partials/profile/account", {
    title: req.session.AuthCookie.username,
    layout: "profile",
    // firstName: req.session.AuthCookie.firstName,
    // lastName: req.session.AuthCookie.lastName,
    // dateOfBirth: req.session.AuthCookie.dateOfBirth,
    // username: req.session.AuthCookie.username,
    // address: req.session.AuthCookie.address,
    // email: req.session.AuthCookie.email,
    // id: req.session.AuthCookie.id,
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
    username: user.username,
    address: user.address,
    email: user.email,
    id: user._id,
  });
});

router.get("/postjob", async (req, res) => {
  res.render("partials/profile/postjob", {
    title: "Post a Job",
    layout: "profile",
    username: req.session.AuthCookie.username,
  });
});

router.get("/reviews", async (req, res) => {
  const reviewsReceived = await reviewData.getReviewsReceivedForUser(
    req.session.AuthCookie.id
  );
  for (let i = 0; i < reviewsReceived.length; i++) {
    let review = reviewsReceived[i];
    review.reviewerId = (await usersData.readByID(review.reviewerId)).username;
    review.revieweeId = (await usersData.readByID(review.revieweeId)).username;
    review.dateOfReview = review.dateOfReview.toDateString();
  }
  res.render("partials/profile/reviews", {
    title: "My Reviews",
    layout: "profile",
    username: req.session.AuthCookie.username,
    //TODO: get reviews from reviews data base
    reviews: reviewsReceived,
  });
});

router.get("/activejobs", async (req, res) => {
  let user = await usersData.readByID(req.session.AuthCookie.id);
  const activeJobs = await getJobs(user, 'jobsActive');

  res.render("partials/profile/activejobs", {
    title: "My Active Jobs",
    layout: "profile",
    username: req.session.AuthCookie.username,
    activeJobs: activeJobs,
  });
});

router.get("/inprogressjobs", async (req, res) => {
  let user = await usersData.readByID(req.session.AuthCookie.id);
  const jobsInProgressAsEmployee = await getJobs(user, 'jobsInProgressAsEmployee');
  const jobsInProgressAsEmployer = await getJobs(user, 'jobsInProgressAsEmployer');

  res.render("partials/profile/inprogressjobs", {
    title: "My In-Progress Jobs",
    layout: "profile",
    username: req.session.AuthCookie.username,
    jobsInProgressAsEmployee: jobsInProgressAsEmployee,
    jobsInProgressAsEmployer: jobsInProgressAsEmployer
  });
});

router.get("/completedjobs", async (req, res) => {
  let user = await usersData.readByID(req.session.AuthCookie.id);
  const jobsWorked = await getJobs(user, 'jobsWorked');
  const jobsProvided = await getJobs(user, 'jobsProvided');

  res.render("partials/profile/completedjobs", {
    title: "My Completed Jobs",
    layout: "profile",
    username: req.session.AuthCookie.username,
    jobsWorked: jobsWorked,
    jobsProvided: jobsProvided
  });
});

async function getJobs(userObj, jobType) {
  let jobs = [];
  for (const jobID of userObj[jobType]) {
    const job = await jobsData.readByID(jobID);
    const jobObj = {
      jobTitle: job.title,
      compensation: job.compensation,
      perHour: job.perHour,
      datePosted: job.datePosted.toISOString().split('T')[0]
    }
    jobs.push(jobObj);
  }
  return jobs;
}

module.exports = router;
