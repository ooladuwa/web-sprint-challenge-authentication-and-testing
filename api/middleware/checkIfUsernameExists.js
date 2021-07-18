const db = require("../../data/dbConfig.js")

module.exports = async (req, res, next) => {
  const { username } = req.body;
  try {
    const [user] = await db('users').where('username', username)
    if (!user) {
      req.user = user;
      next();
    } else {
      res.status(401).json("invalid credentials")
    }
  } catch(err) {
    next(err)
  }
};
