const data = require('../data');
const jobs = data.jobs;
const mongoConnection = require('../config/mongoConnection');
const mongoCollections = require('../config/mongoCollections');
const { ObjectID } = require('bson');
const jobCollection = mongoCollections.jobs;


async function seedJobs() {
    try {
        await jobs.createJob(
            (compensation = 15.5),
            (perHour = true),
            (title = "Help moving"),
            (description = "I need help moving into my apartment"),
            (datePosted = new Date('03/12/2021')),
            (address = {
                street : {streetNo : 52, streetName : "Chandler Road"},
                aptNp : "",
                zipCode : "07928",
                state : "NJ",
                town : "Chatham"
            }),
            (creator_id = ObjectID()),
            (status = 'active')
        );
    } catch (e) {
        console.error(e);
    }
    try {
        await jobs.createJob(
            (compensation = 255.00),
            (perHour = false),
            (title = "Tutoring"),
            (description = "My son needs help with math"),
            (datePosted = new Date('03/16/2021')),
            (address = {
                street : {streetNo : 52, streetName : "Chandler Road"},
                aptNp : "",
                zipCode : "07928",
                state : "NJ",
                town : "Chatham"
            }),
            // need to get objectid of user
            (creator_id = ObjectID()),
            (status = 'active')
        );
    } catch (e) {
        console.error(e);
    }
    
}

module.exports = { seedJobs };