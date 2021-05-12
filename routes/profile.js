const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const jobsData = data.jobs;
const reviewData = data.reviews;
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");
const xss = require('xss');


router.get("/account", async (req, res) => {
    // let jobs;
    // try {
    //   jobs = await jobsData.readByID(req.session.AuthCookie.id);
    // } catch (error) {
    //   console.log(error);
    // }

    res.render("partials/profile/account", {
        title: req.session.AuthCookie.username,
        layout: 'profile',
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
        layout: 'profile',
        username: req.session.AuthCookie.username
    });
});

router.get("/reviews", async (req, res) => {
    res.render("partials/profile/reviews", {
        title: "My Reviews",
        layout: 'profile',
        username: req.session.AuthCookie.username,
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

router.get("/activejobs", async (req, res) => {
    res.render("partials/profile/activejobs", {
        title: "My Active Jobs",
        layout: 'profile',
        username: req.session.AuthCookie.username,
    });
});

router.get("/inprogressjobs", async (req, res) => {
    res.render("partials/profile/inprogressjobs", {
        title: "My In-Progress Jobs",
        layout: 'profile',
        username: req.session.AuthCookie.username,
    });
});

router.get("/completedjobs", async (req, res) => {
    res.render("partials/profile/completedjobs", {
        title: "My Completed Jobs",
        layout: 'profile',
        username: req.session.AuthCookie.username,
    });
});



module.exports = router;