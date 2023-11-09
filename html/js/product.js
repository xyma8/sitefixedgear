const breadcrumbList = document.querySelector('.breadcrumb');
const selectElement = document.getElementById("selector_size");
const button = document.getElementById("toCart");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//let cart = new Cart();

//selectElement.style.display = "none";

const id = urlParams.get('id');
let product_name, product_price;

loadJSON();
breadcrumb();

// Загрузка JSON-файла
function loadJSON() {
    fetch('./tovari2.json')
      .then(response => response.json())
      .then(data => {
        if (data && data.categories) {
          data.categories.forEach(category => {
            category.subcategories.forEach(subcategory => {
                subcategory.products.forEach(product => {
                    if (product.id === id) {
                        product_name = product.name;
                        product_price = product.price;
                        if(category.name==="Велосипеды")
                            product_name = subcategory.name + " " + product_name;
                        setData();
                    }
                });
            });
          });
          
        } else {
          console.error('JSON data is undefined or does not contain categories');
        }
      })
      .catch(error => {
        console.error(`Error: ${error.message}`);
      });
 }

let product = new Product(id, product_name, product_price, [getFirtImageUrl])
let productInCart = new ProductInCart(product, 1, getSizeFromSelector());
checkStateProduct(productInCart);

 function setData() {
    const productName = document.getElementById("product_name");
    const productPrice = document.getElementById("product_price");
    productName.textContent = product_name;
    productPrice.textContent = `${product_price} ₽`;

    setNameInBreadcrumb();
 }

 function setNameInBreadcrumb() {
    const activeBreadcrumb = document.querySelector(".breadcrumb-item.active");
    const textBreadcrumb = activeBreadcrumb.querySelector("a");
    textBreadcrumb.textContent = product_name;
 }

 function addToCart() {
    product = new Product(id, product_name, product_price, [getFirtImageUrl()]) // пока будет потом надо убрать
    productInCart = new ProductInCart(product, 1, getSizeFromSelector()); // хотя не обязательно это
    cart.addProduct(productInCart);
    checkStateProduct(productInCart);
    const cartCount1 = document.getElementById("cart1");
    const cartCount2 = document.getElementById("cart2");
    cartCount1.textContent = cart.count;
    cartCount2.textContent = cart.count;
 }

 function getFirtImageUrl() {
    const sliderElement = document.querySelector('.slider');
  // Находим первый изображение внутри слайдера
    const firstImage = sliderElement.querySelector('ul.slides li:last-child img');
  // Получаем адрес (src) первого изображения
    const firstImageUrl = firstImage.getAttribute('src');

    return firstImageUrl;
 }

 function getSizeFromSelector() {
  if (selectElement.style.display === "none") {
    return 0;
  }
// Получаем индекс выбранного элемента
  const selectedIndex = selectElement.selectedIndex;
// Получаем выбранный элемент <option>
  const selectedOption = selectElement.options[selectedIndex];
// Получаем значение (атрибут "value") выбранного элемента
  const selectedValue = selectedOption.value;

  return selectedValue;
}

function redToCart() {
  window.location.href = 'cart.html';
}

function changeButtonState(i) {
  if(i==0) {
    button.classList.remove("active");
    button.onclick = function() {
      addToCart();
    };
    button.textContent = "В корзину";
  }

  if(i==1) {
    button.classList.add("active");
    button.onclick = function() {
      redToCart();
    };
    button.textContent = "Уже в корзине";
  }
}

function checkStateProduct(productInCart) {
  
  if(cart.isItemInCart(productInCart)) {
    changeButtonState(1);
    return;
  } 

  changeButtonState(0);
}

selectElement.addEventListener("change", function(event) {
  productInCart = new ProductInCart(product, 1, getSizeFromSelector());
  checkStateProduct(productInCart);
});

window.addEventListener('popstate', function(event) {
  selectElement.selectedIndex = 0;
  location.reload();
});