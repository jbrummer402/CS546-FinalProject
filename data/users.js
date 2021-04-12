const mongoCollections = require('./../config/mongoCollections');
const ObjectId = require('mongodb').ObjectId;
const users = mongoCollections.users;

async function create(firstName, lastName, dateOfBirth, username, password, address, photoLink) {
    // handle inputs
    try {
        await checkInputs();
    } catch (e) {
        throw new Error(e);
    }

    firstName = firstName.trim();
    lastName = lastName.trim();
    username = username.trim();
    password = password.trim();
    photoLink = photoLink.trim();

    const usersCollection = await users();

    let newUser = {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        username: username,
        password: password,
        address: address,
        photoLink: photoLink
    };

    const insertInfo = await usersCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw 'Could not create user!';

    const newId = insertInfo.insertedId;

    const book = await this.readByID(newId.toString());

    return book;
}

async function readByID(id) {
    // handle inputs
    if (id === undefined) throw 'Input must be provided for \'id\' parameter!';
    if (typeof id !== 'string') throw 'Input id must be a string!';
    if (!ObjectId.isValid(id)) throw 'Input id must be a valid ObjectID!';

    const usersCollection = await users();

    const user = await usersCollection.findOne({ _id: ObjectId(id) });
    if (user === null) throw 'No user with that id!';
    user._id = user._id.toString();
    user.dateOfBirth = `${user.dateOfBirth.getMonth()+1}/${user.dateOfBirth.getDate()}/${user.dateOfBirth.getFullYear()}`;

    return user;
}

// to be implemented
async function checkInputs() {

}

module.exports = {create, readByID};