// Toggle menu on click
$(document).ready(function() {
    $('.menu-icon').click(function() {
        $('nav ul').toggleClass('showing');
    });
});



// Example to animate rotation dynamically (if needed)
document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.carousel-row');
    rows.forEach(row => {
        row.style.animation = 'rotate 30s infinite linear';
    });
});

AOS.init({
    duration: 1000, // длительность анимации
    easing: 'ease-in-out', // плавность анимации
    once: true, // анимация запускается только один раз
  });

var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    spaceBetween: 30,
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: false,
    lazy: true,  // Включаем ленивую загрузку
});

document.addEventListener('DOMContentLoaded', () => {
    function updateCartBadge() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.badge').forEach(badge => {
            badge.textContent = totalQuantity;
        });
    }

    updateCartBadge(); // Изначально обновить значок при загрузке страницы

    // Обработчик события обновления корзины
    document.addEventListener('cartUpdated', () => {
        updateCartBadge();
    });
});
