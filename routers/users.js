const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

router.post('/login', (req, res, next) => {
    Users.findOne({username: req.body.username}, (err, data) => {
        if(err) res.sendStatus(500)

        if(data) {
          if(data.password == req.body.password){
            jwt.sign(req.body, 'kunci', (err, token) => {
                res.json({logged: true, token: token, message: "Loggin success"})
            })
          }else{
            res.json({logged: false, field: 'password', message: "Your password is wrong"})
          }
        }else{
          res.json({logged: false, field: 'username', message: "Your username is wrong"})
        }
    })
})

module.exports = router
