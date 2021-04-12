const express = require('express');
const app = express();
const configRoutes = require('./routes');

async function main() {
    app.use(express.json());

    configRoutes(app);

    const port = 3000;
    app.listen(port, () => {
        console.log("We've now got a server!");
        console.log(`Your routes will be running on http://localhost:${port}`);
    });
}

main();