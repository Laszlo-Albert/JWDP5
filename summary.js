let idToDisplay = document.getElementById("orderId");
idToDisplay.innerHTML = "You can track your order using the following code:  " + localStorage.getItem('macska');

let priceToDisplay = document.getElementById("orderPrice");
priceToDisplay.innerHTML = "Total value of transaction is: $" + localStorage.getItem('totalPrice');


