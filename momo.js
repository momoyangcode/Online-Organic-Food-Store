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
// Modal window
const modal = document.querySelector(".modal");
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

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

let url = "https://my-json-server.typicode.com/mrkiley/cwb2023-onlineshop/db";

const productsBox = document.querySelector(".products");

const getData = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  }
  return res;
};

////////////////////////////////////////

async function setUpProductsCardForData(data) {
  const products = data.products;
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
            <button class ="btn btn-heart">
              <img class="heart-img product-like-btn" src="images/favorite.png" alt="heart image">
            </button>

            
              <button class ="btn btn-addtocart cart-container" id="cart-button" >
              <img class="cart-img product-cart-btn" src="images/shopping-cart.png" alt="shopping cart image">
              </button>
            
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
  // console.log(products, users);;
}

async function usersLog(data) {
  const inputFirstName = document.querySelector(".input__first--name");
  const inputLastName = document.querySelector(".input__last--name");
  const inputGender = document.querySelector(".form__input--gender");
  const btnLogIn = document.getElementById("btn-login");
  const btnText = document.querySelector(".login-text");

  const users = data.users;

  btnLogIn.addEventListener("click", function (e) {
    e.preventDefault();
    let currentUser = users.find(
      (user) =>
        user.familyName.toLowerCase() === inputLastName.value.toLowerCase() &&
        user.givenName.toLowerCase() === inputFirstName.value.toLowerCase() &&
        user.gender === inputGender.value
    );

    if (!currentUser) return;

    console.log(currentUser);

    closeModal();
    btnText.textContent = `Welcome Back, ${currentUser.givenName}`;
    btnText.style.borderRadius = "5px";
  });
}

const setUpPage = async () => {
  const data = await getData(url);
  await setUpProductsCardForData(data);
  await usersLog(data);

  return data;
};

setUpPage().then();
