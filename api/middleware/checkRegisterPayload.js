module.exports = (req, res, next) => {
  const {username, password} = req.body
  if(!username || !password) {
    res.status(401).json("username and password required")
  } else {
    next()
  }
}