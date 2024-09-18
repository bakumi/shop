AOS.init({
    duration: 1200, // Длительность анимации
    once: true, // Анимация выполняется только один раз при скролле
});

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productElement = document.querySelector(`[onclick="addToCart('${productId}')"]`).closest('.product-card');
    let productName = productElement.querySelector('.card-title').textContent;
    let productPrice = parseFloat(productElement.querySelector('.card-price').textContent.replace(' рублей', ''));

    let product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge(); // Обновление значка сразу после изменения
}

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.badge').forEach(badge => {
        badge.textContent = totalQuantity;
    });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.badge').forEach(badge => {
        badge.textContent = totalQuantity;
    });
}

document.addEventListener('addToCart', updateCartBadge);
document.addEventListener('DOMContentLoaded', updateCartBadge);

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

function filterProducts(category) {
    let products = document.querySelectorAll('.col-md-4');
    products.forEach(product => {
        if (category === 'Все языки') {
            product.style.display = 'block'; // Показываем все продукты
        } else if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block'; // Показываем продукт
        } else {
            product.style.display = 'none'; // Скрываем продукт
        }
    });
}

document.querySelectorAll('.category-sidebar ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем переход по ссылке
        
        const category = this.textContent.trim(); // Получаем категорию из текста ссылки
        filterProducts(category);
    });
});

// Изначально показываем все товары
filterProducts('Все языки');