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
        let deleteSuccess = false;

        deleteSuccess = await reviewsData.removeReviewById(id);
        if(!deleteSuccess) throw 'Not found';
        res.json({"message": `review ${id} deleted`, "deleted": "true"});
    } catch (e) {
        res.status(404).json({"message":"review not found", "deleted": "false"});
    }
});

module.exports = router;
