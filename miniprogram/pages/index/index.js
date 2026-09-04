const { BASE_URL } = require('../../utils/config')
Page({
  data: {
    tableNo: '',
    tableIndex: -1,
    tableList: [],
    tableLoading: false,
    peopleCount: '1',
    ui: {
      brandTitle: '\u9152\u697c',
      decorFlower: '\u2725',
      goldSymbol: '\u2726',
      welcomeTitle: '\u6b22\u8fce\u5149\u4e34',
      welcomeSubtitle: '\u8bf7\u786e\u8ba4\u684c\u53f7\u548c\u7528\u9910\u4eba\u6570',
      tableIcon: '\u684c',
      tableLabel: '\u684c\u53f7',
      tablePlaceholder: '\u8bf7\u9009\u62e9\u684c\u53f7',
      peopleIcon: '\u4eba',
      peopleLabel: '\u4eba\u6570',
      peoplePlaceholder: '\u8bf7\u8f93\u5165\u7528\u9910\u4eba\u6570',
      startIcon: '\u2724',
      startButton: '\u5f00\u59cb\u70b9\u9910'
    }
  },

  onLoad(options) {
    this.pendingTableNo = options.table_no || ''
    this.loadTables()
  },

  loadTables() {
    this.setData({
      tableLoading: true
    })

    wx.request({
      url: BASE_URL + '/api/admin/tables',
      method: 'GET',
      success: res => {
        if (res.data.code !== 200) {
          wx.showToast({
            title: '\u684c\u53f7\u52a0\u8f7d\u5931\u8d25',
            icon: 'none'
          })
          return
        }

        const tableList = (res.data.data || [])
          .filter(item => item.status === undefined || Number(item.status) === 1)
          .map(item => ({
            id: item.id,
            table_no: String(item.table_no || '').trim()
          }))
          .filter(item => item.table_no)

        const pendingTableNo = String(this.pendingTableNo || '').trim()
        const tableIndex = pendingTableNo
          ? tableList.findIndex(item => item.table_no === pendingTableNo)
          : -1

        this.setData({
          tableList,
          tableIndex,
          tableNo: tableIndex >= 0 ? tableList[tableIndex].table_no : ''
        })

        if (pendingTableNo && tableIndex < 0) {
          wx.showToast({
            title: '\u8be5\u684c\u53f7\u4e0d\u53ef\u7528',
            icon: 'none'
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '\u684c\u53f7\u52a0\u8f7d\u5931\u8d25',
          icon: 'none'
        })
      },
      complete: () => {
        this.setData({
          tableLoading: false
        })
      }
    })
  },

  onTableChange(e) {
    const tableIndex = Number(e.detail.value)
    const table = this.data.tableList[tableIndex]

    if (!table) {
      return
    }

    this.setData({
      tableIndex,
      tableNo: table.table_no
    })
  },

  onPeopleInput(e) {
    const raw = String(e.detail.value || '')
    let cleaned = raw.replace(/[^\d]/g, '').slice(0, 3)

    if (cleaned.length > 1) {
      cleaned = cleaned.replace(/^0+/, '') || '0'
    }

    this.setData({
      peopleCount: cleaned
    })
  },

  goMenu() {
    const tableNo = String(this.data.tableNo || '').trim()
    const peopleCount = Number.parseInt(this.data.peopleCount, 10)

    if (!tableNo) {
      wx.showToast({
        title: '\u8bf7\u9009\u62e9\u684c\u53f7',
        icon: 'none'
      })
      return
    }

    if (!Number.isInteger(peopleCount) || peopleCount <= 0) {
      wx.showToast({
        title: '\u8bf7\u8f93\u5165\u6b63\u786e\u4eba\u6570',
        icon: 'none'
      })
      return
    }

    this.setData({
      tableNo
    })

    const oldTableNo = String(wx.getStorageSync('tableNo') || '').trim()

    if (oldTableNo && oldTableNo !== tableNo) {
      wx.removeStorageSync('cart')

      const app = getApp()
      if (app && app.globalData) {
        app.globalData.cart = []
      }

      wx.showToast({
        title: '已切换桌号，购物车已清空',
        icon: 'none'
      })
    }

    wx.setStorageSync('tableNo', tableNo)
    wx.setStorageSync('peopleCount', peopleCount)

    wx.navigateTo({
      url: '/pages/menu/menu'
    })
  }
})
