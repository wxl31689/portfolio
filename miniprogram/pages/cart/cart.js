const { BASE_URL } = require('../../utils/config')

Page({
  data: {
    cart: [],
    totalPrice: '0.00',
    remark: '',
    submitting: false
  },

  onShow() {
    this.loadCart()
  },

  loadCart() {
    const cart = wx.getStorageSync('cart') || []
    let totalPrice = 0

    cart.forEach(item => {
      totalPrice += Number(item.price) * Number(item.quantity)
    })

    this.setData({
      cart,
      totalPrice: totalPrice.toFixed(2)
    })
  },

  addCount(e) {
    const index = e.currentTarget.dataset.index
    const cart = this.data.cart

    cart[index].quantity += 1

    wx.setStorageSync('cart', cart)
    this.loadCart()
  },

  reduceCount(e) {
    const index = e.currentTarget.dataset.index
    const cart = this.data.cart

    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1
    } else {
      cart.splice(index, 1)
    }

    wx.setStorageSync('cart', cart)
    this.loadCart()
  },

  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  submitOrder() {
    const tableNo = wx.getStorageSync('tableNo')
    const peopleCount = wx.getStorageSync('peopleCount')
    const cart = this.data.cart

    if (!tableNo) {
      wx.showToast({
        title: '桌号不存在',
        icon: 'none'
      })
      return
    }

    if (cart.length === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'none'
      })
      return
    }

    if (this.data.submitting) {
      return
    }

    this.setData({
      submitting: true
    })

    wx.showLoading({
      title: '提交订单中'
    })

    wx.request({
      url: BASE_URL + '/api/orders',
      method: 'POST',
      data: {
        table_no: tableNo,
        people_count: peopleCount || 1,
        remark: this.data.remark,
        items: cart
      },
      success: res => {
        wx.hideLoading()

        if (res.data.code === 200) {
          const payAmount = this.data.totalPrice

          wx.removeStorageSync('cart')
          this.setData({
            cart: [],
            totalPrice: '0.00'
          })

          this.payOrder(res.data.data.order_id, payAmount)
        } else {
          this.setData({
            submitting: false
          })

          wx.showToast({
            title: res.data.message || '下单失败',
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        this.setData({
          submitting: false
        })

        wx.showToast({
          title: '请求失败',
          icon: 'none'
        })
      }
    })
  },

  payOrder(orderId, amount) {
    wx.showModal({
      title: '微信支付',
      content: `确认支付 ￥${amount}？`,
      confirmText: '立即支付',
      cancelText: '稍后支付',
      success: modalRes => {
        if (!modalRes.confirm) {
          this.setData({
            submitting: false
          })

          wx.navigateTo({
            url: '/pages/orderDetail/orderDetail?id=' + orderId
          })
          return
        }

        wx.showLoading({
          title: '支付中'
        })

        wx.request({
          url: BASE_URL + '/api/orders/' + orderId + '/pay',
          method: 'POST',
          data: {
            pay_method: 'wechat'
          },
          success: res => {
            wx.hideLoading()

            this.setData({
              submitting: false
            })

            if (res.data.code === 200) {
              wx.showToast({
                title: '支付成功',
                icon: 'success'
              })

              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/orderDetail/orderDetail?id=' + orderId
                })
              }, 500)
            } else {
              wx.showToast({
                title: res.data.message || '支付失败',
                icon: 'none'
              })
            }
          },
          fail: () => {
            wx.hideLoading()

            this.setData({
              submitting: false
            })

            wx.showToast({
              title: '支付请求失败',
              icon: 'none'
            })
          }
        })
      }
    })
  }
})
