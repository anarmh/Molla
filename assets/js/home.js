"use strict"

$(function(){
  
$(document).ready(function () {


  $('.responsive').slick({
          dots: true,
          infinite: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
        });
  
  
        $('.basic').slick({
          dots: true,
          infinite: false,
          speed: 300,
          slidesToShow: 7,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
        });
  
       
  
        $('.product').slick({
          dots: true,
          infinite: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
        });
     
        $('.product-selling').slick({
          dots: true,
          infinite: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
        });
     
      
    
  
  
  });
  
  let menues = $("#tab-carousel .tab-menu .item");

  menues.on("click", function(e) {
    e.preventDefault();
    $(".active-menu").removeClass("active-menu");
    $(this).addClass("active-menu");
  
    let id = $(this).data("id");
    $(".responsive").addClass("d-none");
    $(`.responsive[data-id=${id}]`).removeClass("d-none").slick("setPosition");
  });
 
  let items = $("#trending-products .list-products .item");

  items.on("click", function(e) {
    e.preventDefault();
    $(".active-tab").removeClass("active-tab");
    $(this).addClass("active-tab");
  
    let id = $(this).data("id");
    $(".product").addClass("d-none");
    $(`.product[data-id=${id}]`).removeClass("d-none").slick("setPosition");
  });
  

 
  let sellingProducts = $("#top-selling .list-products .item");

  sellingProducts.on("click", function(e) {
    e.preventDefault();
    $(".active-product").removeClass("active-product");
    $(this).addClass("active-product");
  
    let id = $(this).data("id");
    $(".product-selling").addClass("d-none");
    $(`.product-selling[data-id=${id}]`).removeClass("d-none").slick("setPosition");
  });



})

let basketsClick=document.querySelectorAll("#tab-carousel .icon .fa-cart-shopping");

let basket=[];

if(JSON.parse(localStorage.getItem("basket"))!=null){
  basket=JSON.parse(localStorage.getItem("basket"));
}

basketsClick.forEach(btn => {
  
  btn.addEventListener("click",function(e){
    e.preventDefault();

    let cardImage=this.closest(".img").firstElementChild.getAttribute("src");
    let cardName=this.closest(".img").nextElementSibling.firstElementChild.children[1].innerText;
    let cardDesc=this.closest(".img").nextElementSibling.children[1].firstElementChild.firstElementChild.innerText;
    let cardPrice=parseInt(this.closest(".img").nextElementSibling.children[2].children[1].innerText);
    let cardId=parseInt(this.closest(".img").parentNode.getAttribute("data-id"));
    
    let existCard=basket.find(m=>m.id==cardId);

    if(existCard!=undefined){

      existCard.count++;
      existCard.price=existCard.count*cardPrice
    }
    else{

      basket.push({
        id:cardId,
        name:cardName,
        description:cardDesc,
        image:cardImage,
        price:cardPrice,
        count:1
      })
    }
    localStorage.setItem("basket",JSON.stringify(basket));
    getBasketCount(basket);

  })
});

function getBasketCount(arr){


  let count=0;

  for (const item of arr) {
    count+=item.count;
  }

  document.querySelector("#up-navbar .cart-sup span").innerText=count;
}

getBasketCount(basket);



let wishlist=document.querySelectorAll("#tab-carousel .wishlist .fa-heart")

let basketWishlist=[];

if(JSON.parse(localStorage.getItem("basketWishlist"))!=null){
  basketWishlist=JSON.parse(localStorage.getItem("basketWishlist"));
}

wishlist.forEach(btn => {
  
  btn.addEventListener("click",function(e){
    e.preventDefault();
    if(this.classList.contains('active-wish')){
      this.classList.remove('active-wish');
      let cardId=parseInt(this.closest(".img").parentNode.getAttribute("data-id"));
      let wishes = JSON.parse(localStorage.getItem("basketWishlist"));
      let lists = wishes.filter(val =>  { 
        return val.id != cardId 
      })
      localStorage.setItem("basketWishlist",JSON.stringify(lists));
      basketWishlist=JSON.parse(localStorage.getItem("basketWishlist"));
    }else{
      let cardImage=this.closest(".img").firstElementChild.getAttribute("src");
      let cardName=this.closest(".img").nextElementSibling.firstElementChild.children[1].innerText;
      let cardDesc=this.closest(".img").nextElementSibling.children[1].firstElementChild.firstElementChild.innerText;
      let cardPrice=parseInt(this.closest(".img").nextElementSibling.children[2].children[1].innerText);
      let cardId=parseInt(this.closest(".img").parentNode.getAttribute("data-id"));
      this.classList.add('active-wish');
      
      let existCard= basketWishlist.find(m=>m.id==cardId);

      if(existCard!=undefined){

        existCard.count++;
        existCard.price=existCard.count*cardPrice
      }
      else{

        basketWishlist.push({
          id:cardId,
          name:cardName,
          description:cardDesc,
          image:cardImage,
          price:cardPrice,
          count:1
        })
      }
      localStorage.setItem("basketWishlist",JSON.stringify(basketWishlist));
      basketWishlist=JSON.parse(localStorage.getItem("basketWishlist"));
    }
    getWishlistCount(basketWishlist);
    
  })
});

function getWishlistCount(arr){


  let count=0;

  for (const item of arr) {
    count+=item.count;
  }

  document.querySelector("#up-navbar .wislist-sup span").innerText=count;
}

getWishlistCount(basketWishlist);


document.addEventListener("scroll",()=>{
  let navbar=document.getElementById("down-navbar")

  if(window.scrollY>50){
    navbar.classList.add(`sticky`)
  }
  else{
    navbar.classList.remove("sticky")
  }
})