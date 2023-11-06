import { addProductCardToContainer } from './main.js';
let currentPage = 1; // Текущая страница
let _countProduct = 1; 
let _productPerPage = 1;
const pagination = document.getElementById("pagination");

function goToPage(page) {
  //if (page >= 1 && page <= Math.ceil(countProduct / productPerPage)) {
    currentPage = page;
    updatePagination(_countProduct, _productPerPage);
    updateURL(page);
  //}
}

function updateURL(page) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", page);
    const newURL = window.location.pathname + '?' + urlParams.toString();
    //const url = page === 1 ? window.location.pathname : newURL;
    //window.location.href = url;
    history.pushState({}, "", url);
}

export function updatePagination(countProduct, productPerPage) {
  console.log(countProduct);
  _countProduct = countProduct;
  _productPerPage = productPerPage;
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
  updatePagination(_countProduct, _productPerPage);
};

// Инициализация при загрузке страницы
//updatePagination();