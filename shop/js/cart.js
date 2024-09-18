AOS.init({
    duration: 1200,
    once: true,
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

document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Очищаем контейнер корзины

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.id = item.id;
        itemElement.innerHTML = `
            <img src="https://via.placeholder.com/100" class="cart-item-image" alt="Product Image">
            <div class="cart-item-details">
                <h5 class="cart-item-name">${item.name}</h5>
                <p class="cart-item-price">Цена: ${item.price} руб.</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity('${item.id}')">-</button>
                    <input type="text" class="item-quantity" value="${item.quantity}" id="quantity-${item.id}" readonly>
                    <button class="quantity-btn" onclick="increaseQuantity('${item.id}')">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeItem(this)">Удалить</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    updateTotal();
    updateCheckoutButton(); // Обновляем состояние кнопки оформления заказа
});

function updateTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total-amount').innerText = total + ' руб.';
    updateCheckoutButton(); // Обновляем состояние кнопки оформления заказа
}

function updateCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-btn');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        checkoutButton.disabled = true;
        checkoutButton.classList.add('disabled'); // Добавляем стиль для неактивной кнопки
    } else {
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('disabled'); // Удаляем стиль для активной кнопки
    }
}

function increaseQuantity(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById(`quantity-${id}`).value = item.quantity;
        updateTotal();
        document.dispatchEvent(new Event('cartUpdated')); // Генерация события
    }
}

function decreaseQuantity(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        document.getElementById(`quantity-${id}`).value = item.quantity;
        updateTotal();
        document.dispatchEvent(new Event('cartUpdated')); // Генерация события
    }
}

function removeItem(button) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let itemElement = button.closest('.cart-item');
    let itemId = itemElement.id;

    // Применяем анимацию
    itemElement.classList.add('fade-out');

    // Ожидаем завершения анимации, затем удаляем элемент
    setTimeout(() => {
        // Удаляем товар из массива корзины
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));

        // Удаляем элемент корзины из DOM
        itemElement.remove();
        updateTotal();
        document.dispatchEvent(new Event('cartUpdated')); // Генерация события
    }, 500); // Время должно совпадать с длительностью анимации
}


document.addEventListener('DOMContentLoaded', () => {
    // Обработчик клика по кнопке "Оформить заказ"
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        var orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
        orderModal.show();
    });

    // Обработка отправки формы
    document.getElementById('orderForm').addEventListener('submit', (e) => {
        e.preventDefault();

        // Получаем данные из формы
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        const comment = document.getElementById('comment').value;

        // Здесь вы можете добавить код для отправки данных на сервер или показать подтверждение

        // Закрыть модальное окно после отправки
        const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
        orderModal.hide();

        // Показать подтверждение заказа
        alert(`Спасибо, ${name}! Ваш заказ оформлен.\nТелефон: ${phone}\nАдрес: ${address}\nСпособ оплаты: ${paymentMethod}\nКомментарий: ${comment}`);
    });
});