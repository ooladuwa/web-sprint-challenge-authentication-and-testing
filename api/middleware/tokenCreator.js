const { JWT_SECRET } = require("../secrets/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

module.exports = (req, res, next) => {
  const {password} = req.body
  const user = req.user

  if(user && bcrypt.compareSync(password, user.password)) {
    const token = makeToken(user)
    req.token = token
    next()
  } else {
    res.status(401).json("invalid credentials")
  }
}

// CREATE TOKEN
const makeToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: "1h"
  }
  return jwt.sign(payload, JWT_SECRET, options)
}