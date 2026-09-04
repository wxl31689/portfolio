App({
  globalData: {
    cart: []
  },

  onLaunch() {
    this.globalData.cart = wx.getStorageSync('cart') || []
    console.log('酒店点餐小程序启动')
  }
})
