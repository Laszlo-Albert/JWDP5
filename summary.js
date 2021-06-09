let beka = document.getElementById("orderId");
console.log(beka);
beka.innerHTML = localStorage.getItem('macska');

let kazuar = document.getElementById("orderPrice");
kazuar.innerHTML = localStorage.getItem('totalPrice');


