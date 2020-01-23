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

const update = (changes, id) => {
  return db('schemes').update(changes).where({id}).then(_ => findById(id));
}

const remove = (id) => {
  db('schemes').where({id}).del();
  return findById(id)
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};
