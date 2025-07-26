// Import MySQL connection.
const connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The helper function below loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
const printQuestionMarks = (num) => {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
};

// Object for all our SQL statement functions.
const orm = {
  selectAll: (table, cb) => {
    const queryString = `SELECT * FROM ${table};`;
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: (table, cols, vals, cb) => {
    let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(
      vals.length
    )})`;

    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // objColVals would be the columns and values that you want to update
  // an example of objColVals would be {name: panther, sleepy: true}
  updateOne: (table, objColVals, condition, cb) => {
    const queryString = `UPDATE ${table} SET ? WHERE ${condition}`;

    connection.query(queryString, objColVals, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  deleteOne: (table, condition, cb) => {
    const queryString = `DELETE FROM ${table} WHERE ${condition}`;

    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

// Export the orm object for the model (burger.js).
module.exports = orm;
