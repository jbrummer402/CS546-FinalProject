const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;
const ObjectId = require('mongodb').ObjectId;

router.post('/', async (req, res) => {
    let {firstName, lastName, dateOfBirth, username, password, address, photoLink} = req.body;

    // // handle inputs
    const {errorCode, message} = await checkInputs();
    if (errorCode !== 0) {
        res.status(errorCode).json({error: message});
        return;
    }

    dateOfBirth = new Date(dateOfBirth);

    try {
        const newUser = await usersData.create(firstName, lastName, dateOfBirth, username, password, address, photoLink);
        res.json(newUser);
    } catch (e) {
        res.sendStatus(500);
    }
});

// to be implemented
async function checkInputs() {
    return {errorCode: 0, message: ""};
}

module.exports = router;