Page({
  data: {
    tableNo: '',
    peopleCount: 1,
    cartCount: 0,
    cartTotal: '0.00'
  },

  onShow() {
    this.loadDiningInfo()
  },

  loadDiningInfo() {
    const cart = wx.getStorageSync('cart') || []
    let cartCount = 0
    let cartTotal = 0

    cart.forEach(item => {
      cartCount += Number(item.quantity)
      cartTotal += Number(item.price) * Number(item.quantity)
    })

    this.setData({
      tableNo: wx.getStorageSync('tableNo') || '',
      peopleCount: wx.getStorageSync('peopleCount') || 1,
      cartCount,
      cartTotal: cartTotal.toFixed(2)
    })
  },

  goMyOrders() {
    wx.navigateTo({
      url: '/pages/myorders/myorders'
    })
  },

  goCart() {
    wx.navigateTo({
      url: '/pages/cart/cart'
    })
  },

  goMenu() {
    wx.navigateTo({
      url: '/pages/menu/menu'
    })
  },

  goIndex() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  clearCart() {
    wx.showModal({
      title: '\u63d0\u793a',
      content: '\u786e\u5b9a\u8981\u6e05\u7a7a\u8d2d\u7269\u8f66\u5417\uff1f',
      success: res => {
        if (res.confirm) {
          wx.removeStorageSync('cart')

          const app = getApp()
          if (app && app.globalData) {
            app.globalData.cart = []
          }

          this.loadDiningInfo()

          wx.showToast({
            title: '\u5df2\u6e05\u7a7a',
            icon: 'success'
          })
        }
      }
    })
  }
})
