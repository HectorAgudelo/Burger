var mysql = require("mysql");
//const database = require('./keys');

if (process.env.JAWSDB_URL) {

    connection = mysql.createConnection(process.env.JAWSDB_URL)
  }
  else {
    var connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
      user: "hectoragudelo",
      password: "12345678",
      database: "burgers_db"
    });
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