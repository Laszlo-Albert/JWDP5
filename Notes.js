function compile(e){
    let getIdOfProducts = JSON.parse(localStorage.getItem('selectedItem'));
    let idArray = [];
    for (let i = 0; i<getIdOfProducts.length; i++){
    idArray.push(getIdOfProducts[i]._id);
    }
    let idString = idArray.toString();



let contactObject = Array.from(document.querySelectorAll('#form-submit input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value}), {});



function finalOrder(contactobject, idstring) {
    this.contactobject = contactObject;
    this.idstring = idString;
}

let order = new finalOrder(contactObject, idString);
console.log(order);
}

compilebutton = document.getElementById('testbutton')
compilebutton.onclick = compile;












function compiler(){

  // Preventing auto submission of the form
  preventDefault()

    let getIdOfProducts = JSON.parse(localStorage.getItem('selectedItem'));
    let idArray = [];
    for (let i = 0; i<getIdOfProducts.length; i++){
    idArray.push(getIdOfProducts[i]._id);
    }

    console.log(idString);



  let contactObject = Array.from(document.querySelectorAll('#form-submit input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value}), {});
    console.log(contactObject);

  let finalObject = contactObject;
  let finalString = idString;

  // fetch POST request

  fetch("http://localhost:3000/api/teddies/order", {
    method:'POST', 
    body: JSON.stringify({
      value1: finalObject,
      value2: finalString
    }),
    headers: {
      "Content-Type":"application/json; charset=UTF-8"
    }
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    console.log(data)
  })
}

sendit = document.getElementById('submit-button')
sendit.onclick = compiler;













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

async function formPost(post) {
try {
  let resp = await fetch('http://localhost:3000/api/teddies/order', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
    });

    if (resp.ok) {
      let responseId = await resp.json();
      console.log(responseId);
      //window.location.href ="summary.html";
    } else {
      console.error('Error', resp.status);
    }

  } catch (e) {
    console.log(e);
  }
    
}
formPost(post);


// .then(response => response.json())
// .then(post => {
//       console.log('Success:', post);
      
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

// console.log(JSON.stringify(post));
}

compilebutton = document.getElementById('testbutton')
compilebutton.onclick = compile;

console.log(responseId);



// Funtion to grab the order confirmation ID

// function getOrderConfirmationId(responseId) {
//   let orderId = responseId.orderId;
//   console.log(orderId);
//   localStorage.setItem("orderConfirmationId", orderId);
// }
