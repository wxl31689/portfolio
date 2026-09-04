const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()
const uploadDir = path.join(__dirname, '..', 'uploads', 'dishes')

fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir)
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname)

    cb(
      null,
      Date.now() + ext
    )
  }
})

const upload = multer({
  storage
})

router.post(
  '/',
  upload.single('file'),
  (req, res) => {
    res.json({
      code: 200,
      msg: '上传成功',
      data: {
        url: '/uploads/dishes/' + req.file.filename
      }
    })
  }
)

module.exports = router
