const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewsData = data.reviews;
const { ObjectId } = require('mongodb');
const xss = require('xss');

router.get('/review/:id', async (req, res) =>{
    try {
        let id = xss(req.params.id);
        if(!id) throw 'No id';
        try{
            ObjectId(id);
        }
        catch (e){
            throw 'Not valid id';
        }
        const review = await reviewsData.getReviewById(id);
        res.json(review);
    } catch (e) {
        res.status(404).json({"message": "Not found"});
    }
});

router.get('/:userid', async (req, res) =>{
    try {
        // get reviews given by others to this user
        let userid = xss(req.params.userid);
        if(!userid) throw 'No userid';
        try{
            ObjectId(userid);
        }
        catch (e){
            throw 'Not valid id';
        }
        const reviews = await reviewsData.getReviewsReceivedForUser(userid);
        res.json(reviews);
    } catch (e) {
        res.status(404).json({"message": "Not found"});
    }
});

router.get('/given/:userid', async (req, res) =>{
    try {
        // get reviews given by this userid to others
        let userid = xss(req.params.userid);
        if(!userid) throw 'No userid';
        try{
            ObjectId(userid);
        }
        catch (e){
            throw 'Not valid id';
        }
        const reviews = await reviewsData.getReviewsGivenByUser(userid);
        res.json(reviews);
    } catch (e) {
        res.status(404).json({"message": "Not found"});
    }
});

router.post('/new', async (req, res) =>{
    // post to reviews/new must include in request body:
    // reviewer, reviewee, reviewDescription(text from review), rating(integer 1-5)
    try{
        let reviewer = xss(req.body.reviewer);
        let reviewee = xss(req.body.reviewee);
        let reviewDescription = xss(req.body.reviewDescription);
        let rating = xss(req.body.rating);
        let job = xss(req.body.job);
        
        if(!reviewer || !reviewee || !reviewDescription || !rating || !job) throw 'Missing arguments';
        if(reviewer.trim() == "" || reviewee.trim() == "" || reviewDescription.trim() == "" || job.trim() == "") throw 'Missing arguments';
        if(reviewer == reviewee) throw 'User can not review themself';
        try{
            ObjectId(reviewer);
        }
        catch(e){
            throw 'ReviewerID is not a valid ObjectID';
        }
        try{
            ObjectId(reviewee);
        }
        catch(e){
            throw 'RevieweeID is not a valid ObjectID';
        }
        try{
            ObjectId(job);
        }
        catch(e){
            throw 'JobID is not a valid ObjectID';
        }

        rating = parseFloat(rating);
        if( !Number.isInteger(rating) || rating < 1 || rating > 5 ) throw 'Rating must be integer between 1 and 5';

        const review = await reviewsData.createReview(reviewer, reviewee, rating, reviewDescription, job);
        
        res.json({
            "reviewCreated": "true",
            "review": review
        });
    }
    catch (e){
        res.status(400).json({
            "reviewCreated": "false",
            "message": `${e}`
        });
    }
});

router.patch('/:reviewid', async (req, res)=>{
    try{
        let id = xss(req.params.reviewid);
        let newRating = xss(req.body.rating);
        let newReviewDescription = xss(req.body.reviewDescription);
        if(!newRating && !newReviewDescription) throw 'No data to update';
        newRating = parseInt(newRating);
        if( (!Number.isInteger(newRating) || newRating < 1 || newRating > 5) && newReviewDescription.trim() == "" ) throw 'Rating must be integer between 1 and 5';
        if(newReviewDescription.trim()=="" && !newRating) throw 'New review must be non-whitespace string'; 
        if(newReviewDescription.trim()=="" && newRating) newReviewDescription = null; // so we can update rating only
        try{
            ObjectId(id);
        }
        catch(e){
            throw 'ReviewID is not a valid ObjectID';
        }
        let review;
        try{
            review = await reviewsData.getReviewById(id);
        }
        catch(e){
            res.status(404).json({"message": `Review not found`, "updated": "false"});
        }
        if(!req.session.AuthCookie || (req.session.AuthCookie.id != review.reviewerId)){
            console.log(req.session.AuthCookie.id);
            console.log(review.reviewerId);
            res.status(401).json({"message": 'Not authenticated as user of post', "updated": "false"});
        }
        let updatedReview;
        try{
            updatedReview = reviewsData.updateReview(id, newRating, newReviewDescription);
        }
        catch(e){
            throw e;
        }

        res.status(200).json({"updatedReview": JSON.stringify(updatedReview), "updated": "true"})
    }
    catch(e){
        console.error(e);
        res.status(400).json({"message": `${e}`, "updated": "false"});
    }
});


router.delete('/:reviewid', async (req, res) =>{
    try {
        let id = xss(req.params.reviewid);
        if(!id) throw 'No id';
        try{
            ObjectId(id);
        }
        catch (e){
            throw 'Invalid id';
        }
        let review;
        try{
            review = await reviewsData.getReviewById(id);
        }
        catch(e){
            res.status(404).json({"message":"review not found", "deleted": "false"});
        }
        if(!req.session.AuthCookie || (req.session.AuthCookie.id != review.reviewerId)){
            res.status(401).json({"message":"User can only delete review that they have written", "deleted": "false"});
        } 
        let deleteSuccess = false;

        deleteSuccess = await reviewsData.removeReviewById(id);
        if(!deleteSuccess) throw 'Not found';
        res.json({"message": `review ${id} deleted`, "deleted": "true"});
    } catch (e) {
        res.status(500).json({"message":`Server error: ${e}`, "deleted": "false"});
    }
});

module.exports = router;
