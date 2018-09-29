const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Contacts = require('./../models/contacts');
const Groups = require('./../models/groups');

router.get('/contacts', (req, res) => {
  Contacts
    .find({})
    .then( contacts => {
      res.send(contacts)
    })
  })

router.get('/contacts/:id', (req, res) =>{
  Contacts.findOne({_id: req.params.id})
         .then(contact => res.send(contact))
         .catch(err => {
           res.status(404).send(err)
         })
})

router.post('/contacts', (req, res, next) => {
  let contact = new Contacts({...req.body, _id: new mongoose.Types.ObjectId()})
  contact
    .save()
    .then(contactSaved => {
        res.send(contactSaved)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.put('/contacts/:id', (req, res) => {
  Contacts
    .findOneAndUpdate(
      {_id: req.params.id},
      {$set: req.body},
      {new: true},
      (err, result) => {
          if(err) return res.send(err)

          return res.send(result)
      }
    )
})

router.delete('/contacts/:id', (req, res) => {
  Contacts.findOneAndRemove({_id: req.params.id})
  .then(contactDeleted => {
    contactDeleted.groups.forEach(group_id => {
      Groups.findOneAndUpdate({_id: group_id}, {$pull: {contacts: contactDeleted._id}})
      .then(success => res.status(200))
    })
    res.send(contactDeleted)
  })
  .catch((err) => {
      res.status(500).send(err)
  })
})

module.exports = router
