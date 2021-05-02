const express = require("express");
const app = express();
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const static = express.static(__dirname + "/public");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use("/public", static);

//IN DEVELOPMENT (JOSE)
const session = require("express-session");
app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(async (req, res, next) => {
  if (req.session.AuthCookie) {
    console.log(req.session.AuthCookie.username);
  } else {
    console.log("Not Authenticated");
  }
  next();
});

// FOR TESTING ONLY. TO BE DELETED LATER
async function seed() {
  // USER SEED
  const userSeed = require("./seeds/userSeed");
  await userSeed.seedUsers();
  // try {
  //   await userSeed.deleteUsers();
  // } catch (e) {
  //   console.error("Nothing to delete");
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
