const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
  const { table_no, people_count, remark, items } = req.body

  if (!table_no) {
    return res.status(400).json({
      code: 400,
      message: '桌号不能为空'
    })
  }

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      code: 400,
      message: '菜品不能为空'
    })
  }

  const conn = await db.getConnection()

  try {
    await conn.beginTransaction()

    let totalPrice = 0

    items.forEach(item => {
      totalPrice += Number(item.price) * Number(item.quantity)
    })

    const orderNo = 'ORD' + Date.now()

    const [orderResult] = await conn.query(
      `INSERT INTO orders 
      (order_no, table_no, people_count, total_price, status, remark)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        orderNo,
        table_no,
        people_count || 1,
        totalPrice,
        'unpaid',
        remark || ''
      ]
    )

    const orderId = orderResult.insertId

    for (const item of items) {
      await conn.query(
        `INSERT INTO order_item 
        (order_id, dish_id, dish_name, price, quantity, subtotal)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.id,
          item.name,
          item.price,
          item.quantity,
          Number(item.price) * Number(item.quantity)
        ]
      )
    }

    await conn.commit()

    res.json({
      code: 200,
      message: '下单成功',
      data: {
        order_id: orderId,
        order_no: orderNo
      }
    })
  } catch (err) {
    await conn.rollback()

    res.status(500).json({
      code: 500,
      message: '下单失败',
      error: err.message
    })
  } finally {
    conn.release()
  }
})

router.post('/:id/pay', async (req, res) => {
  const conn = await db.getConnection()

  try {
    const { id } = req.params
    const { pay_method } = req.body

    await conn.beginTransaction()

    const [orders] = await conn.query(
      'SELECT * FROM orders WHERE id = ?',
      [id]
    )

    if (orders.length === 0) {
      await conn.rollback()
      return res.status(404).json({
        code: 404,
        message: '订单不存在'
      })
    }

    const order = orders[0]

    if (order.status === 'cancelled') {
      await conn.rollback()
      return res.status(400).json({
        code: 400,
        message: '订单已取消，不能支付'
      })
    }

    if (order.status !== 'unpaid') {
      await conn.rollback()
      return res.json({
        code: 200,
        message: '订单已支付',
        data: {
          order_id: order.id,
          order_no: order.order_no,
          pay_method: pay_method || 'wechat',
          pay_status: 'paid',
          status: order.status
        }
      })
    }

    await conn.query(
      'UPDATE orders SET status = ? WHERE id = ?',
      ['pending', id]
    )

    const [items] = await conn.query(
      'SELECT dish_id, quantity FROM order_item WHERE order_id = ?',
      [id]
    )

    for (const item of items) {
      await conn.query(
        'UPDATE dish SET sales = sales + ? WHERE id = ?',
        [item.quantity, item.dish_id]
      )
    }

    await conn.commit()

    res.json({
      code: 200,
      message: '支付成功',
      data: {
        order_id: order.id,
        order_no: order.order_no,
        pay_method: pay_method || 'wechat',
        pay_status: 'paid',
        status: 'pending'
      }
    })
  } catch (err) {
    await conn.rollback()

    res.status(500).json({
      code: 500,
      message: '支付失败',
      error: err.message
    })
  } finally {
    conn.release()
  }
})



router.get('/table/:table_no', async (req, res) => {
  try {
    const { table_no } = req.params

    const [rows] = await db.query(
      `SELECT * FROM orders 
      WHERE table_no = ? 
      AND status NOT IN ('finished', 'cancelled')
      ORDER BY id DESC`,
      [table_no]
    )

    res.json({
      code: 200,
      message: '获取桌台订单成功',
      data: rows
    })
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: '获取桌台订单失败',
      error: err.message
    })
  }
})

router.get('/:id', async (req, res) => {
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

module.exports = router
