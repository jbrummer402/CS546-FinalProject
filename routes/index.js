const usersRoutes = require("./users");
const jobsRoutes = require("./jobs");

const constructorMethod = (app) => {
  app.use("/users", usersRoutes);
  app.use("/jobs", jobsRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
