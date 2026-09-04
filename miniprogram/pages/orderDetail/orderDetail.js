const { BASE_URL } = require('../../utils/config')

Page({
  data: {
    id: '',
    order: {},
    items: [],
    statusText: '',
    paying: false
  },

  onLoad(options) {
    this.setData({
      id: options.id
    })

    this.loadOrderDetail(options.id)
  },

  loadOrderDetail(id) {
    wx.request({
      url: BASE_URL + '/api/orders/' + id,
      method: 'GET',
      success: res => {
        if (res.data.code === 200) {
          const order = res.data.data.order
          const items = res.data.data.items

          this.setData({
            order,
            items,
            statusText: this.getStatusText(order.status)
          })
        } else {
          wx.showToast({
            title: res.data.message || '订单加载失败',
            icon: 'none'
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

  payOrder() {
    const order = this.data.order

    if (!order.id || this.data.paying) {
      return
    }

    wx.showModal({
      title: '微信支付',
      content: `确认支付 ￥${order.total_price}？`,
      confirmText: '立即支付',
      success: modalRes => {
        if (!modalRes.confirm) {
          return
        }

        this.setData({
          paying: true
        })

        wx.showLoading({
          title: '支付中'
        })

        wx.request({
          url: BASE_URL + '/api/orders/' + order.id + '/pay',
          method: 'POST',
          data: {
            pay_method: 'wechat'
          },
          success: res => {
            wx.hideLoading()

            this.setData({
              paying: false
            })

            if (res.data.code === 200) {
              wx.showToast({
                title: '支付成功',
                icon: 'success'
              })

              this.loadOrderDetail(order.id)
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
              paying: false
            })

            wx.showToast({
              title: '支付请求失败',
              icon: 'none'
            })
          }
        })
      }
    })
  },

  backMenu() {
    wx.navigateTo({
      url: '/pages/menu/menu'
    })
  }
})
