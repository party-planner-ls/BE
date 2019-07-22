const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
// const restricted = require('../api/middleware')

const Users = require("./auth-model");
const secrets = require("./secrets");
const checkToken = require("../api/middleware.js");

router.get("/users", checkToken, async (req, res) => {
  console.log(req.user_id);
  try {
    const user = await Users.find();
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the registered user" });
  }
});

// const checkToken = require("../api/middleware");

router.get("/register", checkToken, async (req, res) => {
  try {
    const user = await Users.find();
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the registered user" });
  }
});

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", checkToken, async (req, res) => {
  try {
    const user = await Users.find();
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "We ran into an error retrieving the registered user" });
  }
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  Users.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${
            user.email
          }!, we have been waiting for you here\'s your token...`,
          token,
          roles: token.roles
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
