const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Shortner = require('./routes/shortner');
require('dotenv').config()

const app = express();
const connectionURI = process.env.MONGODB_URI

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json());
app.use("/", Shortner);

const start = async () => {
  try {
    await mongoose.connect(connectionURI)

    app.listen(PORT, () => {
      console.log('listening on port ' + PORT);
    })
  } catch (e) {
    console.log(e.message)
  }
}

start()
