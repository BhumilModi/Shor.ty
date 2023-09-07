const ShortURL = require("../models/shortURL")
const keyGenerator = require("../utils/randomKeyGenerator")

const generateURL = async (req, res) => {
  if (!req.body.originalURL) {
    return res.status(400).json({ message: "Original URL required" })
  }

  const key = await ShortURL.findOne({ originalURL: req.body.originalURL })

  if (key) {
    return res.status(200).json({ newURL: key.key })
  }

  const shortURL = new ShortURL({
    key: keyGenerator(),
    originalURL: req.body.originalURL
  })

  shortURL.save().then(() => {
    return res.status(201).json({ newURL: shortURL.key })
  }).catch(err => {
    return res.status(500).json({ message: err.message })
  })
}

const getOriginalURL = async (req, res) => {
  try {
    const originalURL = await ShortURL.findOne({ key: req.params.key })
    if (originalURL) {
      return res.status(200).json({ originalURL: originalURL.originalURL })
    } else {
      return res.status(404).json({ message: "No URL found" })
    }

  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = { generateURL, getOriginalURL }