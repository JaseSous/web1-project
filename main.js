// ========== BANNER SLIDER ==========
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');

// Tạo dots
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.className = 'dot';
  if (i === 0) dot.classList.add('active');
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(n) {
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  
  const offset = -slideIndex * 100;
  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
  
  dots.forEach(dot => dot.classList.remove('active'));
  dots[slideIndex].classList.add('active');
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function goToSlide(n) {
  slideIndex = n;
  showSlide(slideIndex);
}

// Auto slide
setInterval(nextSlide, 5000);



// ========== GIỎ HÀNG ==========
let cart = [];

// Thêm sản phẩm vào giỏ
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  
  updateCart();
  
  // Hiệu ứng thông báo
  const cartBtn = document.querySelector('.cart-btn');
  cartBtn.style.transform = 'scale(1.1)';
  setTimeout(() => {
    cartBtn.style.transform = 'scale(1)';
  }, 200);
}

// Cập nhật giỏ hàng
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const totalEl = document.getElementById('total');
  const cartCount = document.getElementById('cartCount');
  
  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;
  
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    count += item.qty;
    
    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          <span style="color: #d84226; font-weight: bold;">${formatPrice(item.price)}</span>
          <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
          <span style="margin: 0 8px;">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">Xóa</button>
      </div>
    `;
  });
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Giỏ hàng trống</p>';
  }
  
  totalEl.textContent = formatPrice(total);
  cartCount.textContent = count;
}

// Thay đổi số lượng
function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  updateCart();
}

// Xóa sản phẩm
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Format giá
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

// Toggle giỏ hàng
function toggleCart() {
  const popup = document.getElementById('cartPopup');
  popup.classList.toggle('active');
}

// Nút giỏ hàng
document.querySelector('.cart-btn').addEventListener('click', toggleCart);

// Nút checkout
document.querySelector('.checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Giỏ hàng của bạn đang trống!');
    return;
  }
  alert('Cảm ơn bạn đã đặt hàng! Tổng: ' + document.getElementById('total').textContent);
  cart = [];
  updateCart();
  toggleCart();
});

// ========== THÊM SẢN PHẨM VÀO GIỎ ==========
// Lắng nghe click vào tên hoặc hình sản phẩm
document.addEventListener('DOMContentLoaded', () => {
  const productItems = document.querySelectorAll('.product-item');
  
  productItems.forEach(item => {
    const name = item.querySelector('.name').textContent;
    const priceText = item.querySelector('.price').getAttribute('data-price');
    const price = parseInt(priceText);
  });
});

// ========== TÌM KIẾM ==========
const searchInput = document.querySelector('.header-center input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    alert('Đang tìm kiếm: ' + query);
    // Thêm logic tìm kiếm thực tế ở đây
  }
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

// ========== ĐĂNG NHẬP ==========
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', () => {
  alert('Chức năng đăng nhập đang được phát triển!');
});

// ========== ĐÓNG GIỎ HÀNG KHI CLICK BÊNGOÀI ==========
document.addEventListener('click', (e) => {
  const popup = document.getElementById('cartPopup');
  const cartBtn = document.querySelector('.cart-btn');
  
  if (popup.classList.contains('active') && 
      !popup.contains(e.target) && 
      !cartBtn.contains(e.target)) {
    popup.classList.remove('active');
  }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});