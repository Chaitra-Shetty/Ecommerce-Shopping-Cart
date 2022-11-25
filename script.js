let addToCartButtons  = document.getElementsByClassName('btn-primary');
let cartContainer  = document.getElementsByTagName('tbody')[0];
let quantityFields  = document.getElementsByClassName('num');
let delete_buttons = document.getElementsByClassName('uk-button-danger');

//picking up all the add to cart buttons
for(let i=0;i<addToCartButtons .length;i++){
    addToCartButtons[i].addEventListener('click',addToCart);
}

//  function helps to add items to our cart
function addToCart(event){
    let btn = event.target;
    //accessing parent of target button
    let btnParent  = btn.parentElement;
    //accessing grand parent of target button
    let btnGrandParent  = btn.parentElement.parentElement;

    //children of above parent
    let itemName = btnParent .children[0].innerText;
    let itemPrice = btnParent .children[1].innerText;
    let itemImage = btnGrandParent.children[0].src;

    let itemContainer = document.createElement('tr');
    itemContainer.innerHTML = `
    <td><input class="uk-checkbox" type="checkbox"></td>
    <td><img class="uk-preserve-width uk-border-circle" src="${itemImage}" width="40" alt=""></td>
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
    `;

    cartContainer.append(itemContainer);

     // Accessing individual quantity fields
     for(let i=0;i<quantityFields.length;i++){
        //alert(i)
        quantityFields[i].addEventListener('change',totalCost);
     }

      // Accessing individual remove button fields
    for(let i = 0; i < delete_buttons.length; i++){
        delete_buttons[i].addEventListener('click', removeItem);
    }

     grandTotal();

    //console.log(itemImage);
}

//  function helps to multiply the quantity and the price
function totalCost(event){
    let quantity = event.target;
    let quantity_parent = quantity.parentElement.parentElement;
    let price_field = quantity_parent.getElementsByClassName('item-price')[0];
    let total_field = quantity_parent.getElementsByClassName('total-price')[0];
    let price_field_content = price_field.innerText.replace('£', '');
    total_field.children[0].innerText = '£' +  quantity.value * price_field_content;

    grandTotal();

    if(isNaN(quantity.value) || quantity.value <=0){
        quantity.value = 1;
    }

    //  console.log(price_field.innerText)

    //     console.log(quantity)
    //    console.log(quantity_parent);
}

//  function helps to add up the total of the items
function grandTotal(){
    let total = 0;
    let grand_total = document.getElementsByClassName('grand-total')[0];
    let all_total_fields = document.getElementsByClassName('total-price');
    for(let i = 0; i < all_total_fields.length; i++){
        let all_prices = Number(all_total_fields[i].innerText.replace('£',''));
        total += all_prices;
        //console.log(total)
    }
    grand_total.children[0].innerText = '£' + total;
    grand_total.children[0].style.fontWeight = 'bold'
    //console.log(total);
}

//  function helps to remove the item from the cart
function removeItem(event){
    del_btn = event.target;
    del_btn_parent = del_btn.parentElement.parentElement;
    del_btn_parent.remove();
   // console.log(del_btn);
    grandTotal();
}
