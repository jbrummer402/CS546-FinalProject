const data = require("../data");
const reviews = data.reviews;
const users = data.users;
const jobs = data.jobs;
const connection = require("../config/mongoConnection");
const mongoCollections = require("./../config/mongoCollections");
const reviewsConnection = mongoCollections.reviews;

async function seedReviews(completeJobs) {
    try {
        await reviews.createReview(
            reviewer = completeJobs[0][1],
            reviewee = completeJobs[0][0],
            rating = 1,
            reviewDescription = "My room may be brighter, but this guy still hasn't shed any light on the Laura Palmer murder case...",
            job = completeJobs[0][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[0][0],
            reviewee = completeJobs[0][1],
            rating = 3,
            reviewDescription = "Really weird dude. Paid ok but kept talking about a murder instead of the actual job",
            job = completeJobs[0][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[1][0],
            reviewee = completeJobs[1][1],
            rating = 5,
            reviewDescription = "I actually understand math now! this man is a miracle worker",
            job = completeJobs[1][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[1][1],
            reviewee = completeJobs[1][0],
            rating = 4,
            reviewDescription = "Really cool guy to work with",
            job = completeJobs[1][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[2][1],
            reviewee = completeJobs[2][0],
            rating = 5,
            reviewDescription = "He's not very good at ukelele but he's got the spirit",
            job = completeJobs[2][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[2][0],
            reviewee = completeJobs[2][1],
            rating = 4,
            reviewDescription = "I can definitely play ukelele better than I could 2 days ago",
            job = completeJobs[2][2]._id
        );
    } catch (e) {
        console.error(e);
    }
}


async function deleteReviews() {
    const reviewsCollection = await reviewsConnection();

    await reviewsCollection.drop();
}

module.exports = { seedReviews, deleteReviews };