const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

// define routes to be exported as a method that takes app and configured passport as arguments
module.exports = (app, passport) => {
  app.get("/", (req, res) => {
    res.render("index.ejs");
  });
  app.get("/login", (req, res) => {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });
  app.post("/login", (req, res) => {});
  app.get("/signup", (req, res) => {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });
  app.post("/signup", (req, res) => {});
  app.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile.ejs", {
      user: req.user
    });
  });
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
