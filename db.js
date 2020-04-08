const { Client } = require("pg")

const db = new Client({ connectionString: process.env.DB_CONN })

db.connect().then(() => console.log("Successfully connected to DB"))

function initEmptyDb() {
  db.query(
    `CREATE TABLE POSTS (
        id SERIAL PRIMARY KEY,
        title varchar(255),
        body text
    )`
  ).finally(console.log)

  db.query(
    `INSERT INTO POSTS (title, body)
    values ('Sample post', 'This is a sample post!')`
  ).finally(console.log)
}

const run = (query) => {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => (err ? reject(err) : resolve(result)))
  })
}

module.exports = { run }
