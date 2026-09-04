const express = require('express')
const router = express.Router()
const db = require('../db')
const { normalizeDishImages } = require('../utils/imageUrl')

function escapeHtml(value) {
  return String(value === null || value === undefined ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatMoney(value) {
  return Number(value || 0).toFixed(2)
}

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        code: 400,
        message: '账号和密码不能为空'
      })
    }

    const [rows] = await db.query(
      'SELECT * FROM admin WHERE username = ? AND password = ?',
      [username, password]
    )

    if (rows.length === 0) {
      return res.status(401).json({
        code: 401,
        message: '账号或密码错误'
      })
    }

    res.json({
      code: 200,
      message: '登录成功',
      data: {
        id: rows[0].id,
        username: rows[0].username
      }
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '登录失败',
      error: err.message
    })
  }
})

router.get('/orders', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM orders ORDER BY id DESC'
    )

    res.json({
      code: 200,
      message: '获取订单成功',
      data: rows
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '获取订单失败',
      error: err.message
    })
  }
})

router.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [orders] = await db.query(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    )

    if (orders.length === 0) {
      return res.status(404).json({
        code: 404,
        message: '订单不存在'
      })
    }

    const [items] = await db.query(
      'SELECT * FROM order_item WHERE order_id = ?',
      [id]
    )

    res.json({
      code: 200,
      message: '获取订单详情成功',
      data: {
        order: orders[0],
        items
      }
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '获取订单详情失败',
      error: err.message
    })
  }
})

router.get('/orders/:id/print', async (req, res) => {
  try {
    const { id } = req.params

    const [orders] = await db.query(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    )

    if (orders.length === 0) {
      return res.status(404).send('订单不存在')
    }

    const [items] = await db.query(
      'SELECT * FROM order_item WHERE order_id = ?',
      [id]
    )

    const order = orders[0]
    const rows = items.map(item => `
      <tr>
        <td>${escapeHtml(item.dish_name)}</td>
        <td class="center">x${escapeHtml(item.quantity)}</td>
        <td class="right">￥${formatMoney(item.subtotal)}</td>
      </tr>
    `).join('')

    res.type('html').send(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>打印订单 ${escapeHtml(order.order_no)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      width: 280px;
      margin: 0 auto;
      padding: 12px;
      color: #111;
      font-family: Arial, "Microsoft YaHei", sans-serif;
      font-size: 13px;
    }
    h2 {
      margin: 0 0 8px;
      text-align: center;
      font-size: 18px;
    }
    .line {
      border-top: 1px dashed #555;
      margin: 8px 0;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin: 4px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    td {
      padding: 4px 0;
      vertical-align: top;
    }
    .center { text-align: center; width: 42px; }
    .right { text-align: right; width: 72px; }
    .total {
      text-align: right;
      font-size: 18px;
      font-weight: bold;
    }
    .remark {
      white-space: pre-wrap;
      word-break: break-all;
    }
    .actions {
      margin-top: 12px;
      text-align: center;
    }
    button {
      padding: 8px 14px;
      border: 0;
      border-radius: 4px;
      background: #d81e06;
      color: #fff;
      cursor: pointer;
    }
    @media print {
      body { width: 100%; padding: 0; }
      .actions { display: none; }
    }
  </style>
</head>
<body>
  <h2>厨房订单小票</h2>
  <div class="line"></div>
  <div class="row"><span>订单号</span><strong>${escapeHtml(order.order_no)}</strong></div>
  <div class="row"><span>桌号</span><strong>${escapeHtml(order.table_no)}</strong></div>
  <div class="row"><span>人数</span><strong>${escapeHtml(order.people_count)}</strong></div>
  <div class="row"><span>状态</span><strong>${escapeHtml(order.status)}</strong></div>
  <div class="row"><span>下单时间</span><span>${escapeHtml(order.created_at || '')}</span></div>
  <div class="line"></div>
  <table>${rows}</table>
  <div class="line"></div>
  <div class="total">合计 ￥${formatMoney(order.total_price)}</div>
  <div class="line"></div>
  <div>备注：</div>
  <div class="remark">${escapeHtml(order.remark || '无')}</div>
  <div class="actions">
    <button onclick="window.print()">打印</button>
  </div>
  <script>
    window.onload = function () {
      window.print()
    }
  </script>
</body>
</html>`)
  } catch (err) {
    res.status(500).send('打印订单失败：' + escapeHtml(err.message))
  }
})

router.put('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const allowStatus = ['unpaid', 'pending', 'accepted', 'cooking', 'finished', 'cancelled']

    if (!allowStatus.includes(status)) {
      return res.status(400).json({
        code: 400,
        message: '订单状态不正确'
      })
    }

    const [orders] = await db.query(
      'SELECT status FROM orders WHERE id = ?',
      [id]
    )

    if (orders.length === 0) {
      return res.status(404).json({
        code: 404,
        message: '订单不存在'
      })
    }

    if (orders[0].status === 'unpaid' && status !== 'cancelled') {
      return res.status(400).json({
        code: 400,
        message: '订单未支付，不能接单'
      })
    }

    await db.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, id]
    )

    res.json({
      code: 200,
      message: '订单状态修改成功'
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '修改订单状态失败',
      error: err.message
    })
  }
})

router.get('/dishes', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
        d.*,
        c.name AS category_name
      FROM dish d
      LEFT JOIN category c ON d.category_id = c.id
      ORDER BY d.id DESC`
    )

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

router.post('/dishes', async (req, res) => {
  try {
    const {
      category_id,
      name,
      price,
      image,
      description,
      is_hot,
      is_recommend,
      status
    } = req.body

    if (!category_id || !name || !price) {
      return res.status(400).json({
        code: 400,
        message: '分类、菜名、价格不能为空'
      })
    }

    const [result] = await db.query(
      `INSERT INTO dish 
      (category_id, name, price, image, description, is_hot, is_recommend, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        category_id,
        name,
        price,
        image || '',
        description || '',
        is_hot || 0,
        is_recommend || 0,
        status === undefined ? 1 : status
      ]
    )

    res.json({
      code: 200,
      message: '新增菜品成功',
      data: {
        id: result.insertId
      }
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '新增菜品失败',
      error: err.message
    })
  }
})

router.put('/dishes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const {
      category_id,
      name,
      price,
      image,
      description,
      is_hot,
      is_recommend,
      status
    } = req.body

    await db.query(
      `UPDATE dish SET 
      category_id = ?, 
      name = ?, 
      price = ?, 
      image = ?, 
      description = ?, 
      is_hot = ?, 
      is_recommend = ?, 
      status = ?
      WHERE id = ?`,
      [
        category_id,
        name,
        price,
        image || '',
        description || '',
        is_hot || 0,
        is_recommend || 0,
        status,
        id
      ]
    )

    res.json({
      code: 200,
      message: '修改菜品成功'
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '修改菜品失败',
      error: err.message
    })
  }
})

router.delete('/dishes/:id', async (req, res) => {
  try {
    const { id } = req.params

    await db.query(
      'DELETE FROM dish WHERE id = ?',
      [id]
    )

    res.json({
      code: 200,
      message: '删除菜品成功'
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '删除菜品失败',
      error: err.message
    })
  }
})

router.put('/dishes/:id/status', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    await db.query(
      'UPDATE dish SET status = ? WHERE id = ?',
      [status, id]
    )

    res.json({
      code: 200,
      message: '菜品状态修改成功'
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '菜品状态修改失败',
      error: err.message
    })
  }
})


router.get('/tables', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM table_info ORDER BY id DESC'
    )

    res.json({
      code: 200,
      message: '获取桌台成功',
      data: rows
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '获取桌台失败',
      error: err.message
    })
  }
})

router.post('/tables', async (req, res) => {
  try {
    const { table_no } = req.body

    if (!table_no) {
      return res.status(400).json({
        code: 400,
        message: '桌号不能为空'
      })
    }

    const [result] = await db.query(
      'INSERT INTO table_info (table_no, status) VALUES (?, ?)',
      [table_no, 1]
    )

    res.json({
      code: 200,
      message: '新增桌台成功',
      data: {
        id: result.insertId
      }
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '新增桌台失败',
      error: err.message
    })
  }
})

// 修改桌台状态
router.put('/tables/:id/status', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    await db.query(
      'UPDATE table_info SET status = ? WHERE id = ?',
      [status, id]
    )

    res.json({
      code: 200,
      message: '桌台状态修改成功'
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '桌台状态修改失败',
      error: err.message
    })
  }
})

// 删除桌台
router.delete('/tables/:id', async (req, res) => {
  try {
    const { id } = req.params

    await db.query(
      'DELETE FROM table_info WHERE id = ?',
      [id]
    )

    res.json({
      code: 200,
      message: '删除桌台成功'
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '删除桌台失败',
      error: err.message
    })
  }
})

// 获取全部分类，后台用
router.get('/categories', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM category ORDER BY sort ASC, id ASC'
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

// 新增分类
router.post('/categories', async (req, res) => {
  try {
    const { name, sort, status } = req.body

    if (!name) {
      return res.status(400).json({
        code: 400,
        message: '分类名称不能为空'
      })
    }

    const [result] = await db.query(
      'INSERT INTO category (name, sort, status) VALUES (?, ?, ?)',
      [name, sort || 0, status === undefined ? 1 : status]
    )

    res.json({
      code: 200,
      message: '新增分类成功',
      data: {
        id: result.insertId
      }
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '新增分类失败',
      error: err.message
    })
  }
})

// 修改分类
router.put('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { name, sort, status } = req.body

    if (!name) {
      return res.status(400).json({
        code: 400,
        message: '分类名称不能为空'
      })
    }

    await db.query(
      'UPDATE category SET name = ?, sort = ?, status = ? WHERE id = ?',
      [name, sort || 0, status, id]
    )

    res.json({
      code: 200,
      message: '修改分类成功'
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '修改分类失败',
      error: err.message
    })
  }
})

// 修改分类状态
router.put('/categories/:id/status', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    await db.query(
      'UPDATE category SET status = ? WHERE id = ?',
      [status, id]
    )

    res.json({
      code: 200,
      message: '分类状态修改成功'
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '分类状态修改失败',
      error: err.message
    })
  }
})

// 删除分类
router.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [dishes] = await db.query(
      'SELECT COUNT(*) AS count FROM dish WHERE category_id = ?',
      [id]
    )

    if (dishes[0].count > 0) {
      return res.status(400).json({
        code: 400,
        message: '该分类下还有菜品，不能删除，请先移动或删除菜品'
      })
    }

    await db.query(
      'DELETE FROM category WHERE id = ?',
      [id]
    )

    res.json({
      code: 200,
      message: '删除分类成功'
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '删除分类失败',
      error: err.message
    })
  }
})

// 统计概览
router.get('/stats/overview', async (req, res) => {
  try {
    const [[today]] = await db.query(`
      SELECT 
        COUNT(*) AS today_order_count,
        IFNULL(SUM(total_price), 0) AS today_sales
      FROM orders
      WHERE DATE(created_at) = CURDATE()
      AND status NOT IN ('cancelled', 'unpaid')
    `)

    const [[total]] = await db.query(`
      SELECT 
        COUNT(*) AS total_order_count,
        IFNULL(SUM(total_price), 0) AS total_sales
      FROM orders
      WHERE status NOT IN ('cancelled', 'unpaid')
    `)

    const [[pending]] = await db.query(`
      SELECT COUNT(*) AS pending_count
      FROM orders
      WHERE status = 'pending'
    `)

    const [[finished]] = await db.query(`
      SELECT COUNT(*) AS finished_count
      FROM orders
      WHERE status = 'finished'
    `)

    res.json({
      code: 200,
      message: '获取统计概览成功',
      data: {
        today_order_count: today.today_order_count,
        today_sales: today.today_sales,
        total_order_count: total.total_order_count,
        total_sales: total.total_sales,
        pending_count: pending.pending_count,
        finished_count: finished.finished_count
      }
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '获取统计概览失败',
      error: err.message
    })
  }
})

// 热销菜品排行
router.get('/stats/dishes', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        dish_id,
        dish_name,
        SUM(quantity) AS total_quantity,
        SUM(subtotal) AS total_amount
      FROM order_item
      GROUP BY dish_id, dish_name
      ORDER BY total_quantity DESC
      LIMIT 10
    `)

    res.json({
      code: 200,
      message: '获取热销菜品成功',
      data: rows
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '获取热销菜品失败',
      error: err.message
    })
  }
})

// 近几天销售趋势
router.get('/stats/daily', async (req, res) => {
  try {
    const days = Number(req.query.days || 7)

    const [rows] = await db.query(`
      SELECT 
        DATE(created_at) AS date,
        COUNT(*) AS order_count,
        IFNULL(SUM(total_price), 0) AS total_sales
      FROM orders
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
      AND status NOT IN ('cancelled', 'unpaid')
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `, [days])

    res.json({
      code: 200,
      message: '获取每日销售趋势成功',
      data: rows
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '获取每日销售趋势失败',
      error: err.message
    })
  }
})

module.exports = router
