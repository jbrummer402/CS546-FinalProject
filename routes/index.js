const usersRoutes = require("./users");
const jobsRoutes = require("./jobs");
const reviewRoutes = require("./reviews")
const profileRoutes = require("./profile")

const constructorMethod = (app) => {
  app.use("/users", usersRoutes);
  app.use("/jobs", jobsRoutes);
  app.use("/reviews", reviewRoutes);

  app.use("/profile", profileRoutes);


  app.use("/$", (req, res) => {
    let username;
    if (!req.session.AuthCookie){
      username = false;
    } else {
      username = req.session.AuthCookie.username;
    }
    res.render('partials/landing', {data: {title: "Odjöb", logged: {uname: username}}});
  });

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
