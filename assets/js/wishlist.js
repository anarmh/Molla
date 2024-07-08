"use strict";

let wishlist = JSON.parse(localStorage.getItem("basketWishlist"));

let tableBody = document.querySelector("#wishlist .wishlist-info");

if (wishlist != null) {
  wishlist.forEach((elem) => {
    tableBody.innerHTML += `
        <tr data-id="${elem.id}">
       <td > <img src="${elem.image}" alt=""></td>
       <td>${elem.description}</td>
       <td class="text"> 
           <span>${elem.price}</span>
       </td>
       <td class="text">
          <span>In stock</span>
       </td>
       <td>
           <div class="button">
               <button type="submit">
                   <i class="fa-solid fa-cart-shopping"></i>
                   ADD TO CART
               </button>
               <i class="fa-solid fa-xmark delete-item"></i>
               
           </div>
          
       </td>
      
     </tr> `;

     removeProduct()
  });
}
else{
    tableBody.parentNode.classList.add("d-none");
    tableBody.closest(".closest").closest(".container").previousElementSibling.classList.remove("d-none")

}


let basket=[];

if(JSON.parse(localStorage.getItem("basket"))!=null){
  basket=JSON.parse(localStorage.getItem("basket"));
}

getBasketCount(basket)

function getWishlistCount(arr){

    let count=0;
    for (const item of arr) {
        count+=item.count;
    }

    document.querySelector("#up-navbar .wislist-sup span").innerText=count;
}


function getBasketCount(arr) {
    let count = 0;
  
    for (const item of arr) {
      count += item.count;
    }
    document.querySelector("#up-navbar .cart-sup span").innerText = count;
  }
getWishlistCount(wishlist)

function removeProduct(){

    let productsDelete=document.querySelectorAll(".delete-item")
    
    productsDelete.forEach(btn=> {
      btn.addEventListener("click",function(){
        let deleteItem=this.closest("tr");
        let deleteItemId=deleteItem.getAttribute("data-id");
        deleteItem.remove();
        let itemStorageId=wishlist.findIndex((el)=>el.id==deleteItemId);
        wishlist.splice(itemStorageId,1);
        localStorage.setItem("basketWishlist", JSON.stringify(wishlist));
        getWishlistCount(wishlist);
      
  
      })
    })


}
