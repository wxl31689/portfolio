const { BASE_URL } = require('../../utils/config')

Page({
  data: {
    id: '',
    order: {},
    items: [],
    statusText: '',
    statusDescription: '',
    progressStep: 0,
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
            statusText: this.getStatusText(order.status),
            statusDescription: this.getStatusDescription(order.status),
            progressStep: this.getProgressStep(order.status)
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

  getStatusDescription(status) {
    const map = {
      unpaid: '订单已创建，支付后商家将开始处理',
      pending: '订单已送达商家，请稍候接单',
      accepted: '商家已接单，即将开始制作',
      cooking: '后厨正在精心制作您的菜品',
      finished: '菜品已完成，祝您用餐愉快',
      cancelled: '订单已取消，如有疑问请联系服务员'
    }

    return map[status] || '订单状态已更新'
  },

  getProgressStep(status) {
    const map = {
      unpaid: 1,
      pending: 1,
      accepted: 2,
      cooking: 3,
      finished: 4,
      cancelled: -1
    }

    return map[status] === undefined ? 0 : map[status]
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
