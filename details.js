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

let teddyId = urlParams.get ('id'); // Optional - create a function that takes in parameters
// console.log(teddyId);


// Function that’s going to display the data from the API

const showTeddyData = (bears) => {
    for (let bear of bears) {
        if (bear._id == teddyId) {
        document.querySelector('img').src = bear.imageUrl
        document.getElementById('price').textContent = bear.price
        document.getElementById('description').textContent = bear.description
        const szinek = bear.colors
            szinek.forEach(color => {   
        const selection = document.createElement('option')
        selection.textContent = color;


        const ddown = document.getElementById('dropdown')
        ddown.appendChild(selection)
            }); 
            
            //Creating a link to the cart page

            let shoppingBasket = document.getElementById('openBasket')

            shoppingBasket.onclick = function(){
            window.location.href = "cart.html";
            };

            // Another method to do this would be
            
            // let shoppingBasket = document.getElementById('openBasket')
            // shoppingBasket.addEventListener('click', openBasket);
    
            // function openBasket() {
            // window.location.href = "cart.html";
            // }


            // Function declaration to register the selected color option of the product
            // It proved to be unnecessary because it is not a requirement in this iteration

            // Event listener for the delete button

            // let removeFromBasketButton = document.getElementById('removeFromBasket')
            // removeFromBasketButton.addEventListener('click', removeFromBasket);

            // Event listener for the view basket button

            // let viewBasketButton = document.getElementById('viewBasket')
            // viewBasketButton.addEventListener('click', viewBasket);

            // Event listener for the add button

            let addToBasketButton = document.getElementById('addToBasket')
            addToBasketButton.onclick = addToBasket;

            function addToBasket(){
                

                // get data from the API (the whole object that will be put into the basket)
                let singleChosenProduct = bear;

                // If there is nothing saved at the moment, create an empty array

                if (localStorage.getItem('selectedItem') == null){
                    localStorage.setItem('selectedItem', '[]');
                }

                // Get existing data and add new one to it

                let currentBasketContents = JSON.parse(localStorage.getItem('selectedItem'));
                currentBasketContents.push(singleChosenProduct);
                //console.log(singleChosenProduct);

                // Get the total price of the products currently in the basket

                let totalPrice = 0;
                for (let i = 0; i<currentBasketContents.length; i++){
                totalPrice += currentBasketContents[i].price;
                }

                // Save the old and new data to local storage

                localStorage.setItem('selectedItem', JSON.stringify(currentBasketContents));
                localStorage.setItem('totalPrice', JSON.stringify(totalPrice)); 
                
            }
            
            
            //function displayBasketContents(){


                // If there is data to display
            

            // function removeFromBasket(){
                //let idToRemove = list.findIndex
            // }

        }      
    }
}

