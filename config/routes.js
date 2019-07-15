const axios = require('axios');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const { authenticate } = require('../auth/authenticate');

const Users = require("./routes-model");
const secrets = require('./secrets');


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
};

function register(req, res) {
  let users = req.body;
  const hash = bcrypt.hashSync(users.password, 10);
  users.password = hash;

  Users.add(users)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

function login(req, res) {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${
            user.username
            }!, we have been waiting for you here\'s your token...`,
          token,
          roles: token.roles
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
}


function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: "1d"
  };
  console.log('secrets.jwtSecret', secrets.jwtSecret)
  return jwt.sign(payload, secrets.jwtSecret,options)
}
