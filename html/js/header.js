const cart = new Cart();
const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

const cartCount1 = document.getElementById("cart1");
const cartCount2 = document.getElementById("cart2");

cartCount1.textContent = cart.count;
cartCount2.textContent = cart.count;

burgerMenu.addEventListener('click', () => {
  mobileMenu.style.left = mobileMenu.style.left === '0px' ? '-100%' : '0';
});

function closebutton() {
    mobileMenu.style.left = '-100%';
}

function show(i) {
    const submenu = document.getElementById(i);
    if(submenu.style.display==="none")
        submenu.style.display = "block"
    else
        submenu.style.display = "none";
}

function redirectToCategoryPage(type) {
    window.location.href = type;
}
function redirectToCart() {
      window.location.href = "cart.html";
}