const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Contacts = require('./../models/contacts');
const Groups = require('./../models/groups');

router.get('/contacts', (req, res) => {
  Contacts.find({}).then( contacts => {
    res.send(contacts)
  })
})

router.get('/contacts/:id/groups', (req, res) => {
  Contacts
    .find({_id: req.params.id})
    .populate('groups', 'name')
    .exec()
    .then(result => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
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
  let groupName = req.body.groupName || ''
  contact
    .save()
    .then(contactSaved => {
        Groups.findOne({name: groupName.toLowerCase()})
        .then(hasBeenFound => {
            Groups.update({_id: hasBeenFound._id}, {$push: {contacts: contactSaved._id}})
              .then(success => {
                  Contacts.update({_id: contactSaved._id}, {$push: {groups: hasBeenFound._id}})
                  .then(success => res.status(200))
              })
        })
        .catch(groupNotFound => {
          let group = new Groups({name: groupName.toLowerCase(), contacts: contactSaved._id})
            group.save()
             .then(groupSaved => {
                Contacts.findOneAndUpdate({_id: contactSaved._id}, {$push: {groups: groupSaved._id}})
                  .then(success => res.status(200))
             })
        })
        res.status(200).send({
          success: true,
          message: "contact saved",
          data : contactSaved
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })

})

router.put('/contacts/:id', (req, res) => {
  Contacts.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(result => res.status(200).send(result))
})

router.delete('/contacts/:id', (req, res) => {
  Contacts.findOneAndRemove({_id: req.params.id})
  .then(contactDeleted => {
      contactDeleted.groups.forEach(groupId => {
          Groups.update({_id: groupId}, {$pull: {contacts: contactDeleted._id}})
          .then(success => res.status(200))
      })
      res.status(200).send(contactDeleted)
  })
  .catch((err) => {
      res.status(200).send(err)
  })
})

module.exports = router
