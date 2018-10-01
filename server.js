const app = require('express')();
const contactRouter = require('./routers/contacts');
const groupRouter = require('./routers/groups');
const userRouter = require('./routers/users');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/data-contact', { useNewUrlParser: true })
mongoose.Promise = global.Promise

app.use(bodyParser.json())
// routing
app.use('/api', contactRouter)
app.use('/api', groupRouter)
app.use('/api', userRouter)

app.use((err, req, res, next) => {
  res.status(422).send({error: err.message})
})

app.listen(8000, () => {
  console.log("Server is running....");
})
