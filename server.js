const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


// Connect to MongoDB

  mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/passport-login", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Conectada base de datos en puerto 27017"))
  .catch(e => {
    throw e;
  });

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
