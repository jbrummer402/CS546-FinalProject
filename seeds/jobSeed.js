const data = require('../data');
const jobs = data.jobs;
const mongoConnection = require('../config/mongoConnection');
const mongoCollections = require('../config/mongoCollections');
const { ObjectID, ObjectId } = require('bson');
const jobCollection = mongoCollections.jobs;


async function seedJobs() {
    try {
        await jobs.createJob(
            (compensation = 15.5),
            (perHour = true),
            (title = "asdc"),
            (description = "dfvd"),
            (datePosted = new Date('03/12/2021')),
            (address = {
                street : { streetNo : 23, streetName : "lkm"},
                aptNo : "",
                zipCode : "07928",
                state : "NJ",
                town : "erfvaer"
            }),
            (creator_id = ObjectID()),
            (status = 'active')
        );
    } catch (e) {
        console.error(e);
    }
        try {
            await jobs.createJob(
                (compensation = 15.5),
                (perHour = true),
                (title = "moving"),
                (description = "sdcsd"),
                (datePosted = new Date('03/12/2021')),
                (address = {
                    street : { streetNo : 23, streetName : "schindler"},
                    aptNo : "",
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
    
}

module.exports = { seedJobs };