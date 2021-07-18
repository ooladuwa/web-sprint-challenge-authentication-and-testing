const jwt = require("jsonwebtoken")
const { SECRET }= require("../secrets/index.js")

const restricted = (req, res, next) => {
  const token = req.headers.authorization
    if(!token) {
      res.status(401).json({message: "Token required"})
    } else {
        jwt.verify(token, SECRET, (err, decoded) => {
          if(err) {
            res.status(401).json("Invalid Token")
          } else {
            req.decodedToken = decoded
            next()
          }
        })
    }
}

module.exports = {
  restricted
}