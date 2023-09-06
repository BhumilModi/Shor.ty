const mongoose = require('mongoose');

const shortURL = mongoose.Schema({
  key: String,
  originalURL: String,
})

module.exports = mongoose.model("ShortURL", shortURL)