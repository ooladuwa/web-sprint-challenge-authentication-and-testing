const db = require("../../data/dbConfig.js")


const add = async (user) => {
  const [id] = await db('users').insert(user);
  return db('users').where({ id }).first();
};


module.exports = {
  add,
}