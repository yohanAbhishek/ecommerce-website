// Initialize Variables
const name = document.getElementById('name');
const email = document.getElementById('email');
const form = document.getElementById('userForm');
const comment = document.getElementById('comments');
const rating = document.getElementById('rating');
const errorElement = document.getElementById('formError');


let userBadge = 0;
let discount;

let bottle = {
    name: 'Water bottle',
    price: 2000,
    stock: 20
}

let cap={
    name: 'White cap',
    price: 1500,
    stock: 20
}

let bag={
    name: 'Travel bag',
    price: 5500,
    stock: 20
}

// customer initialize
let customer={
    fname: "",
    lname: "",
    address: "",
    mail: "",
    phone: ""
}

let cartTotalPrice = 0;
let cartItems = [];

//---Form Validation---\\
form.addEventListener('submit', (e) => {
    let messages = []
    if (name.value === '' || name.value == null) {
        messages.push('Name is required')
    }

    if (email.value === '' || email.value == null) {
        messages.push('Email is required')
    } else if (ValidateEmail(email.value) === false) {
        messages.push('Enter Valid Email')
    }

    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    } else if (comment.value === '' || comment.value == null) {
        alert(`Dear ${name.value}, Thank you very much for your feedback. You have rated our site as ${rating.value}`)
    } else {
        alert(`Dear ${name.value}, Thank you very much for your feedback. You have rated our site as ${rating.value} and your comment was ${comment.value}`)
    }
});

// Checks if email address is valid using regular expression
function ValidateEmail(inputText)
{
    let mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailformat.test(inputText.toLowerCase());
}

//---Quiz---\\


function evalYesNo(question, points) {
    if (question.toLowerCase() === "yes" ) {
        points += 2;
    } else {
        points -= 1;
    }
    return points;
}

function evalUserscore(points) {
    if (points < 0){
        return 0; // no medal
    } else if (points < 3){
        return 1; // bronze
    } else if (points < 7) {
        return 2; // silver
    } else if (points <= 10) {
        return 3; // gold
    }
}

function startQuiz() {
    let userPoints = 0;

    let question1 = prompt("Is Buyanything an Ecommerce Site? (Yes/No)");
    userPoints = evalYesNo(question1.trim(), userPoints);
    console.log(userPoints);
    let question2 = prompt("Does our website use AI and machine learning? (Yes/No)");
    userPoints = evalYesNo(question2.trim(), userPoints);
    console.log(userPoints);
    let question3 = prompt("Does our website suggest products based on a customer's past behavior? (Yes/No)");
    userPoints = evalYesNo(question3.trim(), userPoints);
    console.log(userPoints);
    let question4 = prompt("Can our website predict context from our customer's search queries? (Yes/No)");
    userPoints = evalYesNo(question4.trim(), userPoints);
    console.log(userPoints);
    let question5 = prompt("Do we offer a various selection of products? (Yes/No)")
    userPoints = evalYesNo(question5.trim(), userPoints);
    console.log(userPoints);

    switch (evalUserscore(userPoints)) {
        case 0:
            alert("Thanks for taking our quiz! Unfortunately you haven't earned a badge");
            break;
        case 1:
            alert(`Congratulation! You have earned ${userPoints} points with a Bronze badge, please claim the points in your next purchase`);
            break;
        case 2:
            alert(`Congratulation! You have earned ${userPoints} points with a Silver badge, please claim the points in your next purchase`);
            break;
        case 3:
            alert(`Congratulation! You have earned ${userPoints} points with a Gold badge, please claim the points in your next purchase`);
            break;
    }

    userBadge = evalUserscore(userPoints); // updates userBadge value to be used for discount later.
}



//---Menu Toggle for smaller displays---\\


function menuToggle(){
    if (menuItems.style.maxHeight === "0px") {
        menuItems.style.maxHeight = "200px";
    } else {
        menuItems.style.maxHeight = "0px";
    }
}

function dropdown(){
    document.getElementById("menuItems").classList.toggle("show");
}
window.onclick = function(Event){
    if (!event.target.matches('.menuIcon')) {
        let dropdowns = document.getElementsByClassName("links");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
}




/* Products */



// Products initialize

function changeFontSize(type){
    /*This function changes the font size of 
    the product page and about us page*/
    let id = ["#resetFont"];
    let element = document.querySelector(id); 
    let fontSize = window.getComputedStyle(element, null).getPropertyValue("font-size"); 
    fontSize = parseFloat(fontSize);

    if(type === "increase"){
        element.style.fontSize = (fontSize+1)+"px";
    }
    else if(type === "decrease") {
        element.style.fontSize = (fontSize-1)+"px";
    }
    else{
        element.style.fontSize = (16)+"px";
    }
}

function showAndClearField(formReference){
    /*This method validates the form and alerts 
    the customer of the order been placed */
    customer.fname = formReference.firstName.value; 
    customer.lname = formReference.lastName.value; 
    customer.mail = formReference.email.value; 
    customer.phone = formReference.phoneNumber.value;
    customer.address = formReference.address.value; 

    if(customer.fname===""){
        alert("Please fill your first name!");
    } else if(customer.lname===""){
        alert("Please fill your last name!");
    } else if(customer.mail===""){
        alert("Please fill your last name!");
    } else if(customer.address===""){
        alert("Please fill your last name!");
    } else if(customer.phone===""){
        alert("Please fill your contact number!");
    }else{
        toPrint = "Order summary\n\n";
        for (let i=0; i<cartItems.length; i++){
            toPrint += "Name: "+cartItems[i].split(",")[0]+"| ";
            toPrint += "Qnt: "+cartItems[i].split(",")[1]+"\n\n";
        }
        toPrint+="\nYour total is: "+cartTotalPrice;
        alert(toPrint)
        alert("Thanks for placing the order Mr."+customer.fname+" "+customer.lname+". Your order will be shipped to "+customer.address);
        document.getElementById("popup-1").classList.toggle("active");
        document.getElementById("content").innerHTML = "";
        cartTotalPrice = 0;
        cartItems = [];
        document.getElementById("totalPrice").innerHTML = "Total: LKR "+cartTotalPrice;
        document.getElementById("cart-display-qnt").innerHTML = "";
    }
}

function changeStockText(pName, quantity){
    /*This method changes the text value of the stock of each 
    product in the product page when a change is done to the stock*/
    if(pName==="bottle"){
        if (bottle.stock>0){
            bottle.stock -= quantity;
            document.getElementById("p1StockText").innerHTML = "In stock: "+bottle.stock+" items";
        } else {
            document.getElementById("addP1ToCart").disabled = true;
        }

    } else if (pName==="bag"){
        if (bag.stock>0){
            bag.stock -= quantity;
            document.getElementById("p3StockText").innerHTML = "In stock: "+bag.stock+" items";
        } else {
            document.getElementById("addP3ToCart").disabled = true;
        }
    } else if (pName==="cap"){
        if (cap.stock>0){
            cap.stock -= quantity;
            document.getElementById("p2StockText").innerHTML = "In stock: "+cap.stock+" items";
        } else {
            document.getElementById("addP2ToCart").disabled = true;
        }
    }
}

function addToCartSection(imageName, name, price, stock){
    /*This is the main method of the add to cart methods. Validates the 
    quantity of items required by customer and adds to cart */
    if(stock===0){
        alert(name+" is out of stock at the moment!")
    } else{
        let quantity = prompt("Enter quantity: ");
        if(isNaN(quantity) || quantity==="" || quantity<=0 || quantity==null){
            alert("Please select a valid quantity!")
        }
        else {
            if(stock>=quantity){
                cartItems.push(name+","+quantity)
                cartTotalPrice += price*quantity;
                changeStockText(name.split(" ")[1],quantity)
                addToCartBox(imageName, name, price, quantity);
            }
            else{
                alert("There is only "+stock+" in stock.");
            }
        }
    }
}

function getNumberOfTotalItemsInCart(){
    let totalItems = 0;
    for(let i=0; i<cartItems.length; i++){
        totalItems+=parseInt(cartItems[i].split(",")[1]);
    } return totalItems;
}

function addToCartBox(imageName, name, price, qnt){
    /*Adds the item, item image, price and quantity into the sidepanel cart */
    document.getElementById("cart-display-qnt").innerHTML = " "+getNumberOfTotalItemsInCart();
    document.getElementById("content").innerHTML += 
        "<img id='cartImage' src='assets/"+imageName+"' class='productImg'></img>\
<div class='cart-content'></br> \
"+name+"</br>Price: "+(price*qnt)+"</br>\
Quantity:"+qnt+"</div>";
    document.getElementById("totalPrice").innerHTML = "Total: LKR "+parseInt(cartTotalPrice);
}

function resetCart(){
    /*Executes When the reset button is clicked in the side panel cart */
    document.getElementById("content").innerHTML = "";
    cartTotalPrice = 0;
    cartItems = [];
    document.getElementById("totalPrice").innerHTML = "Total: LKR "+cartTotalPrice;
    bottle.stock=20;
    bag.stock=20;
    cap.stock=20;
    document.getElementById("p1StockText").innerHTML = "In stock: "+bottle.stock+" items";
    document.getElementById("p3StockText").innerHTML = "In stock: "+bag.stock+" items";
    document.getElementById("p2StockText").innerHTML = "In stock: "+cap.stock+" items";
    document.getElementById("addP1ToCart").disabled = false;
    document.getElementById("addP2ToCart").disabled = false;
    document.getElementById("addP2ToCart").disabled = false;
    document.getElementById("cart-display-qnt").innerHTML = "";
}

function togglePopup(){
    /*Open side panel only if there are items in the cart */
    if(cartTotalPrice>0){
        document.getElementById("popup-1").classList.toggle("active");
    } else{
        alert("Cart is empty!")
    }
}

function deductPointsFromTotalPrice(){
    /*Function to reduce quiz points */

    console.log(userBadge);
    switch(userBadge){
        case(0):
            discount=0;
            break;
        case(1):
            discount=5;
            break;
        case(2):
            discount=10;
            break;
        case(3):
            discount=15;
            break;
    }
    if(discount===0){
        alert("Point balance insufficient!")
    } else{
        cartTotalPrice -= cartTotalPrice * (discount/100);
        document.getElementById("claimPointsButton").disabled = true;
        alert("Points deducted from total price. Your total now is: "+cartTotalPrice)
        document.getElementById("totalPrice").innerHTML = "Total: LKR "+cartTotalPrice;
    }
}