 class Product {
    constructor(id = "id", name = "product name", price = 1, images =
     ["bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_1.jpg",
    "bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_2.jpg",
    "bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_3.jpg"]) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.images = images || 
        ["bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_1.jpg",
        "bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_2.jpg",
        "bikes/santa_fixie/40mm/santa_fixie_matte_black_40mm_3.jpg"]
    }
}

class ProductInCart {
    constructor(product, quantity = 1, size = 0, discountPrecent = 0) {
        this.product = product;
        this.quantity = quantity;
        this.size = size;
        this.discountPrecent = discountPrecent;
    }

    getPriceWithDiscount() {
        
    }
}

class Cart {
    productsInCart = [];

    constructor() {
        if(localStorage.getItem("productsInCart") == null) {
            this.productsInCart = [];
        }
        else {
        this.productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
        }
    }

    addProduct(productInCart) {
        if(!this.isItemInCart(productInCart)) {
            this.productsInCart.push(productInCart);
            console.log("dobl");
            localStorage.setItem("productsInCart", JSON.stringify(this.productsInCart));
        }
        else {
            productInCart.quantity++;
        }
    }

    get count() {
        return this.productsInCart.length;
    }

    get amount() {
        let sum = 0;

        for (let el of this.productsInCart) {
            sum += el.product.price * el.quantity;
        }

        return sum;
    }

    isItemInCart(productInCart) {
        for (let el of this.productsInCart) {
            if(el.product.id === productInCart.product.id && el.size === productInCart.size) return true;
        }

        return false;
    }

    getProducts() {
        return this.productsInCart;
    }

    
    removeQuantity(productInCart) {
        this.productsInCart.forEach((el, index) => { 
            if(el.product.id === productInCart.product.id && el.size === productInCart.size) {
                el.quantity--;
                if(el.quantity == 0) this.productsInCart.splice(index, 1);
                localStorage.setItem("productsInCart", JSON.stringify(this.productsInCart));
                
            }
        });
    }

    addQuantity(productInCart) {
        this.productsInCart.forEach((el) => { 
            if(el.product.id === productInCart.product.id && el.size === productInCart.size) {
                el.quantity++;
                localStorage.setItem("productsInCart", JSON.stringify(this.productsInCart));
            }
        });
    }

    deleteProduct(productInCart) {
        
    }

    clearCart() {
        this.productsInCart = [];
        localStorage.clear();
        console.log("Корзина очищена");
    }
}