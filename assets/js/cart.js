"use strict";

let products = JSON.parse(localStorage.getItem("basket"));

let tableBody = document.querySelector("#cart .cart-info");

let cartTotal = document.querySelector("#cart .cart-total");

if (products != null) {
  products.forEach((product) => {
    tableBody.innerHTML += `
        <tr data-id="${product.id}">
        <td><img src="${product.image}" alt=""></td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>
            <div class="input">
                <div class=" icon prev "><i class="fa-solid fa-minus"></i></div>
                <input type="number" value="${product.count}">
                <div class="icon next"><i class="fa-solid fa-plus"></i></div>
            </div>
        </td>
        <td><span class="total-result"></span></td>
        <td><i class="fa-solid fa-xmark delete-item"></i></td>
      </tr> `;
  });
  removeProduct();
  IncreaseAndDecreasePriceCount();
} else {
  tableBody.parentNode.classList.add("d-none");
  tableBody.parentNode.nextElementSibling.classList.add("d-none");
  tableBody.closest(".closest").nextElementSibling.classList.add("d-none");
  tableBody
    .closest(".closest")
    .closest(".container")
    .previousElementSibling.classList.remove("d-none");
}

function getBasketCount(arr) {
  let count = 0;

  for (const item of arr) {
    count += item.count;
  }
  document.querySelector("#up-navbar .cart-sup span").innerText = count;
}
getBasketCount(products);

function removeProduct() {
  let productsDelete = document.querySelectorAll(".delete-item");

  productsDelete.forEach((btn) => {
    btn.addEventListener("click", function () {
      let deleteItem = this.closest("tr");
      let deleteItemId = deleteItem.getAttribute("data-id");
      deleteItem.remove();
      let itemStorageId = products.findIndex((el) => el.id == deleteItemId);
      products.splice(itemStorageId, 1);
      localStorage.setItem("basket", JSON.stringify(products));
      getBasketCount(products);
      GetAllPrice();
    });
  });
}

function GetAllPrice() {
  let result = JSON.parse(localStorage.getItem("basket"));
  if (result != null) {
    for (let i = 0; i < result.length; i++) {
      let product = result[i];
      let totalResult = document.querySelectorAll(".total-result")[i];
      let total = product.price * product.count;
      totalResult.innerText = total.toFixed(2);
    }

    let sum = 0;

    for (const item of result) {
      sum += item.price * item.count;
    }
    document.querySelector(".all-total").innerText = sum.toFixed(2);
  }
}
GetAllPrice();

function IncreaseAndDecreasePriceCount() {
  let inputNumbers = document.querySelectorAll("input[type=number]");

  inputNumbers.forEach((input) => {
    input.addEventListener("change", function () {
      let parentRow = this.closest("tr");
      let productId = parentRow.getAttribute("data-id");
      let product = products.find((el) => el.id == productId);
      product.count = Number(this.value);
      localStorage.setItem("basket", JSON.stringify(products));
      getBasketCount(products);
      GetAllPrice();
    });
  });

  let minusButtons = document.querySelectorAll(".prev");
  let plusButtons = document.querySelectorAll(".next");

  minusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let inputNumber = this.nextElementSibling;
      let parentRow = this.closest("tr");
      let productId = parentRow.getAttribute("data-id");
      let product = products.find((el) => el.id == productId);
      if (inputNumber.value > 1) {
        inputNumber.value = Number(inputNumber.value) - 1;
        product.count = Number(inputNumber.value);
        localStorage.setItem("basket", JSON.stringify(products));
        getBasketCount(products);
        GetAllPrice();
      }
    });
  });

  plusButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let inputNumber = this.previousElementSibling;
      let parentRow = this.closest("tr");
      let productId = parentRow.getAttribute("data-id");
      let product = products.find((el) => el.id == productId);
      inputNumber.value = Number(inputNumber.value) + 1;
      product.count = Number(inputNumber.value);
      localStorage.setItem("basket", JSON.stringify(products));
      getBasketCount(products);
      GetAllPrice();
    });
  });

  let basketWishlist = JSON.parse(localStorage.getItem("basketWishlist"));

  if (basketWishlist != null) {
    getWishlistCount(basketWishlist);
  }

  function getWishlistCount(arr) {
    let count = 0;

    for (const item of arr) {
      count += item.count;
    }

    document.querySelector("#up-navbar .wislist-sup span").innerText = count;
  }
}
