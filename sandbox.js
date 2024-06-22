"use strict"

let carts = document.querySelectorAll('.add-cart');


let products = [
  {
    name: 'Donuts',
    tag: 'pinkdonuts',
    price: 60,
    incart: 0
  },
  {
    name: 'Light Bulb',
    tag: 'lightbulb',
    price: 45,
    incart: 0
  },
  {
    name: 'Tree',
    tag: 'tree',
    price: 150,
    incart: 0
  },
  {
    name: 'Theater Seat',
    tag: 'theaterseat',
    price: 190,
    incart: 0
  }
]



for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}


function cartNumbers(product) {

  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsIncart');
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {

    if (cartItems[product.tag] === undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }

    cartItems[product.tag].incart += 1;
  } else {

    product.incart = 1;
    cartItems = {
      [product.tag]: product
    }
  }

  localStorage.setItem('productsIncart', JSON.stringify(cartItems));
}


function totalCost(product) {
  let cartCost = localStorage.getItem('totalCost');

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }

}


function displayCart() {
  let cartItems = localStorage.getItem('productsIncart');
  cartItems = JSON.parse(cartItems);

  console.log(cartItems);
  let productContainer = document.querySelector('.products');

  let cartCost = localStorage.getItem('totalCost');

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        <div class"product">
          <ion-icon name="close-circle"></ion-icon>
          <img src="pix/${item.tag}.jpg">
          <span>${item.name}</span>
        </div>
        <div class"price">R${item.price}.00</div>
        <div class"quantity>
        <ion-icon name="arrow-dropleft-circle"></ion-icon>
        <span>${item.incart}</span>
        <ion-icon name="arrow-dropright-circle"></ion-icon>
        </div>
        <div class"total">
        R${item.incart * item.price}.00
        </div>
        `
    });

    productContainer.innerHTML += `
      
      <div class"basketTotalContainer">
        <h4 class"basketTotalTitle">
          Basket Total:
        </h4>
        <h4 class"basketTotal">
          R ${cartCost}.00
        </h4>
      </div>
    
    `
  }


}


onLoadCartNumbers();
displayCart();