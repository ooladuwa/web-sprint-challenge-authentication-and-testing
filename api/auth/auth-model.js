const db = require("../../data/dbConfig.js")


const add = async (user) => {
  const [id] = await db('users').insert(user);
  return db('users').where({ id }).first();
};

const findBy = (filter) => {
  return db("users as u").select("u.id, u.username, u.password").where("filter", filter)
}


module.exports = {
  add, findBy
}