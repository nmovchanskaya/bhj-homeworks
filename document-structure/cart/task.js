const cart = document.querySelector(".cart__products");
const cartWrapper = document.querySelector(".cart");
const productControls = Array.from(document.querySelectorAll(".product__controls"));
const body = document.querySelector("body");

class CartItem {
    constructor(id, image, qty) {
        this.id = id;
        this.image = image;
        this.qty = qty;
    }
}

function saveCart() {
    //save items, quantities from cart in localStorage
    let itemsArray = [];
    Array.from(cart.querySelectorAll(".cart__product")).forEach((item) => {
        let qty = item.querySelector(".cart__product-count").textContent.trim();
        let image = item.querySelector(".cart__product-image").getAttribute("src");;
        let cartItem = new CartItem(item.dataset.id, image, qty)
        itemsArray.push(cartItem);
    })

    localStorage.setItem("cartItems", JSON.stringify(itemsArray));
}

function makeTransition(productImage, coordinatesCart, isFirstAddition, cartProduct) {
     //create a copy of image to do visual transition to cart
     let productImageCopy = document.createElement("img");
     productImageCopy.setAttribute("src", productImage.getAttribute("src"));
     productImageCopy.classList.add("product__image");

     //get coordinates of image in list and in cart
     //if it's first time we add this product, we get coordinates in cart  as an argument
     //of the function
     let coordinatesInList = productImage.getBoundingClientRect();
     let coordinatesInCart = coordinatesCart;

     if (!coordinatesCart) {
        coordinatesInCart = cartProduct.getBoundingClientRect();
     }

     //set initial state for product image copy
     productImageCopy.style.position = "absolute";
     productImageCopy.style.left = coordinatesInList.left + "px";
     productImageCopy.style.top = coordinatesInList.top + "px";
     body.appendChild(productImageCopy);

     //calculate step of transition
     let y = coordinatesInList.top - coordinatesInCart.top;
     let x = coordinatesInCart.left - coordinatesInList.left;
     let deltaX = x / 50;
     let deltaY = y / 50;
     let i = 0;
     
     //create interval to do a transition
     let intervalIdx = setInterval(() => {
         productImageCopy.style.left = (parseInt(productImageCopy.style.left) + deltaX) + "px";
         productImageCopy.style.top = (parseInt(productImageCopy.style.top) - deltaY) + "px";
         i++;

         if (i > 49) {
             clearInterval(intervalIdx);
             body.removeChild(productImageCopy);

             if (isFirstAddition) {
                //make cart element visible
                cartProduct.classList.remove("invisible");
             }

             //save cart in localStorage
             saveCart();
         }
     }, 10);
}

window.onload = (e) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems.length) {
        cartItems.forEach(item => {

            let cartProduct = document.createElement("div");                

            cartProduct.innerHTML = 
                `<div class="cart__product" class="cart__product" data-id="${item.id}">
                    <img class="cart__product-image" src="${item.image}">
                    <div class="cart__product-count">
                        ${item.qty}
                    </div>
                    <div class="cart__product-del">
                        &times;
                    </div>
                </div>`;

            //add remove button
            cartProduct.querySelector(".cart__product-del").addEventListener("click", (e) => {

                cart.removeChild(cartProduct);

                //check if there are no products left - hide cart
                if (!cart.querySelectorAll(".cart__product").length) {
                    cartWrapper.classList.add("invisible");
                }

                //save cart in localStorage
                saveCart();
            });

            cart.appendChild(cartProduct);
        });
    }
    else {
        cartWrapper.classList.add("invisible");
    }
};

productControls.forEach((item) => {
    item.addEventListener("click", (e) => {

        //+/- controls
        if (e.target.classList.contains("product__quantity-control_dec")) {
            let qty = parseInt(e.target.parentElement.querySelector(".product__quantity-value").textContent);
            if (qty > 1) {
                e.target.parentElement.querySelector(".product__quantity-value").textContent = qty - 1;
            }
        }
        else if (e.target.classList.contains("product__quantity-control_inc")) {
            let qty = parseInt(e.target.parentElement.querySelector(".product__quantity-value").textContent);
            e.target.parentElement.querySelector(".product__quantity-value").textContent = qty + 1;
        }
        //add product control
        else if (e.target.classList.contains("product__add")) {

            //search if we have this item in the cart
            let cartProducts = Array.from(cart.querySelectorAll(".cart__product"));
            const productIdx = cartProducts.findIndex((item) => 
                item.dataset.id === e.target.closest("div.product").dataset.id
            );

            //if we found it, add qty for this item
            if (productIdx >= 0) {
                let addQty = parseInt(e.target.parentElement.querySelector(".product__quantity-value").textContent);
                let qty = parseInt(cartProducts[productIdx].querySelector(".cart__product-count").textContent);
                cartProducts[productIdx].querySelector(".cart__product-count").textContent = qty + addQty;

                let productImage = e.target.closest("div.product").querySelector(".product__image");
                makeTransition(productImage, 0, 0, cartProducts[productIdx]);

            }

            //if no - create new item in the cart
            else {
                //make cart visible
                cartWrapper.classList.remove("invisible");

                let cartProduct = document.createElement("div");                

                cartProduct.innerHTML = 
                    `<div class="cart__product" class="cart__product" data-id="${e.target.closest("div.product").dataset.id}">
                        <img class="cart__product-image" src="${e.target.closest("div.product").querySelector(".product__image").getAttribute("src")}">
                        <div class="cart__product-count">
                            ${e.target.parentElement.querySelector(".product__quantity-value").textContent}
                        </div>
                        <div class="cart__product-del">
                            &times;
                        </div>
                    </div>`;

                //add remove button
                cartProduct.querySelector(".cart__product-del").addEventListener("click", (e) => {

                    cart.removeChild(cartProduct);

                    //check if there are no products left - hide cart
                    if (!cart.querySelectorAll(".cart__product").length) {
                        cartWrapper.classList.add("invisible");
                    }

                    //save cart in localStorage
                    saveCart();
                });

                cart.appendChild(cartProduct);

                let coordinatesInCart = cartProduct.getBoundingClientRect();
                //make invisible for the time of animation
                cartProduct.classList.add("invisible");

                //create a copy of image to do visual transition to cart
                let productImage = e.target.closest("div.product").querySelector(".product__image");
                makeTransition(productImage, coordinatesInCart, 1, cartProduct);

            }

        }
    });
});

