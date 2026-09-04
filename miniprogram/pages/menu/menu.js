const { BASE_URL } = require('../../utils/config')

Page({
  imageCache: {},

  data: {
    categories: [],
    dishes: [],
    allDishes: [],
    allSearchDishes: [],
    currentCategoryId: '',
    cartCount: 0,
    cartTotal: '0.00',
    keyword: '',
    searchResults: [],
    showSearchPanel: false,
    carouselItems: [],
    currentQuickKey: '',
    quickTabs: [
      { key: 'hot', name: '热销推荐', icon: '🔥' },
      { key: 'roast', name: '招牌烧腊', icon: '🍖' },
      { key: 'dessert', name: '甜品点心', icon: '🧁' },
      { key: 'recommend', name: '店长推荐', icon: '⭐' }
    ]
  },

  onLoad() {
    this.loadCategories()
  },

  onShow() {
    this.refreshCartState()
  },

  loadCategories() {
    wx.request({
      url: BASE_URL + '/api/categories',
      method: 'GET',
      success: res => {
        if (res.data.code === 200) {
          const categories = (res.data.data || []).map(item => ({
            ...item,
            icon: this.getCategoryIcon(item.name)
          }))

          this.setData({ categories })
          this.loadSearchDishes()

          if (categories.length > 0) {
            const firstId = categories[0].id

            this.setData({
              currentCategoryId: firstId
            })

            this.loadDishes(firstId)
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '分类加载失败',
          icon: 'none'
        })
      }
    })
  },

  getCategoryIcon(nameInput) {
    const name = String(nameInput || '')

    if (name.indexOf('热') !== -1) return '🔥'
    if (name.indexOf('烧') !== -1 || name.indexOf('荤') !== -1) return '🍖'
    if (name.indexOf('凉') !== -1) return '🥗'
    if (name.indexOf('汤') !== -1 || name.indexOf('炖') !== -1) return '🍲'
    if (name.indexOf('主') !== -1 || name.indexOf('饭') !== -1) return '🍚'
    if (name.indexOf('饮') !== -1) return '🥤'
    if (name.indexOf('甜') !== -1 || name.indexOf('点心') !== -1) return '🧁'
    if (name.indexOf('素') !== -1) return '🥦'

    return '🍽️'
  },

  loadDishes(categoryId) {
    let url = BASE_URL + '/api/dishes'

    if (categoryId) {
      url += '?category_id=' + categoryId
    }

    wx.request({
      url,
      method: 'GET',
      success: res => {
        if (res.data.code === 200) {
          const dishes = this.prepareDishImages(res.data.data || [])

          this.setData({
            allDishes: dishes
          })

          this.filterDishesByKeyword(this.data.keyword)
          this.downloadDishImages(dishes)
        }
      },
      fail: () => {
        wx.showToast({
          title: '菜品加载失败',
          icon: 'none'
        })
      }
    })
  },

  loadSearchDishes() {
    wx.request({
      url: BASE_URL + '/api/dishes',
      method: 'GET',
      success: res => {
        if (res.data.code === 200) {
          const dishes = this.prepareDishImages(res.data.data || [])

          this.setData({
            allSearchDishes: dishes,
            carouselItems: this.buildCarouselItems(dishes)
          })

          if (this.data.keyword) {
            this.filterDishesByKeyword(this.data.keyword)
          }

          this.downloadDishImages(dishes)
        }
      }
    })
  },

  buildCarouselItems(dishes) {
    const targets = [
      { keyword: '金牌烧鹅', title: '金牌烧鹅', desc: '皮脆肉嫩，粤式经典烧味' },
      { keyword: '蜜汁叉烧', title: '蜜汁叉烧', desc: '肥瘦适中，甜香入味' },
      { keyword: '白切鸡', title: '清远白切鸡', desc: '鸡肉嫩滑，原汁原味' }
    ]

    return targets
      .map(target => {
        let dish = dishes.find(item => String(item.name || '') === target.keyword)

        if (!dish) {
          dish = dishes.find(item => String(item.name || '').indexOf(target.keyword) !== -1)
        }

        if (!dish && target.keyword === '蜜汁叉烧') {
          dish = dishes.find(item => {
            const name = String(item.name || '')
            return name.indexOf('叉烧') !== -1 && name.indexOf('包') === -1
          })
        }

        if (!dish) {
          return null
        }

        return {
          ...dish,
          carouselTitle: target.title,
          carouselDesc: target.desc
        }
      })
      .filter(Boolean)
  },

  prepareDishImages(dishes) {
    const cart = wx.getStorageSync('cart') || []

    return dishes.map(item => {
      const originalImage = item.originalImage || item.image
      const cartItem = cart.find(cartDish => cartDish.id === item.id)

      return {
        ...item,
        originalImage,
        localImage: this.imageCache[originalImage] || '',
        quantity: cartItem ? cartItem.quantity : 0
      }
    })
  },

  downloadDishImages(dishes) {
    dishes.forEach(dish => {
      const imageUrl = dish.originalImage || dish.image

      if (!imageUrl || imageUrl.indexOf('http://') !== 0) {
        return
      }

      if (this.imageCache[imageUrl]) {
        this.updateDishLocalImage(dish.id, imageUrl, this.imageCache[imageUrl])
        return
      }

      wx.downloadFile({
        url: imageUrl,
        success: res => {
          if (res.statusCode === 200 && res.tempFilePath) {
            this.imageCache[imageUrl] = res.tempFilePath
            this.updateDishLocalImage(dish.id, imageUrl, res.tempFilePath)
          } else {
            console.log('图片下载状态异常:', imageUrl, res.statusCode)
          }
        },
        fail: err => {
          console.log('图片下载失败:', imageUrl, err)
        }
      })
    })
  },

  updateDishLocalImage(id, imageUrl, localImage) {
    const patchImage = item => {
      if (item.id !== id) {
        return item
      }

      return {
        ...item,
        originalImage: item.originalImage || imageUrl,
        localImage
      }
    }

    this.setData({
      allDishes: this.data.allDishes.map(patchImage),
      allSearchDishes: this.data.allSearchDishes.map(patchImage),
      carouselItems: this.data.carouselItems.map(patchImage),
      dishes: this.data.dishes.map(patchImage),
      searchResults: this.data.searchResults.map(patchImage)
    })
  },

  changeCategory(e) {
    const id = e.currentTarget.dataset.id

    this.setData({
      currentCategoryId: id,
      currentQuickKey: '',
      keyword: '',
      searchResults: [],
      showSearchPanel: false
    })

    this.loadDishes(id)
  },

  changeQuickTab(e) {
    const key = e.currentTarget.dataset.key
    const allDishes = this.data.allSearchDishes.length ? this.data.allSearchDishes : this.data.allDishes
    let result = []

    if (key === 'hot') {
      result = allDishes.filter(item => Number(item.is_hot) === 1)
    } else if (key === 'recommend') {
      result = allDishes.filter(item => Number(item.is_recommend) === 1)
    } else if (key === 'roast') {
      const category = this.data.categories.find(item => String(item.name || '').indexOf('烧') !== -1)

      if (category) {
        this.changeCategory({ currentTarget: { dataset: { id: category.id } } })
        this.setData({ currentQuickKey: key })
        return
      }

      result = allDishes.filter(item => {
        const name = String(item.name || '')
        const desc = String(item.description || '')
        return name.indexOf('烧') !== -1 || desc.indexOf('烧') !== -1
      })
    } else if (key === 'dessert') {
      const category = this.data.categories.find(item => {
        const name = String(item.name || '')
        return name.indexOf('甜') !== -1 || name.indexOf('点心') !== -1
      })

      if (category) {
        this.changeCategory({ currentTarget: { dataset: { id: category.id } } })
        this.setData({ currentQuickKey: key })
        return
      }

      result = allDishes.filter(item => {
        const name = String(item.name || '')
        const desc = String(item.description || '')
        return name.indexOf('甜') !== -1 || name.indexOf('奶') !== -1 || desc.indexOf('甜') !== -1 || desc.indexOf('点心') !== -1
      })
    }

    this.setData({
      currentQuickKey: key,
      currentCategoryId: '',
      keyword: '',
      dishes: result,
      searchResults: [],
      showSearchPanel: false
    })
  },

  onSearchInput(e) {
    const keyword = e.detail.value || ''

    this.setData({
      keyword
    })

    this.filterDishesByKeyword(keyword)
  },

  searchDish() {
    this.filterDishesByKeyword(this.data.keyword, true)
  },

  filterDishesByKeyword(keywordInput, keepPanel) {
    const keyword = String(keywordInput || '').trim().toLowerCase()
    const allDishes = this.data.allDishes
    const searchSource = this.data.allSearchDishes.length ? this.data.allSearchDishes : allDishes

    if (!keyword) {
      this.setData({
        dishes: allDishes,
        searchResults: [],
        showSearchPanel: false
      })
      return
    }

    const result = searchSource.filter(item => {
      const name = String(item.name || '').toLowerCase()
      return name.indexOf(keyword) !== -1
    })

    this.setData({
      currentQuickKey: '',
      currentCategoryId: '',
      dishes: result,
      searchResults: result,
      showSearchPanel: Boolean(keepPanel || result.length)
    })
  },

  selectSearchDish(e) {
    const dish = e.currentTarget.dataset.item

    if (!dish) {
      return
    }

    this.setData({
      keyword: dish.name,
      currentQuickKey: '',
      currentCategoryId: '',
      dishes: [dish],
      searchResults: [],
      showSearchPanel: false
    })
  },

  addToCart(e) {
    const dish = e.currentTarget.dataset.item
    let cart = wx.getStorageSync('cart') || []
    const index = cart.findIndex(item => item.id === dish.id)

    if (index >= 0) {
      cart[index].quantity += 1
    } else {
      cart.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1
      })
    }

    wx.setStorageSync('cart', cart)
    this.refreshCartState(cart)

    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    })
  },

  reduceFromCart(e) {
    const dish = e.currentTarget.dataset.item
    let cart = wx.getStorageSync('cart') || []
    const index = cart.findIndex(item => item.id === dish.id)

    if (index < 0) {
      return
    }

    cart[index].quantity -= 1

    if (cart[index].quantity <= 0) {
      cart.splice(index, 1)
    }

    wx.setStorageSync('cart', cart)
    this.refreshCartState(cart)
  },

  refreshCartState(cartInput) {
    const cart = cartInput || wx.getStorageSync('cart') || []
    const patchQuantity = item => {
      const cartItem = cart.find(cartDish => cartDish.id === item.id)

      return {
        ...item,
        quantity: cartItem ? cartItem.quantity : 0
      }
    }

    this.setData({
      allDishes: this.data.allDishes.map(patchQuantity),
      allSearchDishes: this.data.allSearchDishes.map(patchQuantity),
      dishes: this.data.dishes.map(patchQuantity),
      searchResults: this.data.searchResults.map(patchQuantity)
    })

    this.updateCartInfo(cart)
  },

  updateCartInfo(cartInput) {
    const cart = cartInput || wx.getStorageSync('cart') || []
    let count = 0
    let total = 0

    cart.forEach(item => {
      count += Number(item.quantity)
      total += Number(item.price) * Number(item.quantity)
    })

    this.setData({
      cartCount: count,
      cartTotal: total.toFixed(2)
    })
  },

  goCart() {
    wx.navigateTo({
      url: '/pages/cart/cart'
    })
  },

  goHome() {
    wx.showToast({
      title: '当前已在首页',
      icon: 'none'
    })
  },

  goMyOrders() {
    wx.navigateTo({
      url: '/pages/myorders/myorders'
    })
  },

  goProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    })
  },

  onImageLoad(e) {
    console.log('图片加载成功:', e.currentTarget.src)
  },

  onImageError(e) {
    console.log('图片加载失败:', e.detail.errMsg, 'URL:', e.currentTarget.src)
  }
})
