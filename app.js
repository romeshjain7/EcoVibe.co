document.addEventListener("DOMContentLoaded", function() {
    const bar = document.getElementById('bar');
    const nav = document.getElementById('nav-bar');
    const close = document.getElementById('close');
    
    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        });
    }
    
    if (close) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }

    let carts = document.querySelectorAll('.add-cart');
    let products = [
        // array of product objects
        {
            name: 'Gossip Girl Printed T-shirt',
            tag: 'pro1',
            price: 399,
            inCart: 0
        },
        {
            name: 'Khaki Oversized T-shirt',
            tag: 'pro2',
            price: 699,
            inCart: 0
        },

        {
            name: 'Multi Color T-shirt',
            tag: 'pro3',
            price: 499,
            inCart:0
        },
        {
            name: 'Plain White with red T-shirt',
            tag: 'pro4',
            price: 399,
            inCart:0
        },
        {
            name: 'Dark Shade T-shirt',
            tag: 'pro5',
            price: 399,
            inCart:0
        },
        {
            name: 'Black Oversized T-shirt',
            tag: 'pro6',
            price: 699,
            inCart:0
        },
        {
            name: 'Trendy White T-shirt',
            tag: 'pro7',
            price: 449,
            inCart:0
        },
        {
            name: 'Black with Collar T-shirt',
            tag: 'pro8',
            price: 499,
            inCart:0
        },
        {
            name: 'White Oversized T-shirt',
            tag: 'pro9',
            price: 799,
            inCart:0
        },
        
        {
            name: 'Cat Print Black T-shirt',
            tag: 'pro10',
            price: 349,
            inCart:0
        },
        {
            name: 'Yellow Lines Polo T-shirt',
            tag: 'pro11',
            price: 599,
            inCart:0
        },
        {
            name: 'Grey Oversized T-shirt',
            tag: 'pro12',
            price: 699,
            inCart:0
        },
        {
            name: 'Navy Blue Oversized T-shirt',
            tag: 'pro13',
            price: 549,
            inCart:0
        },
        {
            name: 'Trendy White T-shirt',
            tag: 'pro14',
            price: 699,
            inCart:0
        },
        {
            name: 'Red Heart T-shirt',
            tag: 'pro15',
            price: 399,
            inCart:0
        },
        {
            name: 'White Redbull T-shirt ',
            tag: 'pro16',
            price: 499,
            inCart:0
        },
    
        // add the rest of the products here
    ];

    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(products[i]);
            totalCost(products[i]);
        });
    }

    function onLoadCartNumbers() {
        let productNumbers = localStorage.getItem('cartNumbers');

        if (productNumbers) {
            document.querySelector('#lg-bag span').textContent = productNumbers;
        }
    }

    function cartNumbers(product) {
        let productNumbers = localStorage.getItem('cartNumbers');

        productNumbers = parseInt(productNumbers);
        if (productNumbers) {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('#lg-bag span').textContent = productNumbers + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            document.querySelector('#lg-bag span').textContent = 1;
        }
        setItem(product);
    }

    function setItem(product) {
        if (!product) {
            console.error("Product is undefined");
            return;
        }

        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);

        if (cartItems != null) {
            if (cartItems[product.tag] == undefined) {
                cartItems = {
                    ...cartItems,
                    [product.tag]: product
                };
            }
            cartItems[product.tag].inCart += 1;
        } else {
            product.inCart = 1;
            cartItems = {
                [product.tag]: product
            };
        }
        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    }

    function totalCost(product) {
        let cartCost = localStorage.getItem('totalCost');

        if (cartCost) {
            cartCost = parseInt(cartCost);
            if (isNaN(cartCost)) {
                cartCost = 0;
            }
        } else {
            cartCost = 0;
        }

        localStorage.setItem("totalCost", cartCost + product.price);
    }

    function displayCart() {
        let cartItems = localStorage.getItem("productsInCart");
        cartItems = JSON.parse(cartItems);

        let productContainer = document.querySelector(".products");
        let cartCost = localStorage.getItem('totalCost');
        if (cartItems && productContainer) {
            productContainer.innerHTML = '';
            Object.values(cartItems).map(item => {
                productContainer.innerHTML += `
                    <div class="product-header">
       
        <table width="100%">
            <thead>
                <tr>
                     <td><h5 class="product-remove">REMOVE</h5></td>
                    <td><h5 class="product-rate">PRODUCT</h5></td>
                    <td><h5 class="price">PRICE</h5></td>
                    <td><h5 class="quantity">QUANTITY</h5></td>
                    <td><h5 class="total">TOTAL</h5></td>
                </tr>
            </thead>

    </div>
                    <div class="product">
                       <tbody>
            <tr>
                <td><a href="#"> <i class="fa-regular fa-circle-xmark jsi"></i></a></td>
                <td> <img class="cartimg" src="./products/${item.tag}.jpg">
                        <span>${item.name}</span>                </td>
                <td><div class="price">₹${item.price}.00</div></td>
                <td><div class="quantity">   <i class="fa-regular fa-square-caret-left"></i> ${item.inCart} <i class="fa-regular fa-square-caret-right"></i> </div></td>
                <td>  <div class="total"> ₹${item.inCart * item.price}.00</div></td>
            </tr>     
                    </div>
                `;
            });
            productContainer.innerHTML+=`
            <div class="basketTotalContainer">
            <h4 class"basketTotalTitle"> Basket Total: </h4>
            <h4 class"basketTotal"> ₹${cartCost}.00</h4>
            </div>
            `
        }
    }

    onLoadCartNumbers();
    displayCart();
});

