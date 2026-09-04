const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM category WHERE status = 1 ORDER BY sort ASC, id ASC'
    )

    res.json({
      code: 200,
      message: '获取分类成功',
      data: rows
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '获取分类失败',
      error: err.message
    })
  }
})

module.exports = router