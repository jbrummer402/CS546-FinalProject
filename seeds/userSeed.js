const data = require("../data");
const users = data.users;
const connection = require("../config/mongoConnection");
const mongoCollections = require("./../config/mongoCollections");
const usersConnection = mongoCollections.users;

async function seedUsers() {
  try {
    await users.create(
      (firstName = "Dale"),
      (lastName = "Cooper"),
      (dateOfBirth = "4/8/1921"),
      (userName = "aGentcOOp"),
      (password = "blacklodge"),
      (address = {
        street: "465 main st",
        aptNo: "9",
        zipCode: "33322",
        state: "  NE",
        town: "Hoboken",
      }),
      (photoLink = "C:/pics/owl.png"),
      (email = "dUdE11@crazysIte.com")
    );
  } catch (e) {
    console.error(e);
  }

  try {
    await users.create(
      (firstName = "Ronald"),
      (lastName = "McDonald"),
      (dateOfBirth = "1/12/1985"),
      (userName = "ronaldXxX"),
      (password = "mickeydeez33"),
      (address = {
        street: "8 Adams St",
        aptNo: "",
        zipCode: "22334",
        state: "NJ",
        town: "Hoboken",
      }),
      (photoLink = "/pics/fatburger.jpeg"),
      (email = "ronaldmd@mickeydeez.com")
    );
  } catch (e) {
    console.error(e);
  }

  try {
    await users.create(
      (firstName = "Antonio"),
      (lastName = "Soprano"),
      (dateOfBirth = "6/23/1965"),
      (userName = "ToNEeE"),
      (password = "wiseguy"),
      (address = {
        street: "61 Canopy St",
        aptNo: "34",
        zipCode: "02155",
        state: "nj",
        town: "Newark",
      }),
      (photoLink = "/pics/gabagool.jpeg"),
      (email = "tonys@dafivefamilies.com")
    );
  } catch (e) {
    console.error(e);
  }

    try {
        await users.create(
            (firstName = "Paulie"),
            (lastName = "Walnuts"),
            (dateOfBirth = "8/4/1959"),
            (userName = "pauliew"),
            (password = "aytone"),
            (address = {
                street: "145 Belmont Ave",
                aptNo: "3",
                zipCode: "07304",
                state: "nj",
                town: "Jersey City",
            }),
            (photoLink = "/pics/manicotti.jpeg"),
            (email = "pauliew@colombofam.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Donald"),
            (lastName = "Draper"),
            (dateOfBirth = "8/14/1989"),
            (userName = "madman"),
            (password = "dickwhitman"),
            (address = {
                street: "303 E 83rd St",
                aptNo: "14",
                zipCode: "10028",
                state: "NY",
                town: "New York",
            }),
            (photoLink = "/pics/me.jpeg"),
            (email = "dondraper@sterlingcooper.com")
        );
    } catch (e) {
        console.error(e);
    }
}

async function deleteUsers() {
  const usersCollection = await usersConnection();

  await usersCollection.drop();
}

module.exports = { seedUsers, deleteUsers };
