var mysql = require("mysql");
//const database = require('./keys');

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
}
else {
  var connection = mysql.createConnection(database);
}
// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
console.log(database)

// Export connection for our ORM to use.
module.exports = connection;