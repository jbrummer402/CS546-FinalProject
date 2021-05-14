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
    firstName: req.session.AuthCookie.firstName,
    lastName: req.session.AuthCookie.lastName,
    dateOfBirth: req.session.AuthCookie.dateOfBirth,
    username: req.session.AuthCookie.username,
    address: req.session.AuthCookie.address,
    email: req.session.AuthCookie.email,
    id: req.session.AuthCookie.id,
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
  let activeJobs = [];
  for (const jobID of user.jobsActive) {
    const job = await jobsData.readByID(jobID);
    const jobObj = {
      jobTitle: job.title,
      compensation: job.compensation,
      perHour: job.perHour,
      datePosted: job.datePosted.toString()
    }
    activeJobs.push(jobObj);
  }
  res.render("partials/profile/activejobs", {
    title: "My Active Jobs",
    layout: "profile",
    username: req.session.AuthCookie.username,
    activeJobs: activeJobs,
  });
});

router.get("/inprogressjobs", async (req, res) => {
  let user = await usersData.readByID(req.session.AuthCookie.id);
  let jobsInProgressAsEmployee = [];
  let jobsInProgressAsEmployer = [];
  for (const jobID of user.jobsInProgressAsEmployee) {
    const job = await jobsData.readByID(jobID);
    const jobObj = {
      jobTitle: job.title,
      compensation: job.compensation,
      perHour: job.perHour,
      datePosted: job.datePosted.toString()
    }
    jobsInProgressAsEmployee.push(jobObj);
  }
  for (const jobID of user.jobsInProgressAsEmployer) {
    const job = await jobsData.readByID(jobID);
    const jobObj = {
      jobTitle: job.title,
      compensation: job.compensation,
      perHour: job.perHour,
      datePosted: job.datePosted.toString()
    }
    jobsInProgressAsEmployer.push(jobObj);
  }
  res.render("partials/profile/inprogressjobs", {
    title: "My In-Progress Jobs",
    layout: "profile",
    username: req.session.AuthCookie.username,
    jobsInProgressAsEmployee: jobsInProgressAsEmployee,
    jobsInProgressAsEmployer: jobsInProgressAsEmployer
  });
});

router.get("/completedjobs", async (req, res) => {
  res.render("partials/profile/completedjobs", {
    title: "My Completed Jobs",
    layout: "profile",
    username: req.session.AuthCookie.username,
    jobsWorked: [
      {
        jobTitle: "For the love of god, come help me change a light bulb",
        compensation: 2000,
        perHour: false,
        datePosted: "5/5/21",
      },
    ],
    jobsProvided: [
      {
        jobTitle: "NEED MATH TUTORING",
        compensation: 5,
        perHour: true,
        datePosted: "3/23/21",
      },
      {
        jobTitle: "anyone know giving ukelele lessons???",
        compensation: 30,
        perHour: true,
        datePosted: "2/7/21",
      },
    ],
  });
});

module.exports = router;
