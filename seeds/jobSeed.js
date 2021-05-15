const data = require('../data');
const jobs = data.jobs;
const mongoConnection = require('../config/mongoConnection');
const mongoCollections = require('../config/mongoCollections');
const { ObjectID, ObjectId } = require('bson');
const jobCollection = mongoCollections.jobs;
const users = data.users;

async function seedJobs() {
    // try {
    //     const user = await users.readByUsername("agentcoop");
    //     let userId = await users.readByID(user._id);
    //     await jobs.createJob(
    //         (compensation = 15.5),
    //         (perHour = true),
    //         (title = "asdc"),
    //         (description = "dfvd"),
    //         (datePosted = new Date('03/12/2021')),
    //         (address = {
    //             street : { streetNo : 23, streetName : "Schindler Court"},
    //             aptNo : "",
    //             zipCode : "07928",
    //             state : "NJ",
    //             town : "Chatham"
    //         }),
    //         (creator_id = userId._id),
    //         (status = 'active')
    //     );
    // } catch (e) {
    //     console.error(e);
    // }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 52, streetName : "Chandler road"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 1351.25),
    //             (perHour = false),
    //             (title = "moving"),
    //             (description = "I need help moving"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 246, streetName : "Street street"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'in-progress')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'completed')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'in-progress')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'completed')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'in-progress')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'completed')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    //     try {
    //         const user = await users.readByUsername("agentcoop");
    //         let userId = await users.readByID(user._id);
    //
    //         await jobs.createJob(
    //             (compensation = 15.5),
    //             (perHour = true),
    //             (title = "moving"),
    //             (description = "sdcsd"),
    //             (datePosted = new Date('03/12/2021')),
    //             (address = {
    //                 street : { streetNo : 23, streetName : "schindler"},
    //                 aptNo : "",
    //                 zipCode : "07928",
    //                 state : "NJ",
    //                 town : "Chatham"
    //             }),
    //             (creator_id = ObjectID(userId._id)),
    //             (status = 'active')
    //         );
    //     } catch (e) {
    //         console.error(e);
    //     }





    // SLIGHTLY DIFFERENT SEEDING FORMAT. ALSO UPDATES USERS' JOB ARRAYS.
    let jobsCreated = [];
    let completeJobs = [];

    try {
        let user = await users.readByUsername("agentcoop");

        let job = await jobs.createJob(
            (compensation = 15),
            (perHour = true),
            (title = "NEED HELP MOVING FURNITURE!"),
            (description = "it's just... too heavy, you know?"),
            (datePosted = new Date('04/1/2021')),
            (address = user.address),
            (creator_id = ObjectID(user._id)),
            (status = 'active')
        );
        let employerID = user._id;
        let employeeID = undefined;
        jobsCreated.push([employerID, employeeID, job]);
    } catch (e) {
        console.error(e);
    }

    try {
        let user = await users.readByUsername("agentcoop");

        let job = await jobs.createJob(
            (compensation = 300),
            (perHour = false),
            (title = "SOMEONE PLS FIX MY COMPUTER!!"),
            (description = "I think you need to download some more RAM to fix it."),
            (datePosted = new Date('3/10/2021')),
            (address = user.address),
            (creator_id = ObjectID(user._id)),
            (status = 'active')
        );
        let employerID = user._id;
        let employeeID = undefined;
        jobsCreated.push([employerID, employeeID, job]);
    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("ronaldxxx");

        let job = await jobs.createJob(
            (compensation = 500),
            (perHour = false),
            (title = "Destroy the Burger King"),
            (description = "I want him gone. I mean it."),
            (datePosted = new Date('5/1/2021')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'in-progress')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("agentcoop"))._id;
        jobsCreated.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);

    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("toneee");

        let job = await jobs.createJob(
            (compensation = 20),
            (perHour = true),
            (title = "MY DOG NEEDS PIANO LESSONS"),
            (description = "She's been playing for year and butchers Moonlight Sonata."),
            (datePosted = new Date('2/7/2021')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'in-progress')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("agentcoop"))._id;
        jobsCreated.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);
    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("agentcoop");

        let job = await jobs.createJob(
            (compensation = 1000),
            (perHour = false),
            (title = "teach me how to make a grilled cheese"),
            (description = "i really want to impress my boss when he comes to my dinner party next month"),
            (datePosted = new Date('4/21/2021')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'in-progress')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("madman"))._id;
        jobsCreated.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);
    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("pauliew");

        let job = await jobs.createJob(
            (compensation = 2000),
            (perHour = false),
            (title = "For the love of god, come help me change a light bulb"),
            (description = "i've tried and i've tried but i just can't do it. they don't teach you this stuff at Stevens."),
            (datePosted = new Date('9/15/2020')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'completed')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("agentcoop"))._id;
        jobsCreated.push([employerID, employeeID, job]);
        completeJobs.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);
    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("agentcoop");

        let job = await jobs.createJob(
            (compensation = 5),
            (perHour = true),
            (title = "NEED MATH TUTORING"),
            (description = "i have no clue what a derivative is. pls halp"),
            (datePosted = new Date('4/15/2019')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'completed')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("toneee"))._id;
        jobsCreated.push([employerID, employeeID, job]);
        completeJobs.push([employerID,employeeID,job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);
    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("agentcoop");

        let job = await jobs.createJob(
            (compensation = 30),
            (perHour = true),
            (title = "anyone know giving ukelele lessons???"),
            (description = "i just landed a Greek yogurt commercial gig and need to learn ASAP"),
            (datePosted = new Date('10/4/2020')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'completed')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("xx_madman_xx"))._id;
        jobsCreated.push([employerID, employeeID, job]);
        completeJobs.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);
    } catch (e) {
        console.error(e);
    }



    // insert jobs into job arrays for users
    for (let [employerID, employeeID, job] of jobsCreated) {
        let employer = await users.readByID(employerID);
        let employee = employeeID !== undefined ? await users.readByID(employeeID) : undefined;
        let jobID = job._id.toString();

        let updateObjEmployer = {id: employerID};
        let updateObjEmployee = {id: employeeID};
        let updateJob = job;

        if (job.status === 'active') {
            let jobsActive = employer.jobsActive;
            jobsActive.push(jobID);
            updateObjEmployer.jobsActive = jobsActive;
        } else if (job.status === 'in-progress') {
            let jobsInProgressAsEmployer = employer.jobsInProgressAsEmployer;
            let jobsInProgressAsEmployee = employee.jobsInProgressAsEmployee;

            jobsInProgressAsEmployer.push(jobID);
            jobsInProgressAsEmployee.push(jobID);

            updateJob.employeeId = employee._id;

            updateObjEmployer.jobsInProgressAsEmployer = jobsInProgressAsEmployer;
            updateObjEmployee.jobsInProgressAsEmployee = jobsInProgressAsEmployee;
        } else if (job.status === 'completed') {
            let jobsProvided = employer.jobsProvided;
            let jobsWorked = employee.jobsWorked;

            jobsProvided.push(jobID);
            jobsWorked.push(jobID);

            updateJob.employeeId = employee._id;

            updateObjEmployer.jobsProvided = jobsProvided;
            updateObjEmployee.jobsWorked = jobsWorked;
        }

        try {
            await users.update(updateObjEmployer);
        } catch (e) {
            console.error(e)
        }
        if (job.status === 'in-progress' || job.status === 'completed'){
            try {
                await jobs.updateJob(updateJob._id, updateJob);
            } catch(e){
                console.error(e);
            }
            try {
                await users.update(updateObjEmployee);
            } catch (e) {
                console.error(e)
            }
        }

    }
    
    return completeJobs;
    
}

module.exports = { seedJobs };