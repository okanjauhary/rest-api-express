const mongoose = require('mongoose');
const Schema = mongoose.Schema

const groupsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: {
    ref : 'users',
    type: Array,
    default: [],
    required: false
  }
})

const Group = mongoose.model('groups', groupsSchema)

module.exports = Group;
