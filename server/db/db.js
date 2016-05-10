var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/karabot';

var client = new pg.Client(connectionString);
client.connect();

client.query('CREATE TABLE IF NOT EXISTS channels(channel_id SERIAL PRIMARY KEY, channel_name VARCHAR(40) not null, slack_channel_id VARCHAR(40) not null)');
client.query('CREATE TABLE IF NOT EXISTS users(user_id SERIAL PRIMARY KEY, username VARCHAR(40) not null, slack_user_id VARCHAR(40) not null, firstname VARCHAR(40), lastname VARCHAR(40), email VARCHAR(40), is_bot BOOLEAN)');
client.query('CREATE TABLE IF NOT EXISTS messages(message_id SERIAL PRIMARY KEY, message_text TEXT, slack_ts VARCHAR(40), channel VARCHAR(40) not null, slack_user_id VARCHAR(40) not null, channel_id VARCHAR(40) not null)')
var query = client.query('CREATE TABLE IF NOT EXISTS channel_user(join_id SERIAL PRIMARY KEY, slack_user_id VARCHAR(40) not null, channel_id VARCHAR(40) not null)')
query.on('end', function() { client.end(); });