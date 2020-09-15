require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongooose = require("mongoose");
// const Handlebars = require("handlebars");
const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Notify = require("./models/Notify");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const { request } = require("express");
const Lang = require("./models/Lang");

const app = express();
// Passport Config
require("./config/passport")(passport);

console.log(process.env.MONGO_URL);

mongooose.connect(process.env.MONGO_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.engine(
  "handlebars",
  exphbs({
    // handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultView: "default",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);

require("./config/static")(app);

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(async (req, res, next) => {
  const count = await Notify.findOne({ _id: "5f5905fd0fcee36b84726cb1" });
  req.count = count.count;

  next();
});

app.use(async (req, res, next) => {
  const lang = await Lang.findOne({ _id: "5f5b7bc4c507990ebc0d1cf2" });
  req.lang = lang.lang;

  next();
});

app.use(require("./routes/index"));
app.use("/admin", require("./routes/brand"));
app.use("/admin", require("./routes/admin"));
app.use("/admin", require("./routes/portfolio"));
app.use("/admin", require("./routes/service"));
app.use("/admin", require("./routes/product"));
app.use("/admin", require("./routes/agcc"));
app.use("/admin", require("./routes/team"));
app.use("/admin", require("./routes/certification"));
app.use("/admin", require("./routes/slide"));
app.use("/admin", require("./routes/user"));
app.use("/admin", require("./routes/partner"));
app.use("/admin", require("./routes/contact"));
app.use("/admin", require("./routes/office"));
app.use("/admin", require("./routes/notify"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
