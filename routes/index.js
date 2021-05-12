const usersRoutes = require("./users");
const jobsRoutes = require("./jobs");
const reviewRoutes = require("./reviews")

const constructorMethod = (app) => {
  app.use("/users", usersRoutes);
  app.use("/jobs", jobsRoutes);
  app.use("/reviews", reviewRoutes);


  app.use("/$", (req, res) => {
    res.render('partials/landing');
  });

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
