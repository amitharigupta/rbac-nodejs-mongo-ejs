const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
require("./config/database.config").connectDB();
const session = require("express-session");
const connectFlash = require("connect-flash");
const passport = require("passport");
const { ensureLoggedIn } = require("connect-ensure-login");
const MongoDBStore = require('connect-mongo');

const indexRouter = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// Init Session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // secure: true,
      httpOnly: true,
    },
    store: MongoDBStore.create({ mongoUrl: "mongodb+srv://root:root@cluster0.pgjx7.mongodb.net/rbac" })
  })
);

// For Passport JS Authentication
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport.auth");

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { err, title: "Error Page" });
});

module.exports = app;
