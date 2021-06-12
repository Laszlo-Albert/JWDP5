window.onload = () => {
    generateSinglePage();
}

const generateSinglePage = () => {
    fetch('http://localhost:3000/api/teddies')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        showTeddyData(data)
    })
}
 
// Retrieving the ID from the URL
let urlParams = new URLSearchParams(window.location.search);
// console.log(urlParams);

let teddyId = urlParams.get ('id'); 

// Function that’s going to display the data from the API

const showTeddyData = (bears) => {
    for (let bear of bears) {
        if (bear._id == teddyId) {
            document.querySelector('img').src = bear.imageUrl
            document.getElementById('price').textContent = "$" + bear.price
            document.getElementById('description').textContent = bear.description

            const szinek = bear.colors
            
            szinek.forEach(color => {   
                const selection = document.createElement('option')
                selection.textContent = color;
                const ddown = document.getElementById('dropdown')
                ddown.appendChild(selection)
            }); 
            
            

            // Another method to do this would be
            
            // let shoppingBasket = document.getElementById('openBasket')
            // shoppingBasket.addEventListener('click', openBasket);
    
            // function openBasket() {
            // window.location.href = "cart.html";
            // }

            

            // Event listener for the add button

            let addToBasketButton = document.getElementById('addToBasket')
            addToBasketButton.onclick = addToBasket;

            function addToBasket(){
                
                // get data from the API (the whole object that will be put into the basket)
                let singleChosenProduct = bear;
                singleChosenProduct['count'] = 0;

                // If there is nothing saved at the moment, create an empty array

                if (localStorage.getItem('selectedItem') == null){
                    localStorage.setItem('selectedItem', '[]');
                }

                cartNumbers();
                location.reload();

                // Get existing data and add new one to it

                let currentBasketContents = JSON.parse(localStorage.getItem('selectedItem'));
                currentBasketContents.push(singleChosenProduct);
                //console.log(singleChosenProduct);

                // Get the total price of the products currently in the basket

                let totalPrice = 0;
                for (let i = 0; i<currentBasketContents.length; i++){
                totalPrice += currentBasketContents[i].price;
                }

                if (singleChosenProduct._id ){
                    singleChosenProduct.count +=1;
                }

                // Save the old and new data to local storage

                localStorage.setItem('selectedItem', JSON.stringify(currentBasketContents));
                localStorage.setItem('totalPrice', JSON.stringify(totalPrice)); 
                
            }
        }      
    }
}

// Link to the main page

let link = document.getElementById('link');
console.log(link);
link.onclick = function(){
    window.location.href = 'index.html';
}


//Creating a link to the cart page

let shoppingBasket = document.getElementById('openBasket')
console.log(shoppingBasket);

shoppingBasket.onclick = function(){
window.location.href = "cart.html";
};

// Function that checks and updates the number of items in the cart

function cartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
    }
    else {
        localStorage.setItem('cartNumbers', 1);
    }    
}

let badge = document.getElementById('badge');
badge.textContent = localStorage.getItem('cartNumbers');


