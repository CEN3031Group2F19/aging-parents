const path = require("path"),
  express = require("express"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  exampleRouter = require("../routes/examples.server.routes"),
  users = require("../routes/authentication.routes"),
  passport = require("passport"),
  notes = require('../routes/notes.routes'),
  appointments = require('../routes/appointment.routes'),
  // shifts = require('../routes/shift.routes'),
  tasks = require('../routes/task.routes'),
  timesheet = require('../routes/timesheet.routes'),
  medications = require('../routes/medication.routes'),
  LocalStrategy = require("passport-local").Strategy,
  cors = require("cors");
var Account = require("../models/account");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret" //TODO change this
};

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

  //Enable cross origin requests
  //TODO whitelist only our app
  app.use(cors());

  // enable request logging for development debugging
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(bodyParser.json());

  //user authentication middleware
  passport.use(new LocalStrategy(Account.authenticate()));

  app.use(passport.initialize());
  passport.use(
    new JwtStrategy(jwtOpts, function(jwtPayload, done) {
      Account.findById(jwtPayload, function(err, user) {
        console.log(user, err);
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );

  passport.serializeUser(Account.serializeUser());
  passport.deserializeUser(Account.deserializeUser());

  // add a router
  app.use("/api/example", exampleRouter);
  app.use("/", users);
  app.use("/", notes);
  app.use("/", appointments);
  app.use("/", medications);
  // app.use("/", shifts);
  app.use("/", tasks);
  app.use("/", timesheet);

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
      res.json({ error: err });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
  });

  return app;
};
