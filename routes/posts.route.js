const router = require("express").Router()
const db = require("../db")

router.get("/", async (req, res, next) => {
  try {
    const result = await db.run("select * from posts")
    res.send({ success: true, rows: result.rows })
  } catch (e) {
    res.status(400).send({ error: e.message, success: false })
  }
})

router.post("/add", async (req, res) => {
  try {
    const { title, body } = req.body

    await db.run(`insert into posts (title, body)
          values ('${title.replace("'", "''")}', '${body}');`)
    res.send({ success: true, message: "Successfully added post!" })
  } catch (e) {
    res.status(400).send({ error: e.message, success: false })
  }
})

router.delete("/", async (req, res) => {
  try {
    await db.run(`delete from posts`)
    res.send({ success: true, message: "Successfully deleted all posts!" })
  } catch (e) {
    res.status(400).send({ error: e.message, success: false })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await db.run(`delete from posts where id=${req.params.id}`)
    res.send({
      success: true,
      message: `Successfully deleted post with ID ${req.params.id}!`,
    })
  } catch (e) {
    res.status(400).send({ error: e.message, success: false })
  }
})

module.exports = router
