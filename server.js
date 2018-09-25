const app = require('express')();
const routers = require('./routers');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/data-contact', { useNewUrlParser: true })
mongoose.Promise = global.Promise

app.use(bodyParser.json())

app.use('/api', routers)

app.use((err, req, res, next) => {
  res.status(422).send({error: err.message})
})

app.listen(3000, () => {
  console.log("Server is running....");
})
