const express = require("express")
const app = express()
const fs = require("fs")
const cors = require("cors")

app.use(express.static("./public"))
app.use(express.json())
app.use(cors())


module.exports = app