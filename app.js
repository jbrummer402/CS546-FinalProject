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

// helper for handlebars
let hbs = exphbs.create({});
hbs.handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

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
app.use('/profile/', (req, res, next) => {
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

app.use('/reviews', async (req, res, next) => {
  // Users can only delete reviews they created
  // Any user can see review
  // User can only update(patch) review they created
  const method = req.method;
  let auth = req.session.AuthCookie;
  if(method == 'DELETE' || method == 'POST' || method == 'PATCH'){
    if(!auth) res.status(401).json({'message':'Unauthorized request'});
  }
  next();
});

app.use('/users', async (req, res, next) => {
  // Users can see(GET) any profile
  // Users can only delete their own account
  const method = req.method;
  let auth = req.session.AuthCookie;
  if(method == 'DELETE'){
    if(!auth) res.status(401).json({'message':'Unauthorized request'});
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


// handlebars equal helpher from 
// https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value