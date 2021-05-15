const dbConnection = require('../config/mongoConnection');
const js = require('./jobSeed');
const rs = require('./reviewSeed');
const us = require('./userSeed');

async function seedAll(){
    const db = await dbConnection();
    await db.dropDatabase();

    console.log("Seeding database...");
    await us.seedUsers();
    let jobs = await js.seedJobs();
    await rs.seedReviews(jobs);

    console.log("Done seeding database");
    await db.serverConfig.close();
}

seedAll();