var db = require('./postgres.js');
var request = require('request');

module.exports = {
  getAllChannels: function (req, res) {
    console.log(db.getTableData('channels'));
  },

  getAllUsers: function () {

  },

  getUserData: function () {

  },

  getChannelMessages: function () {

  }
}