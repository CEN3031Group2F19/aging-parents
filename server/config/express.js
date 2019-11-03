const path = require("path"),
  express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  exampleRouter = require("../routes/examples.server.routes"),
  users = require("../routes/authentication.routes"),
  passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
var Account = require("../models/account");

module.exports.init = () => {
  /* 
        connect to database
        - reference README for db uri
    */
  mongoose.connect(process.env.DB_URI || require("./config").db.uri, {
    useNewUrlParser: true
  });
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  // initialize app
  const app = express();

  // enable request logging for development debugging
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(bodyParser.json());

  //user authentication middleware
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(Account.authenticate()));
  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());

  // add a router
  app.use("/api/example", exampleRouter);
  app.use("/", users);

  if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // Handle React routing, return all requests to React app
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
  }

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {}
    });
  });

  return app;
};
