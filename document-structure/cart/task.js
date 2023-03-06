const cart = document.querySelector(".cart__products");
const cartWrapper = document.querySelector(".cart");
const productControls = Array.from(document.querySelectorAll(".product__controls"));
const body = document.querySelector("body");

function makeTransition(productImage, coordinatesCart, isFirstAddition, cartProduct) {
     //create a copy of image to do visual transition to cart
     //let productImage = e.target.closest("div.product").querySelector(".product__image");
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

             //save HTML for cart products in localStorage
             localStorage.setItem("cartProductsHTML", cart.innerHTML);
         }
     }, 10);
}

window.onload = (e) => {
    
    let cartProductsHTML = localStorage.getItem("cartProductsHTML");
    cart.innerHTML = cartProductsHTML;
    let hasProducts = cart.querySelector(".cart__product");

    if (hasProducts) {
        
        let removeLinks = Array.from(document.querySelectorAll(".cart__product-del"));
        removeLinks.forEach((item) => {
            item.addEventListener("click", (e) => {

                item.parentElement.remove();

                //check if there are no products left - hide cart
                if (!cart.querySelectorAll(".cart__product").length) {
                    cartWrapper.classList.add("invisible");
                }
    
                //save HTML for cart products in localStorage
                localStorage.setItem("cartProductsHTML", cart.innerHTML);
            });
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
                cartProduct.classList.add("cart__product");
                cartProduct.setAttribute("data-id", e.target.closest("div.product").dataset.id);

                let cartProductImage = document.createElement("img");
                cartProductImage.classList.add("cart__product-image");
                cartProductImage.setAttribute("src", e.target.closest("div.product").querySelector(".product__image").getAttribute("src"));

                let cartProductCount = document.createElement("div");
                cartProductCount.classList.add("cart__product-count");
                cartProductCount.textContent = parseInt(e.target.parentElement.querySelector(".product__quantity-value").textContent);

                //delete button
                let cartProductDel = document.createElement("div");
                cartProductDel.classList.add("cart__product-del");
                cartProductDel.innerHTML = "&times;";
                cartProductDel.addEventListener("click", (e) => {
                    cart.removeChild(e.target.parentElement);

                    //check if there are no products left - hide cart
                    if (!cart.querySelectorAll(".cart__product").length) {
                        cartWrapper.classList.add("invisible");
                    }

                    //save HTML for cart products in localStorage
                    localStorage.setItem("cartProductsHTML", cart.innerHTML);
                });

                cartProduct.appendChild(cartProductImage);
                cartProduct.appendChild(cartProductCount);
                cartProduct.appendChild(cartProductDel);

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

