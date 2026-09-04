const express = require('express')
const router = express.Router()
const db = require('../db')
const { normalizeDishImages, normalizeImageUrl } = require('../utils/imageUrl')

router.get('/', async (req, res) => {
  try {
    const { category_id } = req.query

    let sql = 'SELECT * FROM dish WHERE status = 1'
    const params = []

    if (category_id) {
      sql += ' AND category_id = ?'
      params.push(category_id)
    }

    sql += ' ORDER BY id DESC'

    const [rows] = await db.query(sql, params)

    res.json({
      code: 200,
      message: '获取菜品成功',
      data: normalizeDishImages(rows, req)
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '获取菜品失败',
      error: err.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [rows] = await db.query(
      'SELECT * FROM dish WHERE id = ?',
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        code: 404,
        message: '菜品不存在'
      })
    }

    res.json({
      code: 200,
      message: '获取菜品详情成功',
      data: {
        ...rows[0],
        image: normalizeImageUrl(rows[0].image, req)
      }
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '获取菜品详情失败',
      error: err.message
    })
  }
})

module.exports = router
