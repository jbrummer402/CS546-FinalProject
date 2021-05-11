const data = require("../data");
const reviews = data.reviews;
const users = data.users;
const connection = require("../config/mongoConnection");
const mongoCollections = require("./../config/mongoCollections");
const reviewsConnection = mongoCollections.reviews;

async function seedReviews() {
    try {
        await reviews.createReview(
            reviewer = (await users.readByUsername('pauliew'))._id,
            reviewee = (await users.readByUsername('toneee'))._id,
            rating = 1,
            reviewDescription = "Ohhh! Not hiring this guy evah again!"
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = (await users.readByUsername('ronaldxxx'))._id,
            reviewee = (await users.readByUsername('toneee'))._id,
            rating = 5,
            reviewDescription = "God the job done! The BK King is out of the picture."
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = (await users.readByUsername('toneee'))._id,
            reviewee = (await users.readByUsername('agentcoop'))._id,
            rating = 2,
            reviewDescription = "Still hasn't solved the Laura Palmer murder case..."
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = (await users.readByUsername('ronaldxxx'))._id,
            reviewee = (await users.readByUsername('agentcoop'))._id,
            rating = 5,
            reviewDescription = "This dude helped me paint my MickeyDee's sign!"
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = (await users.readByUsername('madman'))._id,
            reviewee = (await users.readByUsername('agentcoop'))._id,
            rating = 5,
            reviewDescription = "Helped me moved some boxes around for a dollar fitty!"
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await reviews.createReview(
            reviewer = (await users.readByUsername('agentcoop'))._id,
            reviewee = (await users.readByUsername('madman'))._id,
            rating = 4,
            reviewDescription = "Good work on the Coke ad!"
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