const Users = require("../auth/auth-model.js")

module.exports = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({
      message: "username and password required",
    });
  } else {
      Users.findBy(username)
        if(!username) {
          req.user = username
          next()
        } else {
          res.status(401).json("username taken")
        }
      }
};