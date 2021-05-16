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
            reviewer = completeJobs[0][0],
            reviewee = completeJobs[0][1],
            rating = 1,
            reviewDescription = "My room may be brighter, but this guy still hasn't shed any light on the Laura Palmer murder case...",
            job = completeJobs[0][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[0][1],
            reviewee = completeJobs[0][0],
            rating = 3,
            reviewDescription = "Really weird dude. Paid ok but kept talking about murder instead of the actual job",
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

    try {
        await reviews.createReview(
            reviewer = completeJobs[3][0],
            reviewee = completeJobs[3][1],
            rating = 5,
            reviewDescription = "These pictures are so nice...",
            job = completeJobs[3][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[3][1],
            reviewee = completeJobs[3][0],
            rating = 3,
            reviewDescription = "Nice girl, but very strange",
            job = completeJobs[3][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[4][0],
            reviewee = completeJobs[4][1],
            rating = 1,
            reviewDescription = "Didn't last long. Kept talking about politics and war instead of working",
            job = completeJobs[4][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[4][1],
            reviewee = completeJobs[4][0],
            rating = 2,
            reviewDescription = "They just don't understand me",
            job = completeJobs[4][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[5][0],
            reviewee = completeJobs[5][1],
            rating = 4,
            reviewDescription = "Good kid. Kinda loud for a ninja though.",
            job = completeJobs[5][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[5][1],
            reviewee = completeJobs[5][0],
            rating = 5,
            reviewDescription = "I did a great job! BELIEVE IT",
            job = completeJobs[5][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[6][0],
            reviewee = completeJobs[6][1],
            rating = 5,
            reviewDescription = "this green man he jumps real good",
            job = completeJobs[6][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[6][1],
            reviewee = completeJobs[6][0],
            rating = 2,
            reviewDescription = "If I'm being completely honest I didnt really like working for a frog",
            job = completeJobs[6][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[7][0],
            reviewee = completeJobs[7][1],
            rating = 1,
            reviewDescription = "This is bs you didnt fight fair and you know it",
            job = completeJobs[7][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[7][1],
            reviewee = completeJobs[7][0],
            rating = 5,
            reviewDescription = "I won lmao",
            job = completeJobs[7][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[8][0],
            reviewee = completeJobs[8][1],
            rating = 1,
            reviewDescription = "My hair is somehow WORSE than before. I don't know how that's even possible",
            job = completeJobs[8][2]._id
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = completeJobs[8][1],
            reviewee = completeJobs[8][0],
            rating = 3,
            reviewDescription = "His words said he loved it but his eyes said he didn't",
            job = completeJobs[8][2]._id
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