const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const configDB = require("./config/database");

// configure

// connect mongoose to mongodb
mongoose.connect(
  "mongodb://node-auth:node-auth67@ds117423.mlab.com:17423/node-auth"
);

// import/run passport configuration with passport as an argument.
// require("./config/passport")(passport); // pass passport for configuration

// log requests to console
app.use(morgan("dev"));
// read cookies
app.use(cookieParser());
// get info from html forms
app.use(bodyParser());
// tell express we're using ejs
app.set("view engine", "ejs");
// passport stuff
app.use(session({ secret: "bernie" }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// import/run routes with app and passport as arguments.
require("./app/routes")(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port, () => {
  console.log("The magic happens on port " + port + ".");
});
