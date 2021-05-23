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