// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const burger = {
  all: (cb) => {
    orm.selectAll("burgers", (err, res) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, res);
    });
  },
  // The variables cols and vals are arrays.
  create: (cols, vals, cb) => {
    orm.insertOne("burgers", cols, vals, (err, res) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, res);
    });
  },
  update: (objColVals, condition, cb) => {
    orm.updateOne("burgers", objColVals, condition, (err, res) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, res);
    });
  },
  delete: (condition, cb) => {
    orm.deleteOne("burgers", condition, (err, res) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, res);
    });
  },
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;