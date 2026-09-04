const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'restaurant_order',
  waitForConnections: true,
  connectionLimit: 10
})

module.exports = pool