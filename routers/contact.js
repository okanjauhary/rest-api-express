const express = require('express');
const router = express.Router()
const Contacts = require('./../models/contacts');
const Groups = require('./../models/groups');

router.get('/contacts', (req, res) => {
  Contacts.find({}).then( contacts => {
    res.send(contacts)
  })
})

router.get('/contacts/:id', (req, res) =>{
  Contacts.findOne({_id: req.params.id})
         .then(contact => res.send(contact))
})

router.post('/contacts', (req, res, next) => {
  Contacts.create(req.body)
    .then(result => {
        res.send(result)
    })
    .catch(next)
})

router.put('/contacts/:id', (req, res) => {
  Contacts.findOneAndUpdate({_id: req.params.id})
    .then(result => {
        Contacts.findOne({_id: result._id}).then(contact => {
          res.send(contact)
        })
    })
})

router.delete('/contacts/:id', (req, res) => {
  Contacts.findOneAndRemove({_id: req.params.id})
          .then(result => res.send(result))
})

module.exports = router
