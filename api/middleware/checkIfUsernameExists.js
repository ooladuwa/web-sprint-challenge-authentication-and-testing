const db = require('../../data/dbConfig');


module.exports = async (req, res, next) => {
  const { username } = req.body;
  try {
    const [user] = await db('users').where('username', username)
    if (user) {
      req.user = user;
      next();
    } else {
      next({ message: 'invalid credentials', status: 401 });
    }
  } catch (err) {
    next(err);
  }
};
