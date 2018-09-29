const app = require('express')();
const contactRouter = require('./routers/contact');
const groupRouter = require('./routers/groups');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/data-contact', { useNewUrlParser: true })
mongoose.Promise = global.Promise

app.use(bodyParser.json())

app.use('/api', contactRouter)
app.use('/api', groupRouter)

app.use((err, req, res, next) => {
  res.status(422).send({error: err.message})
})

app.listen(8000, () => {
  console.log("Server is running....");
})
