const { BASE_URL } = require('../../utils/config')

Page({
  data: {
    tableNo: '',
    orders: [],
    timer: null
  },

  onLoad() {
    const tableNo = wx.getStorageSync('tableNo') || ''

    this.setData({
      tableNo
    })

    this.loadOrders()
  },

  onShow() {
    this.loadOrders()

    const timer = setInterval(() => {
      this.loadOrders()
    }, 3000)

    this.setData({
      timer
    })
  },

  onHide() {
    this.clearTimer()
  },

  onUnload() {
    this.clearTimer()
  },

  clearTimer() {
    if (this.data.timer) {
      clearInterval(this.data.timer)

      this.setData({
        timer: null
      })
    }
  },

  loadOrders() {
    const tableNo = this.data.tableNo || wx.getStorageSync('tableNo')

    if (!tableNo) {
      wx.showToast({
        title: '请先选择桌号',
        icon: 'none'
      })
      return
    }

    wx.request({
      url: BASE_URL + '/api/orders/table/' + tableNo,
      method: 'GET',
      success: res => {
        if (res.data.code === 200) {
          const orders = res.data.data || []

          orders.forEach(item => {
            item.statusText = this.getStatusText(item.status)
          })

          this.setData({
            orders
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '订单加载失败',
          icon: 'none'
        })
      }
    })
  },

  getStatusText(status) {
    const map = {
      unpaid: '待支付',
      pending: '待接单',
      accepted: '已接单',
      cooking: '制作中',
      finished: '已完成',
      cancelled: '已取消'
    }

    return map[status] || status
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id

    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?id=' + id
    })
  }
})
