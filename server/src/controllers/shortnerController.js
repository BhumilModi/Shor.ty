const shortURL = require("../models/shortURL")
const ShortURL = require("../models/shortURL")
const keyGenerator = require("../utils/randomKeyGenerator")

const generateURL = (req, res) => {
  if (!req.body.originalURL) {
    return res.status(400).json({ message: "Original URL required" })
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
    const originalURL = await shortURL.findOne({ key: req.params.key }).then((res) => res.originalURL)

    if (originalURL) {
      return res.status(200).json({ originalURL })
    } else {
      return res.status(404)
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = { generateURL, getOriginalURL }