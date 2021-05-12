const dbConnection = require('../config/mongoConnection');
const js = require('./jobSeed');
const rs = require('./reviewSeed');
const us = require('./userSeed');

async function seedAll(){
    const db = await dbConnection();
    await db.dropDatabase();

    console.log("Seeding database...");
    await us.seedUsers();
    await rs.seedReviews();
    await js.seedJobs();

    console.log("Done seeding database");
    await db.serverConfig.close();
}

seedAll();