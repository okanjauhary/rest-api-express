const mongoose = require('mongoose');
const Schema = mongoose.Schema

const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null,
    required: false
  },
  email: {
    type: String,
    default: null,
    required: false
  },
  address: {
    type: String,
    default: null,
    required: false
  },
  favorited: {
    type: Boolean,
    default: false,
    required: false
  },
  groups: {
    ref : 'groups',
    type: Array,
    default: [],
    required: false
  }
})

const Contact = mongoose.model('contacts', contactSchema)

module.exports = Contact;
