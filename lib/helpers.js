const jwt = require('jsonwebtoken')

const Auth = (req, res, next) => {
    let token = req.headers.authorization
    if(typeof token !== 'undefined'){
      token = token.split(' ')[1]
      jwt.verify(token, 'kunci', (err, decoded) => {
        if(err){
          res.sendStatus(403)
        }else{
            req.decoded = decoded
            next()
        }
      })
    }else{
      res.sendStatus(403)
    }
}

module.exports = Auth
