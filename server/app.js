const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())

// 开放静态资源访问
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/upload', require('./routes/upload'))
app.use('/api/categories', require('./routes/category'))
app.use('/api/dishes', require('./routes/dish'))
app.use('/api/orders', require('./routes/order'))
app.use('/api/admin', require('./routes/admin'))

app.get('/', (req, res) => {
  res.send('restaurant order server is running')
})

app.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})