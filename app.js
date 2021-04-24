const express = require('express');
const app = express();
const configRoutes = require('./routes');

// FOR TESTING ONLY. TO BE DELETED LATER
async function seed() {
    // USER SEED
    const userSeed = require('./seeds/userSeed');
    // await userSeed.seedUsers();
    // try {
    //     await userSeed.deleteUsers();
    // } catch (e) {
    //     console.error("Nothing to delete");
    // }
}


async function main() {
    app.use(express.json());

    configRoutes(app);
    await seed();

    const port = 3000;
    app.listen(port, () => {
        console.log("We've now got a server!");
        console.log(`Your routes will be running on http://localhost:${port}`);
    });
}

main();