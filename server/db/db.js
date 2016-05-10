var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/karabot';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE users(user_id SERIAL PRIMARY KEY, username VARCHAR(40) not null, slack_user_id VARCHAR(40) not null, email VARCHAR(40) not null, is_bot BOOLEAN)');
query.on('end', function() { client.end(); });

// pg.connect(connectionString, function(err, client, done) {
//   // Handle connection errors
//   if(err) {
//     done();
//     console.log(err);
//     return res.status(500).json({ success: false, data: err});
//   }

//   // SQL Query > Insert Data
//   client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

//   // SQL Query > Select Data
//   var query = client.query("SELECT * FROM items ORDER BY id ASC");

//   // Stream results back one row at a time
//   query.on('row', function(row) {
//       results.push(row);
//   });

//   // After all data is returned, close connection and return results
//   query.on('end', function() {
//       done();
//       return res.json(results);
//   });


// });