// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const itemsTable = document.getElementById("table-body");
const searchBar = document.getElementById("search");
const searchButton = document.getElementById("search-btn");
const brand = document.getElementById("brand");

let items = [
    {
        id: 1,
        name: 'Apple',
        price: 0.99,
    },
    {
        id: 2,
        name: 'Banana',
        price: 0.99,
    },
    {
        id: 3,
        name: 'Milk',
        price: 1.50,
    },
    {
        id: 4,
        name: 'Bread',
        price: 2,
    },
    {
        id: 5,
        name: 'Egg',
        price: 0.20,
    },
    {
        id: 6,
        name: 'Ham',
        price: 5.5,
    }
    ,
    {
        id: 7,
        name: 'Mango',
        price: 7.78,
    }
];

let cart = [];

// An example function that creates HTML elements using the DOM.
function fillItemsGrid(items) {
    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');

        itemElement.innerHTML = `
            <div class="card" >
                <img src="./images/${item.id}.jpg" alt="${item.name}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title text-center">${item.name}</h5>
                    <p class="card-text text-center">${item.price}$</p>
                    <button class="add-to-cart-btn align-self-center" data-id="${item.id}">Add to cart</button>
                </div>
            </div>`;
        
        itemElement.addEventListener("click", function(){
            addToCart(item);
        });
        itemsGrid.appendChild(itemElement);
    }
}

// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
    updateCart()
  modal.classList.toggle('show-modal');
}

// Call fillItemsGrid function when page loads
fillItemsGrid(items);

// Example of DOM methods for adding event handling
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
buyButton.addEventListener("click", buyItems)

function buyItems(){
    if(cart.length == 0){
        alert("WARNING: Cart is empty!");
    }else{
        cart = []
        cartItemsList.innerHTML = ""
        itemsTable.innerHTML = ""
        cartTotal.innerHTML = getCartTotal()
        cartBadge.innerHTML = 0
        alert("Thank you for shoping with us.")
    }
}

function addToCart(item){
    cart.push(item);
    console.log(cart);
    cartBadge.innerHTML = cart.length
    cartTotal.innerHTML = getCartTotal()
}

function getCartTotal(){
    var total = 0.0
    for(const item of cart){
        total += item.price;
    }
    return total.toFixed(2);
}

function updateCart(){
    cartItemsList.innerHTML = ""
    itemsTable.innerHTML = ""
    var dic = {}
    for(var i of cart){
        if(dic[i.name]){
            dic[i.name]++;
        }else{
            dic[i.name] = 1;
        }
    }
    console.log(dic)
    dic = Object.fromEntries(
        Object.entries(dic).sort(([keyA],[keyB]) => keyA.localeCompare(keyB))
    );
    for(var key in dic){
        var item = cart.find(o => o.name == key)
        console.log(item)
        itemsTable.innerHTML += `
            <tr>
                <th class="text-center">${item.name}</th>
                <th class="text-center">${item.price}</th>
                <th class="text-center">${dic[key]}</th>
                <th>
                    <button class="add-to-cart btn btn-success" data-id="${item.id}">Add</button>
                </th>
                <th>
                    <button class="remove-from-cart-btn btn btn-danger" data-id="${item.id}">Remove</button>
                </th>
            </tr>
        `
    }

    const removeButtons = document.querySelectorAll(".remove-from-cart-btn")
    removeButtons.forEach(button => {
        button.addEventListener("click", function(){
            const itemID = button.getAttribute("data-id")
            const item = cart.find(i => i.id == itemID)
            console.log(item)
            removeFromCart(item);

            updateCart()
        })
    })

    const addButtons = document.querySelectorAll(".add-to-cart")
    addButtons.forEach(button => {
        button.addEventListener("click", function(){
            const itemID = button.getAttribute("data-id")
            const item = cart.find(i => i.id == itemID)
            addToCart(item);

            updateCart()
        })
    })
}


function removeFromCart(item){
    //cart = cart.filter(i => i.id !== item.id)
    //cart.pop(item)
    var index = cart.indexOf(item);
    cart.splice(index, 1);
    cartBadge.innerHTML = cart.length
    cartTotal.innerHTML = getCartTotal()
}


searchButton.onclick = function(){
    var query = searchBar.value;
    if(query != ""){
        itemsGrid.innerHTML = "";
        var targetItems = items.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || item.name == query);
        fillItemsGrid(targetItems)
    }
}

brand.onclick = function(){
    itemsGrid.innerHTML = "";
    fillItemsGrid(items);
}