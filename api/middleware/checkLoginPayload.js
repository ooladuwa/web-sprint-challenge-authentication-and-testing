module.exports = (req, res, next) => {
  const { username, password } = req.body;
  const valid = Boolean(username && password);

  if (valid) {
    next();
  } else {
    res.status(401).json({
      message: "username and password required",
    });
  }
};