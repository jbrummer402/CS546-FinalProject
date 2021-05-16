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
        state: "  NJ",
        town: "Hoboken",
      }),
      (photoLink = "/public/profile_pics/agentcoop.jpeg"),
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
      (photoLink = "/public/profile_pics/ronald.jpeg"),
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
      (photoLink = "/public/profile_pics/tony.jpeg"),
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
            (photoLink = "/public/profile_pics/paulie.jpeg"),
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
            (photoLink = "/public/profile_pics/dondraper.jpeg"),
            (email = "dondraper@sterlingcooper.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Peter"),
            (lastName = "Campbell"),
            (dateOfBirth = "1/4/1976"),
            (userName = "xx_madman_xx"),
            (password = "password12"),
            (address = {
                street: "13-51 Perry St",
                aptNo: "6",
                zipCode: "10014",
                state: "NY",
                town: "New York",
            }),
            (photoLink = "/public/profile_pics/pete.jpeg"),
            (email = "pcambell@sterlingcooper.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Luigi"),
            (lastName = "Lugano"),
            (dateOfBirth = "6/8/1999"),
            (userName = "luigi_l"),
            (password = "password"),
            (address = {
                street: "69 Avon St",
                aptNo: "4",
                zipCode: "02143",
                state: "MA",
                town: "Somerville",
            }),
            (photoLink = "/public/profile_pics/luigi_l.jpeg"),
            (email = "luigi@plumbersrus.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Naruto"),
            (lastName = "Uzumaki"),
            (dateOfBirth = "7/12/1984"),
            (userName = "narutou"),
            (password = "password"),
            (address = {
                street: "615-643 E 2nd St",
                aptNo: "11",
                zipCode: "02127",
                state: "MA",
                town: "Boston",
            }),
            (photoLink = "/public/profile_pics/narutou.png"),
            (email = "narutou@mangaking.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Patrick"),
            (lastName = "Hill"),
            (dateOfBirth = "2/1/1975"),
            (userName = "phill"),
            (password = "password"),
            (address = {
                street: "1 Castle Point Terrace",
                aptNo: "",
                zipCode: "07030",
                state: "NJ",
                town: "Hoboken",
            }),
            (photoLink = "/public/profile_pics/phill.jpeg"),
            (email = "phill@stevens.edu")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Laura"),
            (lastName = "Palmer"),
            (dateOfBirth = "3/8/1970"),
            (userName = "laurapalmer"),
            (password = "password"),
            (address = {
                street: "15112 177th Ave SE",
                aptNo: "",
                zipCode: "98272",
                state: "WA",
                town: "Monroe",
            }),
            (photoLink = "/public/profile_pics/laurapalmer.jpeg"),
            (email = "laurapalmer@twinpeaks.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Bernie"),
            (lastName = "Sanders"),
            (dateOfBirth = "9/8/1941"),
            (userName = "bsanders"),
            (password = "password"),
            (address = {
                street: "19 Booth St",
                aptNo: "",
                zipCode: "05401",
                state: "VT",
                town: "Burlington",
            }),
            (photoLink = "/public/profile_pics/bsanders.jpeg"),
            (email = "bsanders@capitolhill.gov")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Jane"),
            (lastName = "Doe"),
            (dateOfBirth = "1/15/1995"),
            (userName = "janedoe"),
            (password = "password"),
            (address = {
                street: "222 Homestead Rd",
                aptNo: "",
                zipCode: "07652",
                state: "NJ",
                town: "Paramus",
            }),
            (photoLink = "/public/profile_pics/janedoe.jpeg"),
            (email = "janedoe@gmail.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "John"),
            (lastName = "Doe"),
            (dateOfBirth = "10/21/1981"),
            (userName = "johndoe"),
            (password = "password"),
            (address = {
                street: "46 Highland Ave",
                aptNo: "",
                zipCode: "07028",
                state: "NJ",
                town: "Glen Ridge",
            }),
            (photoLink = "/public/profile_pics/johndoe.jpeg"),
            (email = "johndoe@gmail.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Vegeta"),
            (lastName = "Suzuki"),
            (dateOfBirth = "11/15/1954"),
            (userName = "vegeta"),
            (password = "password"),
            (address = {
                street: "4605 S Van Ness Ave",
                aptNo: "",
                zipCode: "90062",
                state: "CA",
                town: "Los Angeles",
            }),
            (photoLink = "/public/profile_pics/vegeta.jpeg"),
            (email = "vegeta@dbz.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Piccolo"),
            (lastName = "Myiazaki"),
            (dateOfBirth = "4/8/1959"),
            (userName = "piccolo"),
            (password = "password"),
            (address = {
                street: "8721 Rathburn Ave, Westminster, CA 92683",
                aptNo: "",
                zipCode: "92683",
                state: "CA",
                town: "Westminster",
            }),
            (photoLink = "/public/profile_pics/piccolo.jpeg"),
            (email = "piccolo@dbz.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Bilinda"),
            (lastName = "Butcher"),
            (dateOfBirth = "8/12/1968"),
            (userName = "bilinda"),
            (password = "password"),
            (address = {
                street: "1509 Brentwood St",
                aptNo: "",
                zipCode: "78757",
                state: "TX",
                town: "Austin",
            }),
            (photoLink = "/public/profile_pics/bilinda.jpeg"),
            (email = "bilinda@mbv.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Julius"),
            (lastName = "Caesar"),
            (dateOfBirth = "2/3/1940"),
            (userName = "jcaesar"),
            (password = "password"),
            (address = {
                street: "4602a Ashland Ave",
                aptNo: "",
                zipCode: "63115",
                state: "MO",
                town: "St. Louis",
            }),
            (photoLink = "/public/profile_pics/jcaesar.jpeg"),
            (email = "jcaesar@romanempire.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Luna"),
            (lastName = "Ferreira"),
            (dateOfBirth = "7/7/2020"),
            (userName = "lunaf"),
            (password = "password"),
            (address = {
                street: "936 N St Lucas St",
                aptNo: "",
                zipCode: "18104",
                state: "PA",
                town: "Allentown",
            }),
            (photoLink = "/public/profile_pics/lunaf.jpg"),
            (email = "lunaf@schnauzergang.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Dat"),
            (lastName = "Boii"),
            (dateOfBirth = "7/1/2015"),
            (userName = "datboi"),
            (password = "password"),
            (address = {
                street: "1016-1018 Park Ave",
                aptNo: "6",
                zipCode: "07030",
                state: "NJ",
                town: "Hoboken",
            }),
            (photoLink = "/public/profile_pics/datboi.jpeg"),
            (email = "datboi@dankmemes.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Jesus"),
            (lastName = "Christ"),
            (dateOfBirth = "12/31/1900"),
            (userName = "yaboyjesus"),
            (password = "password"),
            (address = {
                street: "913 Washington St",
                aptNo: "2",
                zipCode: "07030",
                state: "NJ",
                town: "Hoboken",
            }),
            (photoLink = "/public/profile_pics/yaboyjesus.jpeg"),
            (email = "yaboyjesus@christianmingle.com")
        );
    } catch (e) {
        console.error(e);
    }

    try {
        await users.create(
            (firstName = "Mahatma"),
            (lastName = "Gandhi"),
            (dateOfBirth = "1/1/1900"),
            (userName = "yaboyghandi"),
            (password = "password"),
            (address = {
                street: "722 Willow Ave",
                aptNo: "3",
                zipCode: "07030",
                state: "NJ",
                town: "Hoboken",
            }),
            (photoLink = "/public/profile_pics/yaboyghandi.jpeg"),
            (email = "yaboyghandi@hindumingle.com")
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
