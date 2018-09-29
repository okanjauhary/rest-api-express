const express = require('express');
const router = express.Router()
const Groups = require('./../models/groups');
const Contacts = require('./../models/contacts');
const mongoose = require('mongoose');

router.get('/groups', (req, res) => {
  Groups
    .find({})
    .populate('contacts', 'name')
    .then(results => res.send(results))
})

router.get('/groups/:id', (req, res) => {
  Groups
    .findOne({_id: req.params.id})
    .populate('contacts', 'name')
    .then(result => res.send(result))
    .catch(err => res.send(err))
})

router.post('/groups', (req, res, next) => {
    Groups
      .create(req.body)
      .then(result => {
          res.send(result)
      })
      .catch(next)
})

router.put('/groups/:id', (req, res) => {
  Groups
    .updateOne(
      {_id: req.params.id},
      {$push: {contacts: {$each: req.body.contacts}}}
    )
    .then(result => {
        req.body.contacts.forEach(contact_id => {
            Contacts.updateOne({_id: contact_id}, {$push: {groups: req.params.id}})
            .then(success => res.status(200))
        })
        res.send({success: true})
    })
})

router.put('/groups/:id/contact', (req, res) => {
  Groups.updateOne({_id: req.params.id}, {$pull: {contacts: req.body.contactId}})
  .then(result => {
      Contacts.updateOne({_id: req.body.contactId},{$pull: {groups: req.params.id}})
        .then(success => res.send({success: true, message: 'contact deleted'}))
  })
})

router.delete('/groups/:id', (req, res) => {
  res.send("INI DELETE")
})

module.exports = router
