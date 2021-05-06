const mongoCollections = require("./../config/mongoCollections");
const reviewsDb = mongoCollections.reviews;
const { ObjectId } = require('mongodb');


async function createReview(reviewer, reviewee, rating, reviewDescription){
    // reviewer and reviewee must be ObjectId or valid string that can convert to ObjectId
    // rating must be number or string of an integer between 1 and 5
    // review description must be non empty/whitespace string
    if(!reviewer || !reviewee || !rating || !reviewDescription || !date) throw 'Missing arguments to create review';
    if( !Number.isInteger(rating) || rating < 1 || rating > 5 ) throw 'Rating must be integer between 1 and 5';
    if(typeof reviewDescription != 'string' || reviewDescription.trim() == '') throw 'Review text must be a non empty string';

    /*
    if(!date || !(date instanceof Date && !Number.isNaN(Date.parse(date)) ) ) throw 'No date provided';
    if(!(date instanceof Date)) date = new Date(date); // date given is not a Date object, but parses to one, so convert to a Date object
    */
    const date = new Date(); // set review date to current time we are adding it to DB
    rating = parseInt(rating);
    let reviewerId;
    let revieweeId;
    try{
        reviewerId = ObjectId(reviewer);
    }
    catch(e){
        throw 'ReviewerID is not a valid ObjectID';
    }
    try{
        revieweeId = ObjectId(reviewee);
    }
    catch(e){
        throw 'RevieweeID is not a valid ObjectID';
    }

    if(reviewerId.toString() == revieweeId.toString()) throw 'User can not give review to themself';

    const newReview = {
        "_id": ObjectId(),
        "reviewerId": reviewerId,
        "revieweeId": revieweeId,
        "rating": rating,
        "reviewDescription": reviewDescription,
        "dateOfReview": date
    };

    const db = await reviewsDb();
    const insertInfo = await db.insertOne(newReview);
    if (insertInfo.insertedCount === 0) throw 'Could not add review';
    const newId = insertInfo.insertedId.toString();

    return await this.getReviewById(newId);
}

async function updateReview(reviewId, newRating, newReviewDescription){
    // allow update to review
    // can not change reviewer or reviewee, but can change rating and description
    // otherwise we can delete if required
    // will change dateofreview to new date at time of update

    if(!reviewId) throw 'No reviewId provided to update';
    try{
        reviewId = ObjectId(reviewId);
    }
    catch(e){
        throw 'ReviewId is not a valid ObjectID';
    }
    if(!newRating && !newReviewDescription) throw 'No data given to update review with';
    let oldReview;
    try{
        oldReview = await this.getReviewById(reviewId);
    }
    catch(e){
        throw 'Error finding review to update with given id';
    }
    
    if(!newRating) newRating = oldReview.rating;
    if(!newReviewDescription) newReviewDescription = oldReview.reviewDescription;

    if(newRating){
        if( !Number.isInteger(newRating) || newRating < 1 || newRating > 5 ) throw 'Rating must be integer between 1 and 5';
    }
    if(newReviewDescription){
        if(typeof newReviewDescription != 'string' || newReviewDescription.trim() == '') throw 'Review text must be a non empty string';
    }

    if(newRating == oldReview.rating && newReviewDescription == oldReview.reviewDescription) throw 'Update info is same as old review';

    let date = new Date(); // update date so it shows when last modification was made

    const updatedReview = {
        "rating": newRating,
        "reviewDescription": newReviewDescription,
        "dateOfReview": date
    };

    const db = await reviewsDb();
    const updateInfo = await db.updateOne({_id: reviewId}, {$set: updatedReview});
    if(!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
    return await this.getReviewById(reviewId);
}

async function removeReviewById(id){
    if(!id) throw 'No reviewId provided to delete';
    try{
        id = ObjectId(id);
    }
    catch(e){
        throw 'ReviewId given to delete is not a valid ObjectId';
    }

    const db = await reviewsDb();
    const deleted  = await db.findOneAndDelete( { _id: id } );
    if (deleted === null) throw `Could not delete review with id: ${id}`;
    return true;
}

async function getReviewById(id){
    if(!id) throw 'No reviewId provided';
    try{
        id = ObjectId(id);
    }
    catch(e){
        throw 'ReviewId given is not a valid ObjectId';
    }

    const db = await reviewsDb();
    const review = await db.findOne({ _id: id });
    if(review === null) throw 'Review not found with given id';
    review._id = review._id.toString();
    review.reviewerId = review.reviewerId.toString();
    review.revieweeId = review.revieweeId.toString();
    return review;
}

async function getReviewsGivenByUser(userId){
    // Finds all reviews given by this user
    // (returns all reviews where reviewerId = id passed)
    if(!userId) throw 'No userId provided';
    let id;
    try{
        id = ObjectId(userId);
    }
    catch(e){
        throw 'UserId given is not a valid ObjectId';
    }

    const db = await reviewsDb();
    let reviewsFound = await db.find( {reviewerId: id} ).toArray();

    for(let review of reviewsFound){
        review._id = review._id.toString();
        review.reviewerId = review.reviewerId.toString();
        review.revieweeId = review.revieweeId.toString();
    }

    return reviewsFound;
}

async function getReviewsReceivedForUser(userId){
    // Finds all reviews for user
    // (returns all reviews where revieweeId = id passed)
    if(!userId) throw 'No userId provided';
    let id;
    try{
        id = ObjectId(userId);
    }
    catch(e){
        throw 'UserId given is not a valid ObjectId';
    }

    const db = await reviewsDb();
    let reviewsFound = await db.find( {revieweeId: id} ).toArray();

    for(let review of reviewsFound){
        review._id = review._id.toString();
        review.reviewerId = review.reviewerId.toString();
        review.revieweeId = review.revieweeId.toString();
    }

    return reviewsFound;
}

async function removeAllReviewsForUser(userId){
    // For deletion of all reviews given and received for a user (used for account deletion)
    if(!userId) throw 'No userId provided to delete reviews for';
    let id;
    try{
        id = ObjectId(userId);
    }
    catch(e){
        throw 'UserId given to delete is not a valid ObjectId';
    }

    const db = await reviewsDb();
    const deleted  = await db.deleteMany( { $or: [ { reviewerId: id }, { revieweeId: id} ] } );
    if (deleted === null) throw `No reviews to delete for userid: ${id}`;
    return true;
}

module.exports = {
    createReview, removeReviewById, updateReview, getReviewById, getReviewsGivenByUser, getReviewsReceivedForUser, removeAllReviewsForUser
}