const dishes = [
  {
    id: 'duck',
    name: '明炉烧鸭',
    description: '本店招牌，外酥里嫩',
    price: 78,
    category: 'roast',
    badge: '招牌',
    image: './server/uploads/dishes/1780906779070.jpg'
  },
  {
    id: 'pork',
    name: '秘制红烧肉',
    description: '肥而不腻，入口即化',
    price: 58,
    category: 'roast',
    badge: '热销',
    image: './server/uploads/dishes/1780906714512.jpg'
  },
  {
    id: 'shrimp',
    name: '水晶虾饺',
    description: '皮薄透亮，虾肉弹牙',
    price: 24,
    category: 'dimsum',
    badge: '推荐',
    image: './server/uploads/dishes/1780892765114.jpg'
  },
  {
    id: 'tea',
    name: '杨枝甘露',
    description: '芒果清甜，椰香浓郁',
    price: 18,
    category: 'drink',
    badge: '',
    image: './server/uploads/dishes/1780892036280.webp'
  }
]

const cart = new Map()
let activeCategory = 'all'

const money = value => `¥${Number(value).toFixed(2)}`

function getCartSummary() {
  return [...cart.entries()].reduce((summary, [id, quantity]) => {
    const dish = dishes.find(item => item.id === id)
    if (!dish) return summary
    summary.count += quantity
    summary.total += dish.price * quantity
    return summary
  }, { count: 0, total: 0 })
}

function renderDishes() {
  const container = document.getElementById('demoDishes')
  if (!container) return

  const visibleDishes = activeCategory === 'all'
    ? dishes
    : dishes.filter(dish => dish.category === activeCategory)

  container.innerHTML = visibleDishes.map(dish => {
    const quantity = cart.get(dish.id) || 0
    return `
      <article class="demo-dish">
        <img src="${dish.image}" alt="${dish.name}">
        <div class="demo-dish-info">
          <div><strong>${dish.name}</strong>${dish.badge ? `<em>${dish.badge}</em>` : ''}</div>
          <small>${dish.description}</small>
          <span>${money(dish.price)}</span>
        </div>
        <div class="quantity-control">
          ${quantity ? `<button type="button" data-cart-action="remove" data-dish-id="${dish.id}" aria-label="减少${dish.name}">−</button><b>${quantity}</b>` : ''}
          <button class="add" type="button" data-cart-action="add" data-dish-id="${dish.id}" aria-label="添加${dish.name}">+</button>
        </div>
      </article>
    `
  }).join('')

  renderCart()
}

function renderCart() {
  const summary = getCartSummary()
  const cartCount = document.getElementById('cartCount')
  const cartTotal = document.getElementById('cartTotal')
  const cartItemCount = document.getElementById('cartItemCount')
  const billSubtotal = document.getElementById('billSubtotal')
  const billTotal = document.getElementById('billTotal')
  const checkoutButton = document.getElementById('checkoutButton')
  const cartLines = document.getElementById('cartLines')

  if (cartCount) cartCount.textContent = summary.count
  if (cartTotal) cartTotal.textContent = money(summary.total)
  if (cartItemCount) cartItemCount.textContent = summary.count
  if (billSubtotal) billSubtotal.textContent = money(summary.total)
  if (billTotal) billTotal.textContent = money(summary.total)
  if (checkoutButton) checkoutButton.disabled = summary.count === 0

  if (!cartLines) return

  const selected = [...cart.entries()].filter(([, quantity]) => quantity > 0)
  if (!selected.length) {
    cartLines.innerHTML = '<div class="empty-cart"><span>袋</span><strong>购物车还是空的</strong><small>返回菜单添加几道喜欢的菜吧</small></div>'
    return
  }

  cartLines.innerHTML = selected.map(([id, quantity]) => {
    const dish = dishes.find(item => item.id === id)
    return `
      <article>
        <img src="${dish.image}" alt="${dish.name}">
        <div><strong>${dish.name}</strong><small>${money(dish.price)} × ${quantity}</small></div>
        <b>${money(dish.price * quantity)}</b>
      </article>
    `
  }).join('')
}

function switchDemo(view) {
  document.querySelectorAll('[data-demo-pane]').forEach(pane => {
    pane.classList.toggle('active', pane.dataset.demoPane === view)
  })
  document.querySelectorAll('[data-demo-tab]').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.demoTab === view)
  })
}

function showToast(message) {
  const toast = document.querySelector('.toast')
  if (!toast) return
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(showToast.timer)
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200)
}

document.addEventListener('click', event => {
  const categoryButton = event.target.closest('[data-category]')
  if (categoryButton) {
    activeCategory = categoryButton.dataset.category
    document.querySelectorAll('[data-category]').forEach(button => button.classList.toggle('active', button === categoryButton))
    renderDishes()
    return
  }

  const cartButton = event.target.closest('[data-cart-action]')
  if (cartButton) {
    const id = cartButton.dataset.dishId
    const current = cart.get(id) || 0
    const next = cartButton.dataset.cartAction === 'add' ? current + 1 : Math.max(current - 1, 0)
    if (next) cart.set(id, next)
    else cart.delete(id)
    renderDishes()
    return
  }

  const demoTab = event.target.closest('[data-demo-tab]')
  if (demoTab) {
    switchDemo(demoTab.dataset.demoTab)
    return
  }

  const goButton = event.target.closest('[data-go]')
  if (goButton) {
    switchDemo(goButton.dataset.go)
    return
  }

  if (event.target.closest('#checkoutButton')) {
    if (getCartSummary().count) switchDemo('cart')
    return
  }

  if (event.target.closest('#submitOrder')) {
    if (!getCartSummary().count) {
      showToast('请先添加菜品')
      switchDemo('menu')
      return
    }
    switchDemo('order')
    showToast('订单提交成功，商家已收到提醒')
    return
  }

  const adminButton = event.target.closest('[data-admin-view]')
  if (adminButton) {
    const view = adminButton.dataset.adminView
    const titles = { dashboard: '经营总览', orders: '订单管理', dishes: '菜品管理' }
    document.querySelectorAll('[data-admin-view]').forEach(button => button.classList.toggle('active', button === adminButton))
    document.querySelectorAll('[data-admin-pane]').forEach(pane => pane.classList.toggle('active', pane.dataset.adminPane === view))
    document.getElementById('adminTitle').textContent = titles[view] || '管理中心'
    return
  }

  const menuToggle = event.target.closest('.menu-toggle')
  if (menuToggle) {
    const nav = document.querySelector('.site-nav')
    const expanded = nav.classList.toggle('open')
    menuToggle.setAttribute('aria-expanded', String(expanded))
  }
})

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.site-nav').classList.remove('open')
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false')
  })
})

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element))

cart.set('duck', 1)
cart.set('shrimp', 2)
renderDishes()
