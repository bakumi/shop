AOS.init({
  duration: 1200,
  once: true,
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let productElement = document
    .querySelector(`[onclick="addToCart('${productId}')"]`)
    .closest(".product-card");
  let productName = productElement.querySelector(".card-title").textContent;
  let productPrice = parseFloat(
    productElement
      .querySelector(".card-price")
      .textContent.replace(" рублей", "")
  );

  let product = cart.find((item) => item.id === productId);
  if (product) {
    product.quantity++;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      quantity: 1,
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".badge").forEach((badge) => {
    badge.textContent = totalQuantity;
  });
}

document.addEventListener("DOMContentLoaded", updateCartBadge);

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  document.addEventListener("cartUpdated", () => {
    updateCartBadge();
  });
});

function filterProducts(category) {
  let products = document.querySelectorAll(".col-md-4");
  products.forEach((product) => {
    if (category === "Все языки") {
      product.style.display = "block";
    } else if (
      category === "all" ||
      product.getAttribute("data-category") === category
    ) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

document.querySelectorAll(".category-sidebar ul li a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const category = this.textContent.trim();
    filterProducts(category);
  });
});

filterProducts("Все языки");
