// ========== BANNER SLIDER ==========
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');

//  Tạo dots
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