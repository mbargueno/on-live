const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
var multer = require("multer");
var cors = require("cors");
const bodyParser = require("body-parser");


// Load timeline model
const Timeline = require("../../models/Timeline");

router.get("/content/timeline/user/:email", async (req, res) => {

    const email = req.params.email;
    console.log(email);
    const post = await Timeline.find({ email })
    .then((post) =>  res.json(post))
    .catch((err) => console.log(err));
})

module.exports = router;