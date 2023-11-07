const breadcrumbList = document.querySelector('.breadcrumb');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Получите значение 'id' из параметров URL
const id = urlParams.get('id');
var product_name, product_price;

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