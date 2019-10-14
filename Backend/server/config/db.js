const mongoose = require('mongoose')

// DB Option
const dbUrl = "mongodb+srv://bily:onerowifi300@cluster0-jolpp.mongodb.net/final"

const dbOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, dbOption)

module.exports = {
    mongoose: mongoose
}