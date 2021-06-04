
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

// const responseFirstName = document.getElementById('response-firstname');
// const responseLastName = document.getElementById('response-lastname');
// const responseAddress = document.getElementById('response-address');
// const responseCity = document.getElementById('response-city');
// const responseEmail = document.getElementById('response-email');
// const responseProducts = document.getElementById('response-products');

// submitButton.addEventListener('click', ($event) => {
//       $event.preventDefault();
      
//       let getIdOfProducts = JSON.parse(localStorage.getItem('selectedItem'));
//       let idArray = [];
//       for (let i = 0; i<getIdOfProducts.length; i++){
//       idArray.push(getIdOfProducts[i]._id);
//     }
// debugger;
//     const productArray = idArray;
//     console.log(productArray);
//     let contactObject = Array.from(document.querySelectorAll('#form-submit input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value}), {});
//     console.log(contactObject);

// Function that creates an object containing the contact object and products array

  function compile(){



    let getIdOfProducts = JSON.parse(localStorage.getItem('selectedItem'));
    let idArray = [];
    for (let i = 0; i<getIdOfProducts.length; i++){
    idArray.push(getIdOfProducts[i]._id);
    }
    // let idString = idArray.toString();
      
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
        //localStorage.setItem('macska', finalId);
        //console.log(summaryID);
      console.log('Success:', post);    
      })
    .catch((error) => {
    console.error('Error:', error);
  });

  console.log(JSON.stringify(post));
  
}

compilebutton = document.getElementById('testbutton')
compilebutton.onclick = compile;





// Funtion to grab the order confirmation ID

// function getOrderConfirmationId(responseId) {
//   let orderId = responseId.orderId;
//   console.log(orderId);
//   localStorage.setItem("orderConfirmationId", orderId);
// }


  
// });

// function makeRequest(data){
//   return new Promise((resolve, reject) => {
//     let request = new XMLHttpRequest();
//     request.open('POST', api + '/order');
//     request.onreadystatechange = () => {
//       if (request.readyState === 4) {
//         if (request.status === 201){
//           resolve(JSON.parse(request.response));
//         } else {
//           reject(JSON.parse(request.response));
//         }
//       }
//     };
//     request.setRequestHeader('Content-Type', 'application/json');
//     request.send(JSON.stringify(data));
//   });
// }


// async function submitFormData(post) {
//   try {
//     const requestPromise = makeRequest(post);
//     const response = await requestPromise;
//     responseFirstName.textContent = response.post.firstName
//     responseLastName.textContent = response.post.lastName
//     responseAddress.textContent = response.post.firstName
//     responseCity.textContent = response.post.city
//     responseEmail.textContent = response.post.email
//     responseProduct.textContent = response.products
//   } catch (errorResponse) {
//     responseFirstName.textContent = errorResponse.error
//   }
// }