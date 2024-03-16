const { createPool } = require('mysql2/promise')

const db = createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'james'
})

module.exports = db