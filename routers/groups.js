const express = require('express');
const router = express.Router()
const Groups = require('./../models/groups');

router.get('/groups', (req, res) => {
  Groups.find({}).then(results => res.send(results))
})

router.post('/groups', (req, res, next) => {
  Groups.create(req.body).then(result => res.send(result))
  .catch(next)
})

router.put('/groups/:id', (req, res) => {
  res.send("INI PUT")
})

router.delete('/groups/:id', (req, res) => {
  res.send("INI DELETE")
})

module.exports = router
