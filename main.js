
const itemList = document.getElementById("itemlist")
const cardRow = document.createElement("div")
cardRow.setAttribute('class', 'row')
itemList.appendChild(cardRow)

// Creating the apiRequest variable and assigning a new XMLHHttpRequest object to it.
let apiRequest = new XMLHttpRequest();

// Opening a new connection, using the GET request on the URL endpoint
apiRequest.open('GET', 'http://localhost:3000/api/teddies');

apiRequest.onload = function(){
    // Accessing JSON data here
    let data = JSON.parse(this.response)
    if (apiRequest.status >= 200 && apiRequest.status < 400) {

        data.forEach((bears) => {

            const image = document.createElement('img')
            image.src = bears.imageUrl

            let link = document.createElement('a')
            link.id = bears._id
            link.setAttribute('href', "#")
            link.setAttribute('onclick', 'updateLink(this)')          

            const cardColumn = document.createElement("div")
            cardColumn.setAttribute('class', 'col colony')
            
            const h3 = document.createElement('h3')
            h3.textContent = bears.name

            cardRow.appendChild(cardColumn)
            cardColumn.appendChild(image)
            cardColumn.appendChild(link)
            cardColumn.appendChild(h3)
            link.appendChild(image)     
        })
        

    } else {
        const errorMessage = document.createElement('h1')
        errorMessage.textContent = "Something's wrong"
        itemList.appendChild(errorMessage)
    }
}

//Send request
apiRequest.send();

window.updateLink = function(link){
    link.setAttribute('href', 'details.html?id=' + link.id);
}

let shoppingBasket = document.getElementById('openBasket')
console.log(shoppingBasket);

shoppingBasket.onclick = function(){
window.location.href = "cart.html";
};

let badge = document.getElementById('badge');
badge.textContent = localStorage.getItem('cartNumbers');

