"use strict";

//Banners (slider)
const slider = function () {
  // const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotsContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide = "${i}"></button>`
      );
    });
  };

  const activeDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - slide) * 100}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activeDots(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    activeDots(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activeDots(0);
  };

  init();

  //Event handler

  btnLeft.addEventListener("click", prevSlide);
  btnRight.addEventListener("click", nextSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();

    if (e.key === "ArrowLeft") prevSlide();
  });

  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDots(slide);
    }
  });
};

slider();

/////////////////////////////
// Modal window for users to log in
const modal = document.querySelector(".modal");
const modalHeader = document.querySelector(".modal__header");
const modalForm = document.querySelector(".modal__form");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnOpenModal = document.querySelector(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Use asynchronous JavaScript to retrieve data from this database

let url = "https://my-json-server.typicode.com/mrkiley/cwb2023-onlineshop/db";

//A gerneral function to get data from URL using async and await
const getData = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  return res;
};

////////////////////////////////////////

async function setUpUserPage(data) {
  const products = data.products;
  const veges = products.filter((product) => product.category === "vegetable");
  const rootVegesContainer = document.querySelector(".rootvege-products");
  const leafygreensContainer = document.querySelector(".leafygreens-products");
  const otherVegesContainer = document.querySelector(".othervege-products");

  const tabContainer = document.querySelector(".products__tab-container");
  const allTabs = document.querySelectorAll(".operations__tab");
  const tabsContent = document.querySelectorAll(".operations__content");

  const rootVeges = [
    "Carrot",
    "Potato",
    "Beetroot",
    "Onion",
    "Turnip",
    "Rutabaga",
  ];
  const leafyGreens = ["Spinach", "Kale", "Chard", "Collard Greens"];
  const otherVeges = [
    "Broccoli",
    "Brussels Sprouts",
    "Tomato",
    "Bell Pepper",
    "Eggplant",
    "Cucumber",
    "Zucchini",
    "Pumpkin",
    "Squash",
    "Asparagus",
    "Artichoke",
    "Corn",
    "Celery",
    "Leek",
  ];

  //Tabbled Components

  tabContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");
    if (!clicked) return;

    allTabs.forEach((t) => t.classList.remove("operations__tab--active"));
    tabsContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    );

    //Active tab
    clicked.classList.add("operations__tab--active");

    //Active Content Area
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  });

  const productCard = function (product) {
    const html = `
        <div class="card">
          <img class="card-img-top" src=${product.image} alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-price">${product.price.toFixed(2)}${
      product.currency === "USD" ? "$" : ""
    }</p>
          </div>
          <div class="shopping--btns">
            
              <i class= "bx bxs-heart product-like-btn btn btn-heart" ></i>

              <button class ="btn btn-addtocart cart-container" id="cart-button" >
              <img class="cart-img product-cart-btn add-cart" src="images/shopping-cart.png" alt="shopping cart image">
              </button>

              <div class="quantity-container display-none">
                <button class="quantity-button decrease-btn" >&minus;</button>
                <input type="number" id="quantityInput" value="1" min="0">
                <button class="quantity-button increase-btn">&plus;</button>
              </div>
            
          </div>
        </div>`;

    return html;
  };

  const categorizeProducts = function () {
    //Category--root Veges
    const rootVegesProducts = products.filter((product) =>
      rootVeges.includes(product.name)
    );

    rootVegesProducts.forEach((vege) =>
      rootVegesContainer.insertAdjacentHTML("afterbegin", productCard(vege))
    );

    //Category--Leafy Greens
    const leafyGreensProducts = products.filter((product) =>
      leafyGreens.includes(product.name)
    );

    leafyGreensProducts.forEach((greens) =>
      leafygreensContainer.insertAdjacentHTML("afterbegin", productCard(greens))
    );

    //Category--Other Vegetables

    const otherVegeProducts = products.filter((product) =>
      otherVeges.includes(product.name)
    );

    otherVegeProducts.forEach((other) =>
      otherVegesContainer.insertAdjacentHTML("afterbegin", productCard(other))
    );
  };

  categorizeProducts();

  //like button
  const btnsLike = document.querySelectorAll(".btn-heart");
  btnsLike.forEach((btn) => {
    btn.addEventListener("click", function () {
      btn.style.color = "#f94458";
    });
  });

  //Shopping Cart
  const cartIcon = document.querySelector(".shopping-cart");
  const cart = document.querySelector(".cart");
  const closeCart = document.querySelector("#close-cart");

  //Open Cart
  cartIcon.onclick = () => {
    cart.classList.add("active");
  };

  //Close Cart
  closeCart.onclick = () => {
    cart.classList.remove("active");
  };

  //Cart Working JS
  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

  //Making Function
  function ready() {
    //Remove Items From Cart
    const removeCartBtns = document.querySelectorAll(".cart-remove");
    removeCartBtns.forEach((btn) => {
      btn.addEventListener("click", removeCartItem);
    });

    //Quantity change
    const quantityInputs = document.querySelectorAll(".cart-quantity");
    quantityInputs.forEach((input) => {
      input.addEventListener("change", quantityChanged);
    });

    //Add to cart
    const addCart = document.querySelectorAll(".btn-addtocart");
    addCart.forEach((btn) => {
      btn.addEventListener("click", addCartClicked);
    });

    //Buy Button Work
    document
      .getElementsByClassName("btn-buy")[0]
      .addEventListener("click", buyButtonClicked);
  }

  //Buy Button
  function buyButtonClicked() {
    alert("Your order is placed");
    const cartProducts = document.getElementsByClassName("cart-products")[0];
    while (cartProducts.hasChildNodes()) {
      cartProducts.removeChild(cartProducts.firstChild);
    }

    updateTotal();
  }

  function removeCartItem(e) {
    const buttonClicked = e.target;
    buttonClicked.parentElement.remove();
    updateTotal();
  }

  //Quantity changes
  function quantityChanged(e) {
    const input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updateTotal();
  }

  //Add To Cart
  function addCartClicked(e) {
    const button = e.target;
    const shopProducts = button.closest(".card");
    const title = shopProducts.querySelector(".card-title").textContent;
    const price = shopProducts.querySelector(".card-price").textContent;
    const productImg = shopProducts.querySelector(".card-img-top").src;
    addProductToCart(title, price, productImg);
    updateTotal();
  }

  function addProductToCart(title, price, productImg) {
    const cartProducts = document.querySelector(".cart-products");
    const cartItemNames = document.getElementsByClassName("cart-product-title");

    for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].textContent == title) {
        alert("You have already add this item to this cart");
        return;
      }
    }

    const html = `
    <div class="cart-content">
      <div class="cart-box">
        <img src="${productImg}" alt="" class="cart-product-img">
        <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity">
        </div>
      <!-- Remove Cart -->
        <i class='bx bxs-trash-alt cart-remove'></i>

      </div>
    </div>`;
    cartProducts.insertAdjacentHTML("afterbegin", html);
    cartProducts
      .getElementsByClassName("cart-remove")[0]
      .addEventListener("click", removeCartItem);

    cartProducts
      .getElementsByClassName("cart-quantity")[0]
      .addEventListener("change", quantityChanged);

    function displayCartNum() {
      const cartItems = document.querySelectorAll(".cart-product-img");
      const numOfItems = cartItems.length;
      console.log(numOfItems);
      document.querySelector(".cart-num").textContent = numOfItems;
    }

    displayCartNum();
  }

  //Update Total
  function updateTotal() {
    const cartContent = document.getElementsByClassName("cart-content")[0];
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach((box) => {
      const priceEl = box.getElementsByClassName("cart-price")[0];
      const quantityEl = box.getElementsByClassName("cart-quantity")[0];
      const price = parseFloat(priceEl.innerText.replace("$", ""));
      const quantity = quantityEl.value;
      total = total + price * quantity;
    });

    document.getElementsByClassName("total-price")[0].innerText =
      "$" + total.toFixed(2);
  }

  //User Log In
  function usersLog() {
    const inputFirstName = document.querySelector(".input__first--name");
    const inputLastName = document.querySelector(".input__last--name");
    const inputGender = document.querySelector(".form__input--gender");
    const btnLogIn = document.getElementById("btn-login");
    const btnText = document.querySelector(".login-text");
    const users = data.users;

    let currentUser;

    function userLoggedIn(e) {
      e.preventDefault();
      currentUser = users.find(
        (user) =>
          user.familyName.toLowerCase() === inputLastName.value.toLowerCase() &&
          user.givenName.toLowerCase() === inputFirstName.value.toLowerCase() &&
          user.gender === inputGender.value
      );

      if (!currentUser) return;
      setTimeout(function () {
        modalHeader.textContent = "You are logged in! 🎉";
        modalForm.style.display = "none";
      }, 600);

      closeModal();
      btnText.textContent = `Welcome Back, ${currentUser.givenName}`;
      btnText.style.borderRadius = "5px";

      const randomNumArr = generateRandomNumbers(veges, 5);
      randomNumArr.forEach((num) => {
        const randomProduct = veges[num];
        addProductToCart(
          randomProduct.name,
          randomProduct.price.toFixed(2) + "$",
          randomProduct.image
        );
        updateTotal();
      });
    }

    btnLogIn.addEventListener("click", userLoggedIn);

    function generateRandomNumbers(arr, length) {
      const numbers = [];
      while (numbers.length < length) {
        const randomNumber = Math.floor(Math.random() * arr.length); // Generates a random number between 0 and 29
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber);
        }
      }
      return numbers;
    }
  }

  usersLog();

  //Search Products
  // function search() {
  //   const searchbox = document
  //     .getElementById("search-item")
  //     .value.toUpperCase();

  //   const items = document.querySelector(".product-list-container");
  //   const products = document.querySelectorAll(".card");
  //   const pName = items.querySelectorAll(".card-title");

  //   for (let i = 0; i < pName.length; i++) {
  //     let match = products[i].closest(".card-title");

  //     if (match) {
  //       let textValue = match.textContent || match.innerHTML;

  //       if (textValue.toUpperCase().indexOf(searchbox) > -1) {
  //         products[i].style.display = "";
  //       } else {
  //         products[i].style.display = "none";
  //       }
  //     }
  //   }
  // }

  // const searchForm = document.querySelector(".search-form");
  // searchForm.addEventListener("keydown", search);
}
//Shopping cart in the products card
//   function renderQualityInput() {
//     const productListContainer = document.querySelector(
//       ".product-list-container"
//     );

//     productListContainer.addEventListener("click", function (event) {
//       if (event.target.closest(".product-cart-btn")) {
//         const btnCart = event.target.closest("#cart-button");
//         const card = event.target.closest(".shopping--btns");
//         const quantityContainer = card.querySelector(".quantity-container");
//         const btnDecrease = quantityContainer.querySelector(".decrease-btn");
//         const btnIncrease = quantityContainer.querySelector(".increase-btn");
//         const quantityInput =
//           quantityContainer.querySelector("#quantityInput");

//         btnCart.classList.add("display-none");
//         quantityContainer.classList.remove("display-none");
//         quantityInput.value = 1;

//         let quantity = +quantityInput.value;
//         function decreaseQuantity() {
//           if (quantity > 0) {
//             quantity--;
//             if (quantity === 0) {
//               setTimeout(function () {
//                 quantityContainer.classList.add("display-none");
//                 btnCart.classList.remove("display-none");
//               }, 300);
//             }
//           }

//           quantityInput.value = quantity;
//         }

//         function increaseQuantity() {
//           quantity++;
//           quantityInput.value = quantity;
//         }

//         btnDecrease.addEventListener("click", decreaseQuantity);
//         btnIncrease.addEventListener("click", increaseQuantity);

//         // function displayProductNum() {
//         //   const input1 = document.getElementsByClassName("cart-quantity")[0];
//         //   const input2 = quantityInput;
//         //   console.log(input1, input2);
//         // }

//         // displayProductNum();
//       }
//     });
//   }

//   renderQualityInput();
// }
// }

const setUpPage = async () => {
  const data = await getData(url);
  await setUpUserPage(data);

  return data;
};

setUpPage().then();

//What is left

//1) search
//2) responsive
//3) prettier
//4) report
