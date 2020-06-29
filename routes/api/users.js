const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
var multer = require("multer");
var cors = require("cors");
const bodyParser = require("body-parser");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

const Timeline = require("../../models/Timeline");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        role: req.body.role,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  await User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          profile_background: user.profile_background,
          profile_pic: user.profile_pic,
          role: user.role,
          password: user.password,
          ranking: user.ranking,
          styles: user.styles,
          influence: user.influence,
          description: user.description,
          ubication: user.ubication,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.get("/user/band/:email", async (req, res) => {
  const email = req.params.email;

  const band = await User.findOne({ email: email, role: "band" })
    .then((band) => res.json(band))
    .catch((err) => console.log(err));
});

router.get("/user/:email", async (req, res) => {
  const email = req.params.email;

  const user = await User.findOne({ email: email })
    .then((user) => console.log(res.json(user)))
    .catch((err) => console.log(err));
});

/*router.post("/changebanddesc", (req, res) => {
const newdesc = req.body.newdesc;
console.log(newdesc);

});*/
router.get("/content/timeline/user/:email", (req, res) => {
  const author = req.params.email;

  Timeline.find({ author: author })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

router.get("/content/timeline/all/", (req, res) => {
  Timeline.find()
  .then((post) =>res.json(post))

    .catch((err) => console.log(err));
});

router.post("/content/timeline/add", async (req, res) => {
  const newTimeline = new Timeline({
    text: req.body.text,
    author: req.body.author,
  });
  newTimeline
    .save()
    .then((newTimeline) => res.json(newTimeline))
    .catch((err) => console.log(err));
});

router.post("/uploadbckgrndimg", (req, res) => {
  //storage for uploads
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./client/public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  let upload = multer({ storage: storage }).single("file");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(req.file);
    console.log(req.body.userid);

    const id = req.body.userid;
    const filename = req.file.filename;

    User.findById(id, function (err, p) {
      if (!p) return next(new Error("Could not load Document"));
      else {
        // do your updates here
        p.profile_background = "/uploads/" + filename;

        p.save(function (err) {
          if (err) console.log("error");
          else console.log("success");
        });
      }
    });

    return res.status(200).send(req.file);
  });
});

module.exports = router;
