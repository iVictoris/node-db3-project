const dbConfig = require("../knexfile");
const knex = require("knex");

const db = knex(dbConfig.development);

const find = () => {
  return db("schemes");
};

const findById = id => {
  return db("schemes").where({ id });
};

const findSteps = id => {
  // find steps
  // belonging to a specific scheme
  // then order by step number
  return db("steps")
    .join("schemes", { "schemes.id": "steps.scheme_id" })
    .select("steps.id", "scheme_name", "step_number", "instructions")
    .where({ "schemes.id": id })
    .orderBy("steps.step_number");
};

const add = scheme => {
  return db("schemes")
    .insert(scheme)
    .then(ids => {
      return findById(ids[0]);
    });
};
module.exports = {
  find,
  findById,
  findSteps,
  add
};
