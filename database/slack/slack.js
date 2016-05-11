var request = require('request');
// require the connected postgres client
// var client = require('');
var _ = require('lodash');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/karabot';
var client = new pg.Client(connectionString);

require('dotenv')
  .config();

var token = process.env.token;

// var userListForm = {
//   url: 'https://slack.com/api/users.list',
//   form: {
//     token: token
//   }
// };
var channelListForm = {
  url: 'https://slack.com/api/channels.list',
  form: {
    token: token
  }
};

function dbInsert(table, columns, values) {
  var valuesHolder = 'values($1, $2)';
  // values = [va1, va2, va3];
  // columns = '(col1, col2, col3)'
  // get connection string from database import
  pg.connect(connectionString, function pgConnect(err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
    }
    // can only handle 2 or 3 values
    // SQL Query > Insert Data
    // "INSERT INTO items(text, complete) values($1, $2)"
    if (values.length === 3) {
      valuesHolder = 'values ($1, $2, $3)';
    }
    var query = client.query('INSERT INTO ' + table + columns + ' ' + valuesHolder, values);
    query.on('end', function() {
      done();
      console.log(values + ' data inserted');
    });

  });
}

function slackRequest(form, cb) {
  request.post(form, function(err, response, body) {
    if (err) console.log(err);
    body = JSON.parse(body);
    cb(body);
  });
}

// get all Channel from Slack
// get all Channel from Database
// check if length is the same
// if not the same
// find the new Channel
// add new Channel to database
// add channel members relationship to database


// get all channel
slackRequest(channelListForm, function(body) {
  // check for any new channels
  var newChannels = body.channels;
  // get current database channels
  getChannels(checkNewChannel, newChannels);
});

function getChannels(cb, newChannels) {
  var channels = [];
  // Get a Postgres client from the connection pool
  // get connectionString from imported connection pg.connectionString
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if (err) {
      done();
      console.log(err);
      return res.status(500)
        .json({
          success: false,
          data: err
        });
    }

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM channels");

    // Stream results back one row at a time
    query.on('row', function(row) {
      //push data to channels
      channels.push(row.slack_channel_id);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      // callback on channels
      // checkNewChannel(channels, newChannels, cb2, cb3);
      cb(channels, newChannels);
    });
  });
}

function checkNewChannel(currentChannels, newChannels) {
  //check if old and new channel length is the same
  if (newChannels.length > currentChannels.length) {
    newChannels.forEach(function(channel) {
      // find the new channel
      if (currentChannels.indexOf(channel.id) < 0) {
        addChannel(channel);
        channelMembers(channel);
      }
    });
  }
}

function addChannel(channel) {
  var columns = '(channel_name, slack_channel_id)';
  var values = [channel.name, channel.id];
  // add Channel
  dbInsert('channels', columns, values);
}

function channelMembers(channel) {
  var membersId = channel.members;
  membersId.forEach(function(memberId) {
    var columns = '(slack_user_id, channel_id)';
    var values = [memberId, channel.id];
    // create relationship
    dbInsert('channel_user', columns, values);
  });
}
/*
function channelHistory(channelId, ts) {
  var channelMsgForm = {
    url: 'https://slack.com/api/channels.history',
    form: {
      channel: channelId,
      oldest: ts || 0, //"ts": "1462822242.000002" // unique timestamp for each message in channel
      // newer messages have higher ts value than older ones
      count: 1000
    }
  };
  slackRequest(channelMsgForm, function(body) {
    var messages = body.messages;

    messages.forEach(function(message) {
      // change relationship of message to be with slack_id because its easier
      var columns = '(message_body, ts, slack_user_id)'
      var values = [message.text, message.ts, message.user];
      // insert message text, ts, and slack_user_id to Message table
      dbInsert('Messages', columns, values);
    })
  })
}

// Query database for all channels id.
// for each channel, find oldest ts message (lowest ts)
// use it as the starting query for channelHistory
// channelHistory(id, ts)

// call get channel ********
// getChannel();

function lowestTS(channels, cb) {
  // get minimum ts of each channel
  // convert ts string to number
  var lowestTS = _.minBy(channels, function(channel) {
    //channel.ts
  });
  // call channelHistory on each of channelId and lowestTS
  channelHistory(channelId, lowestTS) l
}

// function checkNewUsers(body, oldCount, cb) {
//   var members = body.members;
//   console.log(members.length);
//   if (members.length > oldCount) {
//     members.forEach(function(member) {
//       var slackId = member.id;
//       // check using slackId if user is already in database
//       var username = member.name;
//       var firstname = member.profile.first_name;
//       var lastname = member.profile.last_name;
//       var is_bot = member.is_bot;
//       if (!is_bot) {
//         var email = member.profile.email;
//       }
//       // addUser
//       cb();
//     });
//   }

// }

// function addUser (details) {
//   // create new entry
// }


// slackRequest(userListForm, checkNewUsers);

*/