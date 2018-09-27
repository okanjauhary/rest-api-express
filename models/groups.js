const mongoose = require('mongoose');
const Schema = mongoose.Schema

const groupsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contacts: [{
    type: Schema.Types.ObjectId,
    ref : 'contacts'
  }]
})

const Group = mongoose.model('groups', groupsSchema)

module.exports = Group;
