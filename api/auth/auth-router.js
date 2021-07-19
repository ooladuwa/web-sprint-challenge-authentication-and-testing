const router = require('express').Router();
const bcrypt = require("bcryptjs");
const Users = require("./auth-model.js")
//MIDDLEWARE
const checkIfUsernameExists = require("../middleware/checkIfUsernameExists.js")
const checkLoginPayload = require("../middleware/checkLoginPayload.js")
const checkRegisterPayload = require("../middleware/checkRegisterPayload")
const tokenCreator = require("../middleware/tokenCreator")

router.post('/register', checkRegisterPayload, checkIfUsernameExists, (req, res, next) => {
  let user = req.body
  const rounds = process.env.BCRYPT_ROUNDS || 8
  const hash = bcrypt.hashSync(user.password, rounds)

  user.password = hash

  Users.add(user) 
    .then((savedUser) => {
      res.json(savedUser)
    })
    .catch(next)
  });

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */

router.post('/login', checkLoginPayload, tokenCreator, (req, res, next) => {
  Users.findBy()
    .then(() => {
      const {token, user} = req
        res.json({
          message: `welcome ${user.username}`,
          token: token
        })
    })
    .catch(next) 
});
/*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */

module.exports = router;
