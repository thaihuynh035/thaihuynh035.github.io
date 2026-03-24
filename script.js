(function () {
  'use strict';

  let products = [];
  let cart = JSON.parse(localStorage.getItem('caravan-cart') || '[]');
  let currentProduct = null;
  let selectedColor = 0;
  let quantity = 1;
  let lang = localStorage.getItem('caravan-lang') || 'vi';

  // ---- Translations ----

  const translations = {
    vi: {
      'nav.home': 'Trang Chủ',
      'nav.shop': 'Cửa Hàng',
      'nav.contact': 'Liên Hệ',
      'home.subtitle': 'Túi canvas thủ công lấy cảm hứng từ các kỳ quan thế giới.<br>Mang theo câu chuyện của bạn, từng chiếc túi một.',
      'home.shopNow': 'Mua Ngay',
      'home.feature1Title': 'Cảm Hứng Kỳ Quan',
      'home.feature1Desc': 'Mỗi thiết kế là một bức thư tình gửi đến các địa danh mang tính biểu tượng, được tái hiện trên canvas.',
      'home.feature2Title': 'Thủ Công Tỉ Mỉ',
      'home.feature2Desc': 'Được làm từ vải canvas bền, thân thiện với môi trường — bền bỉ theo thời gian và đáng để yêu thương.',
      'home.feature3Title': 'Đồng Hành Mỗi Ngày',
      'home.feature3Desc': 'Từ chợ phiên đến phố thị — những chiếc túi này đi khắp nơi cùng bạn.',
      'shop.title': 'Bộ Sưu Tập',
      'shop.subtitle': 'Bảy kỳ quan. Bảy chiếc túi. Chiếc nào kể câu chuyện của bạn?',
      'product.back': 'Quay Lại',
      'product.addToCart': 'Thêm Vào Giỏ',
      'cart.title': 'Giỏ Hàng',
      'cart.empty': 'Giỏ hàng của bạn đang trống.',
      'cart.continueShopping': 'Tiếp Tục Mua Sắm',
      'cart.total': 'Tổng cộng',
      'cart.checkout': 'Thanh Toán',
      'checkout.title': 'Thanh Toán',
      'checkout.name': 'Họ và tên',
      'checkout.namePh': 'Nguyễn Văn A',
      'checkout.phone': 'Số điện thoại',
      'checkout.phonePh': '0901 234 567',
      'checkout.address': 'Địa chỉ giao hàng',
      'checkout.addressPh': '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
      'checkout.note': 'Ghi chú (tùy chọn)',
      'checkout.notePh': 'Yêu cầu đặc biệt...',
      'checkout.cod': 'Thanh toán khi nhận hàng (COD)',
      'checkout.codNote': 'Thanh toán khi nhận hàng. Không cần thanh toán trực tuyến.',
      'checkout.placeOrder': 'Đặt Hàng',
      'success.title': 'Đặt Hàng Thành Công!',
      'success.message': 'Cảm ơn bạn đã mua sắm tại carávàn. Chúng tôi sẽ giao túi sớm — thanh toán bằng tiền mặt khi nhận hàng.',
      'success.backHome': 'Về Trang Chủ',
      'contact.title': 'Liên Hệ',
      'contact.subtitle': 'Bạn có câu hỏi, muốn đặt hàng riêng, hay chỉ muốn chào hỏi? Chúng tôi rất muốn nghe từ bạn.',
      'contact.location': 'TP. Hồ Chí Minh, Việt Nam',
      'contact.formName': 'Tên',
      'contact.formNamePh': 'Tên của bạn',
      'contact.formEmailPh': 'email@example.com',
      'contact.formMsg': 'Tin nhắn',
      'contact.formMsgPh': 'Hãy cho chúng tôi biết bạn đang nghĩ gì...',
      'contact.send': 'Gửi Tin Nhắn',
      'toast.addedToCart': 'Đã thêm vào giỏ!',
      'toast.messageSent': 'Đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm.',
      'checkout.summaryTotal': 'Tổng cộng',
    },
    en: {
      'nav.home': 'Home',
      'nav.shop': 'Shop',
      'nav.contact': 'Contact',
      'home.subtitle': 'Handcrafted canvas bags inspired by the wonders of the world.<br>Carry your story, one tote at a time.',
      'home.shopNow': 'Shop Now',
      'home.feature1Title': 'Wonder-Inspired',
      'home.feature1Desc': 'Each design is a love letter to an iconic landmark, reimagined on canvas.',
      'home.feature2Title': 'Handmade with Care',
      'home.feature2Desc': 'Crafted from durable, eco-friendly canvas — made to last and meant to be loved.',
      'home.feature3Title': 'Everyday Carry',
      'home.feature3Desc': 'From farmers\' markets to city commutes — these bags go everywhere you do.',
      'shop.title': 'Our Collection',
      'shop.subtitle': 'Seven wonders. Seven bags. Which one tells your story?',
      'product.back': 'Back to Shop',
      'product.addToCart': 'Add to Cart',
      'cart.title': 'Your Cart',
      'cart.empty': 'Your cart is empty.',
      'cart.continueShopping': 'Continue Shopping',
      'cart.total': 'Total',
      'cart.checkout': 'Proceed to Checkout',
      'checkout.title': 'Checkout',
      'checkout.name': 'Full Name',
      'checkout.namePh': 'Nguyen Van A',
      'checkout.phone': 'Phone Number',
      'checkout.phonePh': '0901 234 567',
      'checkout.address': 'Shipping Address',
      'checkout.addressPh': '123 Nguyen Hue, District 1, Ho Chi Minh City',
      'checkout.note': 'Note (optional)',
      'checkout.notePh': 'Any special requests...',
      'checkout.cod': 'Cash on Delivery (COD)',
      'checkout.codNote': 'Pay when your package arrives. No online payment needed.',
      'checkout.placeOrder': 'Place Order',
      'success.title': 'Order Placed!',
      'success.message': 'Thank you for shopping with carávàn. We\'ll deliver your bags soon — pay with cash when they arrive.',
      'success.backHome': 'Back to Home',
      'contact.title': 'Get in Touch',
      'contact.subtitle': 'Have a question, want a custom order, or just want to say hi? We\'d love to hear from you.',
      'contact.location': 'Ho Chi Minh City, Vietnam',
      'contact.formName': 'Name',
      'contact.formNamePh': 'Your name',
      'contact.formEmailPh': 'your@email.com',
      'contact.formMsg': 'Message',
      'contact.formMsgPh': 'Tell us what\'s on your mind...',
      'contact.send': 'Send Message',
      'toast.addedToCart': 'Added to cart!',
      'toast.messageSent': 'Message sent! We\'ll get back to you soon.',
      'checkout.summaryTotal': 'Total',
    }
  };

  function t(key) {
    return (translations[lang] && translations[lang][key]) || key;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val.includes('<br>') || val.includes('<')) {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });

    document.documentElement.lang = lang;
  }

  function setLang(newLang) {
    lang = newLang;
    localStorage.setItem('caravan-lang', lang);
    document.getElementById('langLabel').textContent = lang === 'vi' ? 'EN' : 'VI';
    applyTranslations();
    if (products.length) renderProductGrid();
    if (currentProduct) renderProductDetail();
    const activePage = document.querySelector('.page.active');
    if (activePage && activePage.id === 'page-cart') renderCart();
    if (activePage && activePage.id === 'page-checkout') renderCheckoutSummary();
  }

  // ---- Helpers ----

  function formatPrice(amount) {
    return amount.toLocaleString('vi-VN') + '₫';
  }

  function saveCart() {
    localStorage.setItem('caravan-cart', JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const el = document.getElementById('cartCount');
    el.textContent = count;
    el.classList.toggle('visible', count > 0);
  }

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function getColorName(color) {
    if (typeof color.name === 'object') return color.name[lang] || color.name.en;
    return color.name;
  }

  function getDescription(product) {
    if (typeof product.description === 'object') return product.description[lang] || product.description.en;
    return product.description;
  }

  // ---- SPA Routing ----

  function navigateTo(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageName);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageName);
    });

    document.getElementById('navLinks').classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (pageName === 'cart') renderCart();
    if (pageName === 'checkout') renderCheckoutSummary();
  }

  document.addEventListener('click', function (e) {
    const pageLink = e.target.closest('[data-page]');
    if (pageLink) {
      e.preventDefault();
      navigateTo(pageLink.dataset.page);
    }
  });

  // ---- Mobile Nav Toggle ----

  document.getElementById('navToggle').addEventListener('click', function () {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // ---- Language Toggle ----

  document.getElementById('langToggle').addEventListener('click', function () {
    setLang(lang === 'vi' ? 'en' : 'vi');
  });

  // ---- Load Products ----

  async function loadProducts() {
    try {
      const resp = await fetch('products.json');
      products = await resp.json();
      renderProductGrid();
    } catch (err) {
      document.getElementById('productGrid').innerHTML =
        '<p style="text-align:center;padding:2rem;color:#6b6b6b;">Could not load products.</p>';
    }
  }

  function renderProductGrid() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(product => {
      const colorTags = product.colors.map(c =>
        '<span>' + getColorName(c) + '</span>'
      ).join('');

      return `
        <div class="product-card" data-product-id="${product.id}">
          <div class="product-card-img">
            <img src="${product.colors[0].image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="product-card-info">
            <h3>${product.name}</h3>
            <p class="price">${formatPrice(product.price)}</p>
            <div class="product-card-colors">${colorTags}</div>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', function () {
        openProduct(this.dataset.productId);
      });
    });
  }

  // ---- Product Detail ----

  function openProduct(id) {
    currentProduct = products.find(p => p.id === id);
    if (!currentProduct) return;

    selectedColor = 0;
    quantity = 1;
    document.getElementById('qtyValue').textContent = quantity;

    renderProductDetail();
    navigateTo('product');
  }

  function renderProductDetail() {
    const p = currentProduct;
    document.getElementById('productDetailImg').src = p.colors[selectedColor].image;
    document.getElementById('productDetailImg').alt = p.name;
    document.getElementById('productDetailName').textContent = p.name;
    document.getElementById('productDetailPrice').textContent = formatPrice(p.price);
    document.getElementById('productDetailDesc').textContent = getDescription(p);

    const colorContainer = document.getElementById('colorSelector');
    colorContainer.innerHTML = p.colors.map((c, i) =>
      `<button class="color-option${i === selectedColor ? ' active' : ''}" data-color-index="${i}">${getColorName(c)}</button>`
    ).join('');

    colorContainer.querySelectorAll('.color-option').forEach(btn => {
      btn.addEventListener('click', function () {
        selectedColor = parseInt(this.dataset.colorIndex);
        renderProductDetail();
      });
    });
  }

  // ---- Quantity ----

  document.getElementById('qtyMinus').addEventListener('click', function () {
    if (quantity > 1) {
      quantity--;
      document.getElementById('qtyValue').textContent = quantity;
    }
  });

  document.getElementById('qtyPlus').addEventListener('click', function () {
    if (quantity < 20) {
      quantity++;
      document.getElementById('qtyValue').textContent = quantity;
    }
  });

  // ---- Add to Cart ----

  document.getElementById('addToCart').addEventListener('click', function () {
    if (!currentProduct) return;
    const color = currentProduct.colors[selectedColor];

    const existing = cart.find(
      item => item.id === currentProduct.id && item.colorIndex === selectedColor
    );

    if (existing) {
      existing.qty += quantity;
    } else {
      cart.push({
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        colorIndex: selectedColor,
        colorName: color.name,
        colorImage: color.image,
        qty: quantity,
      });
    }

    saveCart();
    showToast(t('toast.addedToCart'));
  });

  // ---- Render Cart ----

  function cartColorName(item) {
    if (typeof item.colorName === 'object') return item.colorName[lang] || item.colorName.en;
    return item.colorName;
  }

  function renderCart() {
    const container = document.getElementById('cartItems');
    const emptyEl = document.getElementById('cartEmpty');
    const summaryEl = document.getElementById('cartSummary');

    if (cart.length === 0) {
      container.innerHTML = '';
      emptyEl.style.display = 'block';
      summaryEl.style.display = 'none';
      return;
    }

    emptyEl.style.display = 'none';
    summaryEl.style.display = 'flex';

    container.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.colorImage}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <span class="cart-item-color">${cartColorName(item)}</span>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn cart-qty-minus" data-index="${i}">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn cart-qty-plus" data-index="${i}">+</button>
        </div>
        <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
        <button class="cart-item-remove" data-index="${i}" aria-label="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    `).join('');

    container.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = parseInt(this.dataset.index);
        if (cart[idx].qty > 1) {
          cart[idx].qty--;
          saveCart();
          renderCart();
        }
      });
    });

    container.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = parseInt(this.dataset.index);
        if (cart[idx].qty < 20) {
          cart[idx].qty++;
          saveCart();
          renderCart();
        }
      });
    });

    container.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = parseInt(this.dataset.index);
        cart.splice(idx, 1);
        saveCart();
        renderCart();
      });
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.getElementById('cartTotal').textContent = formatPrice(total);
  }

  // ---- Checkout ----

  document.getElementById('checkoutBtn').addEventListener('click', function () {
    navigateTo('checkout');
  });

  function renderCheckoutSummary() {
    const container = document.getElementById('checkoutSummary');
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const lines = cart.map(item =>
      `<div class="summary-line">
        <span>${item.name} (${cartColorName(item)}) × ${item.qty}</span>
        <span>${formatPrice(item.price * item.qty)}</span>
      </div>`
    ).join('');

    container.innerHTML = lines +
      `<div class="summary-line total">
        <span>${t('checkout.summaryTotal')}</span>
        <span>${formatPrice(total)}</span>
      </div>`;
  }

  document.getElementById('checkoutForm').addEventListener('submit', function (e) {
    e.preventDefault();
    cart = [];
    saveCart();
    navigateTo('success');
  });

  // ---- Contact Form ----

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    showToast(t('toast.messageSent'));
    this.reset();
  });

  // ---- Product Detail Image Zoom ----

  const detailImageContainer = document.querySelector('.product-detail-image');
  const detailImg = document.getElementById('productDetailImg');

  detailImageContainer.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    detailImg.style.transformOrigin = x + '% ' + y + '%';
  });

  detailImageContainer.addEventListener('mouseleave', function () {
    detailImg.style.transformOrigin = 'center center';
  });

  // ---- Init ----

  document.getElementById('langLabel').textContent = lang === 'vi' ? 'EN' : 'VI';
  applyTranslations();
  updateCartCount();
  loadProducts();
})();
