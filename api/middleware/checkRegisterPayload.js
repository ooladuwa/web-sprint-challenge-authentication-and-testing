const db = require("../../data/dbConfig.js")

module.exports = async (req, res, next) => {
  const {username, password} = req.body
  if(!username || !password) {
    res.status(401).json("username and password required")
  } 
  const usernameExists = await db("users").where("username", username).first()
  if(!usernameExists) {
    next()
  } else {
    res.status(401).json("username taken")
  }
}