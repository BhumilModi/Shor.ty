const express = require("express");
const { generateURL, getOriginalURL } = require("../controllers/shortnerController")

const router = express.Router();

router.route("/").post(generateURL);
router.route("/:key").get(getOriginalURL);

module.exports = router;