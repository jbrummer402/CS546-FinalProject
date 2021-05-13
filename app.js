const express = require("express");
const app = express();
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const static = express.static(__dirname + "/public");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use("/public", static);
app.use(express.urlencoded({ extended: true }));

const session = require("express-session");
app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

// do not let already logged in user go to sign in page
app.use('/users/signin', (req, res, next) => {
  if (req.session.AuthCookie){
    return res.redirect('/users/profile');
  } else {
    next();
  }
})

// do not let not logged in user sign out
app.use('/users/signout', (req, res, next) => {
  if (!req.session.AuthCookie){
    return res.redirect('/');
  } else {
    next();
  }
})

// do not let not logged in user access profile page
app.use('/users/profile', (req, res, next) => {
  if (!req.session.AuthCookie){
    return res.redirect('/');
  } else {
    next();
  }
})

app.use(async (req, res, next) => {
  console.log(req.method);
  if (req.session.AuthCookie) {
    console.log(req.session.AuthCookie.username);
  } else {
    console.log("Not Authenticated");
  }
  next();
});

// FOR TESTING ONLY. TO BE DELETED LATER
// async function seed() {
//   // USER SEED
//   const userSeed = require("./seeds/userSeed");
//   await userSeed.seedUsers();

  // DELETE REVIEWS
  // keep this here so reviews don't get added multiple times
  // try {
  //   await reviewSeed.deleteReviews();
  // } catch (e) {
  //   console.error("No reviews to delete");
  // }

  // REVIEW SEED
  // const reviewSeed = require("./seeds/reviewSeed");
  // await reviewSeed.seedReviews();

  // DELETE USERS
  // try {
  //   await userSeed.deleteUsers();
  // } catch (e) {
  //   console.error("Nothing to delete");
  // }
// }

async function main() {
  app.use(express.json());

  configRoutes(app);
  //await seed();

  const port = 3000;
  app.listen(port, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${port}`);
  });
}

main();
