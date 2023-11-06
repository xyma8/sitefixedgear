//import { Product } from './class_product.js';
//import { getProductFromJson } from './loadjson.js';
//import { countProductsJSON } from './loadjson.js';
//import { updatePagination } from './pagination.js';
const pagination = document.getElementById("pagination");
const productContainer = document.querySelector(".products");

//page('/zapchasti', function(){
 //   console.log("sdka");
  //});

//const breadcrumbList = document.querySelector('.breadcrumb');
//const newBreadcrumbItem = document.createElement('li');
//newBreadcrumbItem.className = 'breadcrumb-item active';
//newBreadcrumbItem.textContent = decodeURIComponent(hash.replace("/", ""));
//breadcrumbList.appendChild(newBreadcrumbItem);

var selectedCategory = null;
var selectedSubcat = null;
route();

//const countProduct = countProductsJSON(selectedCategory, selectedSubcat);
const productPerPage = 8;
let countProduct = countProductsJSON(selectedCategory, selectedSubcat);
let currentPage = 1; // Текущая страница
console.log(countProduct);
/*
const countProductsJSON(selectedCategory, selectedSubcat)
  .then(count => {
     // Здесь count = countProduct и будет числом
     updatePagination(count, productPerPage)
     console.log("updatepag2");
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
});
*/
//var currentPage = 1

updatePagination(countProduct, productPerPage);
//loadJSON(selectedCategory, selectedSubcat)

//const product = getProductFromJson(selectedCategory, selectedSubcat, 0);
//addProductCardToContainer(product);


/*
// Загрузка JSON-файла
function loadJSON(cat, subcat) {
fetch('./tovari2.json')
  .then(response => response.json())
  .then(data => {
    // Проверка наличия свойства "categories"
    if (data && data.categories) {
      data.categories.forEach(category => {
        //console.log(`Category: ${category.name}`);
        //var cat_name = category.name;
        category.subcategories.forEach(subcategory => {
            //console.log(`Subcategory: ${subcategory.name}`);
            //var subcat_name = subcategory.name;
            subcategory.products.forEach(product => {
                //console.log(`Product: ${product.name}, Price: ${product.price}`);
                if((!cat || cat===category.name) && (!subcat || subcat===subcategory.name)) {
                    const new_product = new Product(product.id, product.name, product.price);
                    const productCard = createProductCard(new_product);
                    productContainer.appendChild(productCard);
                }
            });
        });
      });
      new HvrSlider('.images');
    } else {
      console.error('JSON data is undefined or does not contain categories');
    }
  })
  .catch(error => {
    console.error(`Error: ${error.message}`);
  });
}
*/
function route() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category');
  const subcategory = urlParams.get('subcategory');
  console.log(category); // Выводит 'Запчасти'
  console.log(subcategory); // Выводит 'Вилки'
  selectedCategory = category;
  selectedSubcat = subcategory;
}


function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("product_card");
    
    card.dataset.id = product.id;
    
    const images = document.createElement("div");
    images.className = "images";

    for (let i = 0; i < 3; i++) {
        const img = document.createElement("img");
        img.src = product.images[i];
        images.appendChild(img);
    }

    const productName = document.createElement("p");
    productName.id = "product_name";
    productName.textContent = product.name;

    const price = document.createElement("b");
    price.id = "price_name";
    price.textContent = `${product.price} ₽`;

    card.appendChild(images);
    card.appendChild(productName);
    card.appendChild(price);

    card.addEventListener('click', function() {
        // Получаем уникальный id из data-id атрибута
        var productId = this.getAttribute('data-id');
        // Перенаправляем на product.html с передачей id в URL
        window.location.href = 'product.html?id=' + productId;
    });
    return card;
}

function addProductCardToContainer(current_page) {
  productContainer.innerHTML = "";
  for(let i = current_page * productPerPage - productPerPage; i<current_page*productPerPage; i++) {
  if(i>countProduct-1) break;
   const product = getProductFromJson(selectedCategory, selectedSubcat, i);
   if(product === undefined) break; // наверное не нужно и не работает
   const card = createProductCard(product);
   productContainer.appendChild(card);
  }
  new HvrSlider('.images'); // очень важная штука
}

/*
var productItems = document.querySelectorAll('.product_card');
productItems.forEach(function(item) {
    item.addEventListener('click', function() {
        // Получаем уникальный id из data-id атрибута
        var productId = this.getAttribute('data-id');

        // Перенаправляем на product.html с передачей id в URL
        window.location.href = 'product.html?id=' + productId;
    });
});
*/


function redirectToCategoryPage(type) {
    window.location.href = type;
}

function toggleCheckboxes(button) {
  const parent = button.parentNode;
  const checkboxes = parent.querySelector('.checkboxs');
  checkboxes.classList.toggle('show');
}

/*
async function countProductsJSON(cat, subcat) {
  try {
    const response = await fetch('./tovari2.json');
    const data = await response.json();

    let count = 0;

    if (data && data.categories) {
      data.categories.forEach(category => {
        category.subcategories.forEach(subcategory => {
          if((!cat || cat===category.name) && (!subcat || subcat===subcategory.name)) {
            count += subcategory.products.length;
          } 
        });
      });
      console.log(count);
      return count;
    } else {
      console.error('JSON data is undefined or does not contain categories');
      return 0;
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return 0;
  }
}
*/

function goToPage(page) {
  //if (page >= 1 && page <= Math.ceil(countProduct / productPerPage)) {
    currentPage = page;
    updatePagination(countProduct, productPerPage);
    updateURL(page);
  //}
}

function updateURL(page) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", page);
    const newURL = window.location.pathname + '?' + urlParams.toString();
    //const url = page === 1 ? window.location.pathname : newURL;
    const url = newURL;
    //window.location.href = url;
    history.pushState({}, "", url);
}

function updatePagination(countProduct, productPerPage) {
  pagination.innerHTML = "";
  const totalPages = Math.ceil(countProduct / productPerPage);
  if(currentPage>totalPages) {
     goToPage(totalPages);
     pagination.innerHTML = "";
  }
  //console.log(countProduct);

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      addPageNumber(i);
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        addPageNumber(i);
      }
      addEllipsis();
      addPageNumber(totalPages);
    } else if (currentPage >= totalPages - 3) {
      addPageNumber(1);
      addEllipsis();
      for (let i = totalPages - 4; i <= totalPages; i++) {
        addPageNumber(i);
      }
    } else {
      addPageNumber(1);
      addEllipsis();
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        addPageNumber(i);
      }
      addEllipsis();
      addPageNumber(totalPages);
    }
  }
  addProductCardToContainer(currentPage);
}

function addPageNumber(page) {
  const li = document.createElement("li");
  li.textContent = page;
  if (page === currentPage) {
    li.classList.add("current-page");
  }
  li.addEventListener("click", () => goToPage(page));
  pagination.appendChild(li);
}

function addEllipsis() {
  const ellipsis = document.createElement("span");
  ellipsis.textContent = "...";
  ellipsis.classList.add("ellipsis");
  pagination.appendChild(ellipsis);
}

// При загрузке страницы обновляем номер страницы и пагинацию
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const urlPage = urlParams.get("page");
  if (urlPage) {
    currentPage = parseInt(urlPage, 10);
  }
  console.log("updatepag1");
  updatePagination(countProduct, productPerPage);
};
