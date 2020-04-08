const express = require("express")
require("dotenv").config()
const morgan = require("morgan")

const app = express()
app.use(express.json())
app.use(morgan("dev"))

app.use("/posts", require("./routes/posts.route"))

const PORT = process.env.PORT || 5001

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`)
})
