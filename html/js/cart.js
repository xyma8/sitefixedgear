const container_products = document.getElementById("container_products");
const amount_price_element = document.getElementById("amount_price");
const count_products_element = document.getElementById("count_products");
//const cart = new Cart();
let products = cart.getProducts();
update();


function clearCart() {
    cart.clearCart();
    update();
}

function quanProduct(index, i) {
    if(i>0) cart.addQuantity(products[index]);
    if(i<0) cart.removeQuantity(products[index]);

    update();
}

function addProductToCard() {
    let count = 0;
    for (let el of products) {
        let card = createProductCard(el, count);
        container_products.appendChild(card);

        count++;
    }
}

function update() {
    products = cart.getProducts();
    container_products.innerHTML = "";
    addProductToCard();

    let count = cart.count;
    let amount = cart.amount;
    count_products_element.textContent = `В корзине ${count} ${getPadezh(count)}`
    amount_price_element.textContent = `Итого: ${amount} ₽`;

    const cartCount = document.querySelector(".cart-count");
    cartCount.textContent = cart.count;
    if(count == 0) cartEmpty();
}

function cartEmpty() {
    const contentBlock = document.getElementById("content");
    contentBlock.style.display = "none";
    const emptyCartMessage = document.getElementById("cart-empty-message");
    emptyCartMessage.style.display = "block";

}

function getPadezh(number) {
    if (number % 10 === 1 && number % 100 !== 11) {
      return "товар";
    } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return "товара";
    } else {
      return "товаров";
    }
}

// Функция для создания карточки товара
function createProductCard(productData, index) {
    const productCard = document.createElement("div");
    productCard.classList.add("product_in_cart");
  
    const productInfo = document.createElement("div");
    productInfo.classList.add("info_product");
  
    // Создаем и добавляем изображение
    const productImage = document.createElement("img");
    productImage.src = productData.product.images;
    productInfo.appendChild(productImage);
  
    // Создаем и добавляем информацию о товаре
    const productTextInfo = document.createElement("div");
    productTextInfo.classList.add("text_info_product");
  
    const productName = document.createElement("b");
    productName.textContent = productData.product.name;
    productTextInfo.appendChild(productName);
  
    const productSize = document.createElement("a");
    productSize.textContent = `Размер: ${productData.size}`;
    productTextInfo.appendChild(productSize);
  
    productInfo.appendChild(productTextInfo);
  
    // Добавляем информацию о товаре в карточку
    productCard.appendChild(productInfo);
  
    const rightPart = document.createElement("div");
    rightPart.classList.add("right_past");
  
    // Создаем и добавляем количество товара и кнопки +/-
    const quantityProduct = document.createElement("div");
    quantityProduct.classList.add("quan_product");
  
    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.onclick = function() {
      quanProduct(index, -1);
    };
  
    const quantityText = document.createElement("a");
    quantityText.textContent = `${productData.quantity} шт`;
  
    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.onclick = function() {
      quanProduct(index, 1);
    };
  
    quantityProduct.appendChild(decreaseButton);
    quantityProduct.appendChild(quantityText);
    quantityProduct.appendChild(increaseButton);
  
    rightPart.appendChild(quantityProduct);
  
    // Создаем и добавляем цену товара
    const priceProduct = document.createElement("div");
    priceProduct.classList.add("price_product");
  
    const priceStrong = document.createElement("strong");
    priceStrong.textContent = `${productData.product.price * productData.quantity} ₽`;
  
    priceProduct.appendChild(priceStrong);
  
    rightPart.appendChild(priceProduct);
  
    productCard.appendChild(rightPart);
  
    return productCard;
}

window.addEventListener('popstate', function(event) {
    location.reload();
});