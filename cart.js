
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");


const parentElement = document.getElementById('bearCards');
bearcard = document.createElement('div');
bearcard.setAttribute('class', 'itemRow');
parentElement.appendChild(bearcard);

// Accessing the total price of basket contents previously saved in local storage

let totalItemPrice = JSON.parse(localStorage.getItem('totalPrice'));
                                                         
document.getElementById('totalPrice').innerHTML = totalItemPrice;

let bearobjects = JSON.parse(localStorage.getItem('selectedItem')); 

// I need to display all the selected objects from local storage

for (let bear of bearobjects) {

    deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'deleteButton');
    deleteButton.onclick = removeProduct;
    
    
    productBox = document.createElement('div');
    productBox.setAttribute('class', 'itemColumn');
    productBox.setAttribute('id', bear._id);

    productImage = document.createElement('img');
    productImage.setAttribute('class', 'img_small')
    productImage.src = bear.imageUrl;

    productPrice = document.createElement('p');
    productPrice.textContent = '$' + bear.price;

    productName = document.createElement('p');
    productName.textContent = bear.name;

    bearcard.appendChild(productBox);
    productBox.appendChild(productImage);
    productBox.appendChild(productPrice);
    productBox.appendChild(productName);
    productBox.appendChild(deleteButton);

  };

  console.log(bearobjects);
  console.log(totalItemPrice);

  // Function to delete an entry from localstorage

function removeProduct(e){
    let x = e.target.parentNode.id;
    console.log(x);

      for (let bear of bearobjects){
        if (x === bear._id){
          newbearobjects = bearobjects.filter(bear => bear._id != x);
          localStorage.setItem('selectedItem', JSON.stringify(newbearobjects));
          totalItemPrice = 0;

      for (let i = 0; i <= newbearobjects.length; i++){
        if (newbearobjects.length === 0){
          totalItemPrice = 0;       
        } else {
          totalItemPrice += (newbearobjects[i].price);
          }
        localStorage.setItem('totalPrice', JSON.stringify(totalItemPrice));
      }
      }
      location.reload();
    }
}

// Compiling the data from the contact form into an object

const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const addressInput = document.getElementById('address');
const cityInput = document.getElementById('city');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('submit-button');

// Email validation

function validateEmail() {
  let emailID = document.Form.Email.value;
  atposition = emailID.indexOf("@");
  dotposition = emailID.lastIndexOf(".");
  
  if (atposition < 1 || ( dotposition - atposition < 2 )) {
     alert("Please enter correct email ID")
     document.Form.Email.focus() ;
     return false;
  }
  window.location.href = "summary.html"
}

// Function that validates user input

function validate() {
      
  if (document.Form.FirstName.value == "" ) {
     alert( "Please provide your first name!" );
     document.Form.FirstName.focus() ;
     return false;
  }

  if (document.Form.LastName.value == "" ) {
    alert( "Please provide your last name!" );
    document.Form.FirstName.focus() ;
    return false;
 }

  if( document.Form.Email.value == "" ) {
     alert( "Please provide your Email!" );
     document.Form.Email.focus() ;
     return false;
  }

  validateEmail();

  if (document.Form.Address.value == "" ) {
    alert( "Please provide your name!" );
    document.Form.Address.focus() ;
    return false;
 }

  if( document.Form.City.value == "-1" ) {
     alert( "Please provide your city!" );
     return false;
  }
}

// Function that creates an object containing the contact object and products array

  function compile(){

    let getIdOfProducts = JSON.parse(localStorage.getItem('selectedItem'));
    let idArray = [];
    for (let i = 0; i<getIdOfProducts.length; i++){
    idArray.push(getIdOfProducts[i]._id);
    }
      
   let post = {
    "contact": {
      "firstName": firstNameInput.value,
      "lastName": lastNameInput.value,
      "address": addressInput.value,    
      "city": cityInput.value,
      "email": emailInput.value
    },
    "products": idArray
  }

 fetch('http://localhost:3000/api/teddies/order', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
      })

      .then(response => response.json())
      .then(post => {
        //let finalPrice = post.
        let finalId = post.orderId;
        console.log(finalId);
        localStorage.setItem('macska', finalId);
      console.log('Success:', post);    
      })
    .catch((error) => {
    console.error('Error:', error);
  });

  console.log(JSON.stringify(post));
  validate(); 
}

compilebutton = document.getElementById('testbutton')
compilebutton.onclick = compile;
