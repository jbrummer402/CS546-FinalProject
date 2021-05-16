const data = require('../data');
const jobs = data.jobs;
const mongoConnection = require('../config/mongoConnection');
const mongoCollections = require('../config/mongoCollections');
const { ObjectID, ObjectId } = require('bson');
const jobCollection = mongoCollections.jobs;
const users = data.users;

async function seedJobs() {
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
        let user = await users.readByUsername("toneee");

        let job = await jobs.createJob(
            (compensation = 400),
            (perHour = false),
            (title = "Take Care of Some Buisiness"),
            (description = "I need a guy (or girl) who's not afraid to get his hands dirty"),
            (datePosted = new Date('5/11/2021')),
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
        let user = await users.readByUsername("madman");

        let job = await jobs.createJob(
            (compensation = 20),
            (perHour = true),
            (title = "Acting Teacher"),
            (description = "Please someone. This is very important. I need to be a great actor in the next 2 weeks"),
            (datePosted = new Date('4/12/2021')),
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
        let user = await users.readByUsername("xx_madman_xx");

        let job = await jobs.createJob(
            (compensation = 50),
            (perHour = true),
            (title = "Chef Wanted"),
            (description = "I need someone who can provide me with good food every Saturday at noon"),
            (datePosted = new Date('05/08/2021')),
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
        let user = await users.readByUsername("pauliew");

        let job = await jobs.createJob(
            (compensation = 60),
            (perHour = true),
            (title = "make some calls..."),
            (description = "These calls can't be traced to me... that's very important..."),
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
        let user = await users.readByUsername("ronaldxxx");

        let job = await jobs.createJob(
            (compensation = 700),
            (perHour = false),
            (title = "Get rid of these burgers FAST"),
            (description = "I don't care how you do it. I don't want to know how you do it. Just get it done."),
            (datePosted = new Date('04/04/2021')),
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
        let user = await users.readByUsername("luigi_l");

        let job = await jobs.createJob(
            (compensation = 1000),
            (perHour = false),
            (title = "please take out my brother"),
            (description = "Everyone loves him so much, I just can't take it. I want people to finally notice me"),
            (datePosted = new Date('3/01/2021')),
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
        let user = await users.readByUsername("laurapalmer");

        let job = await jobs.createJob(
            (compensation = 25),
            (perHour = true),
            (title = "bring me to life"),
            (description = "I don't want to be dead anymore. It's honestly not very fun"),
            (datePosted = new Date('4/27/2021')),
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
        let user = await users.readByUsername("vegeta");

        let job = await jobs.createJob(
            (compensation = 300),
            (perHour = false),
            (title = "help me destroy kakarot"),
            (description = "I cant stand that fool. I will defeat him one day but for now I wouldnt mind some help"),
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
        let user = await users.readByUsername("narutou");

        let job = await jobs.createJob(
            (compensation = 10),
            (perHour = true),
            (title = "personal assistant"),
            (description = "so I'm gonna need you to get me ramen whenever I want and hype me up about becoming hokage"),
            (datePosted = new Date('1/01/2021')),
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
        let user = await users.readByUsername("bsanders");

        let job = await jobs.createJob(
            (compensation = 300),
            (perHour = false),
            (title = "meme creator"),
            (description = "there's a lot of funny pictures of me. pls make them into memes. i want to be hip"),
            (datePosted = new Date('1/17/2021')),
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
        let user = await users.readByUsername("phill");

        let job = await jobs.createJob(
            (compensation = 44),
            (perHour = true),
            (title = "be my friend"),
            (description = "please i'm so lonely"),
            (datePosted = new Date('4/30/2021')),
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
        let user = await users.readByUsername("datboi");

        let job = await jobs.createJob(
            (compensation = 25),
            (perHour = true),
            (title = "announcement"),
            (description = "Everywhere I go, I'm gonna need you to preceed my with a big ol' 'here comes dat boi'"),
            (datePosted = new Date('5/05/2021')),
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
        let user = await users.readByUsername("jcaesar");

        let job = await jobs.createJob(
            (compensation = 200),
            (perHour = false),
            (title = "Plan my friend's birthday party"),
            (description = "I just wanna do right by this guy. He's always been there for me and he's someone I know would never stab me in the back"),
            (datePosted = new Date('3/15/2021')),
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
        let user = await users.readByUsername("lunaf");

        let job = await jobs.createJob(
            (compensation = 50),
            (perHour = false),
            (title = "STAN LOONA"),
            (description = "That's it. I will literally pay you $50 to just stan loona"),
            (datePosted = new Date('09/12/2020')),
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
        let user = await users.readByUsername("yaboyjesus");

        let job = await jobs.createJob(
            (compensation = 5),
            (perHour = false),
            (title = "preach for me?"),
            (description = "I've just risen again and would certainly like to hear what prayer is like these days"),
            (datePosted = new Date('4/17/2021')),
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
        let user = await users.readByUsername("piccolo");

        let job = await jobs.createJob(
            (compensation = 15),
            (perHour = true),
            (title = "Training Lessons"),
            (description = "I've recently found myself in charge of the training of a young boy. I don't know how to do this. Help"),
            (datePosted = new Date('4/19/2021')),
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
        let user = await users.readByUsername("yaboyghandi");

        let job = await jobs.createJob(
            (compensation = 12),
            (perHour = true),
            (title = "Food Fighter"),
            (description = "I would like you to just accompany me and smack anyone who tries to bring food near me"),
            (datePosted = new Date('5/14/2021')),
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
        let user = await users.readByUsername("johndoe");

        let job = await jobs.createJob(
            (compensation = 800),
            (perHour = false),
            (title = "Find jane doe"),
            (description = "I don't know where she's gone. She's missing. but all my searches just come up with randos"),
            (datePosted = new Date('3/04/2021')),
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
        let user = await users.readByUsername("janedoe");

        let job = await jobs.createJob(
            (compensation = 40),
            (perHour = true),
            (title = "find my John"),
            (description = "I can't find my husband. This is terrible"),
            (datePosted = new Date('3/04/2021')),
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
        let user = await users.readByUsername("bilinda");

        let job = await jobs.createJob(
            (compensation = 1200),
            (perHour = false),
            (title = "Dance Like No One is Watching"),
            (description = "I have two left feet and can't dance for the life of me. Help me change that"),
            (datePosted = new Date('2/04/2021')),
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
        let user = await users.readByUsername("vegeta");

        let job = await jobs.createJob(
            (compensation = 300),
            (perHour = false),
            (title = "Gift for wife"),
            (description = "Walk me through the process of finding a gift for my wife's birthday. I just can't do it"),
            (datePosted = new Date('5/10/2021')),
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
        let employer = await users.readByUsername("johndoe");

        let job = await jobs.createJob(
            (compensation = 100),
            (perHour = false),
            (title = "Make a Nice Dinner"),
            (description = "I want to surprise my wife"),
            (datePosted = new Date('4/05/2021')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'in-progress')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("lunaf"))._id;
        jobsCreated.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);

    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("yaboyjesus");

        let job = await jobs.createJob(
            (compensation = 500),
            (perHour = false),
            (title = "Help me become 'hip'"),
            (description = "Being dead for so long sucks. i want to become cool again"),
            (datePosted = new Date('3/03/2021')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'in-progress')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("datboi"))._id;
        jobsCreated.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);

    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("bilinda");

        let job = await jobs.createJob(
            (compensation = 35),
            (perHour = true),
            (title = "Politics"),
            (description = "I want to get into politics but i dont even know where to start"),
            (datePosted = new Date('5/01/2021')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'in-progress')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("bsanders"))._id;
        jobsCreated.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);

    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("yaboyghandi");

        let job = await jobs.createJob(
            (compensation = 3),
            (perHour = true),
            (title = "Let's have spiritual discussions"),
            (description = "I want to hear thoughts that are different from my own"),
            (datePosted = new Date('1/15/2021')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'in-progress')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("yaboyjesus"))._id;
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
            (compensation = 300),
            (perHour = true),
            (title = "Enforcer Work"),
            (description = "I need a big tough guy to intimidate some people"),
            (datePosted = new Date('1/29/2021')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'in-progress')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("vegeta"))._id;
        jobsCreated.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);

    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("vegeta");

        let job = await jobs.createJob(
            (compensation = 75),
            (perHour = true),
            (title = "Food"),
            (description = "I'm so hungry from fighting all the time. feed me"),
            (datePosted = new Date('2/07/2021')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'in-progress')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("ronaldxxx"))._id;
        jobsCreated.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);

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

    try {
        let employer = await users.readByUsername("lunaf");

        let job = await jobs.createJob(
            (compensation = 400),
            (perHour = false),
            (title = "Take pictures of the moon"),
            (description = "Bring them to me. I like to look at her..."),
            (datePosted = new Date('12/13/2020')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'completed')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("bilinda"))._id;
        jobsCreated.push([employerID, employeeID, job]);
        completeJobs.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);
    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("laurapalmer");

        let job = await jobs.createJob(
            (compensation = 13),
            (perHour = true),
            (title = "Barista"),
            (description = "The coffee shop I work at wants a new worker"),
            (datePosted = new Date('11/22/2020')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'completed')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("jcaesar"))._id;
        jobsCreated.push([employerID, employeeID, job]);
        completeJobs.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);
    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("madman");

        let job = await jobs.createJob(
            (compensation = 1500),
            (perHour = false),
            (title = "Design Thief"),
            (description = "I want a ninja who can steal me a look at other company's ads"),
            (datePosted = new Date('10/10/2020')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'completed')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("narutou"))._id;
        jobsCreated.push([employerID, employeeID, job]);
        completeJobs.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);
    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("datboi");

        let job = await jobs.createJob(
            (compensation = 31),
            (perHour = true),
            (title = "Plumber"),
            (description = "This is not a traditional plumbing job.. You are going to JUMP. You are going to STOMP. And you will ENJOY it"),
            (datePosted = new Date('07/09/2020')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'completed')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("luigi_l"))._id;
        jobsCreated.push([employerID, employeeID, job]);
        completeJobs.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);
    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("vegeta");

        let job = await jobs.createJob(
            (compensation = 15),
            (perHour = false),
            (title = "Fight Me"),
            (description = "I want to fight. Low pay because you should fight for your PRIDE"),
            (datePosted = new Date('08/18/2020')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'completed')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("piccolo"))._id;
        jobsCreated.push([employerID, employeeID, job]);
        completeJobs.push([employerID, employeeID, job]);

        // update job's employee
        job.employeeId = new ObjectId(employeeID);
        await jobs.updateJob(job._id.toString(), job);
    } catch (e) {
        console.error(e);
    }

    try {
        let employer = await users.readByUsername("ronaldxxx");

        let job = await jobs.createJob(
            (compensation = 50),
            (perHour = false),
            (title = "Hairstylist"),
            (description = "My hair is so crazy please do something about it"),
            (datePosted = new Date('11/20/2020')),
            (address = employer.address),
            (creator_id = ObjectID(employer._id)),
            (status = 'completed')
        );
        let employerID = employer._id;
        let employeeID = (await users.readByUsername("lunaf"))._id;
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