"use strict";

// //  ••• 👾 Selected Elements
const countriesContainer = document.querySelector(".countries");
const btn = document.querySelector(".btn-country");
const btnSearchCountry = document.querySelector(".btn--search_country");
const inputSearchCountry = document.querySelector("#input--search_country");
const btnDeleteCountry = document.querySelectorAll(
  "button.btn--delete_country"
);
const countryCard = document.querySelectorAll(".country");

const getCountryData = function (country) {
  let url = `https://countries-api-836d.onrender.com/countries/name/${country}`;

  const request = new XMLHttpRequest();

  request.open("GET", url);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);

    console.log(data);

    const html = `
          <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.subregion}</h4>
            <p class="country__row"><span>👫</span>${(
              data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row" style="white-space: nowrap;"><span>💰</span>${
              data.currencies[0].name
            } (${data.currencies[0].symbol})</p><br />
            <button class="btn--delete_country"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);

    countriesContainer.style.opacity = 1;
  });
};

//  ••• 📑 Search Conditions:
const searchConditions = function () {
  if (inputSearchCountry.value !== "" && inputSearchCountry.value.length >= 2) {
    getCountryData(inputSearchCountry.value);
  } else {
    alert("Must fill in a proper country name");
  }
  console.log(inputSearchCountry.value);
  console.log(inputSearchCountry.value.length);

  inputSearchCountry.value = "";
  updatePlaceholder();
  inputPlaceholder.style.opacity = "1";
};

//  ••• 📑 Search Functionality Handler:
btnSearchCountry.addEventListener("click", searchConditions);

inputSearchCountry.addEventListener("keydown", function (event) {
  if (event.key === "Enter") searchConditions();
});

//  ••• 📑 Delete Button Handler:
countriesContainer.addEventListener("click", function (e) {
  const targetedCard = e.target.closest(".country");
  const btn = e.target.closest(".btn--delete_country");
  if (!btn) return;
  if (btn) {
    targetedCard.classList.add("fade-out");
    setTimeout(function () {
      targetedCard.remove();
    }, 500);
  }
});

//  ••• 📑 Placeholder Handler:
const inputPlaceholder = document.querySelector("#input--search_country");
const placeholderText = "EX: Israel or ISR";
let placeholderIndex = 0;
let animationTimeout;
let animationRunning = true;

function updatePlaceholder() {
  inputPlaceholder.setAttribute(
    "placeholder",
    placeholderText.substring(0, placeholderIndex)
  );

  placeholderIndex++;
  if (placeholderIndex > placeholderText.length) {
    placeholderIndex = 0;
  }
  inputPlaceholder.style.fontSize = "2.3em";
  inputPlaceholder.style.opacity = "0.8";
  inputPlaceholder.style.fontStyle = "italic";
  animationTimeout = setTimeout(updatePlaceholder, 480);
}

inputPlaceholder.addEventListener("click", () => {
  clearTimeout(animationTimeout);
  inputPlaceholder.setAttribute("placeholder", "");
  inputPlaceholder.style.fontStyle = "normal";
  inputPlaceholder.style.opacity = "1";
});

updatePlaceholder();
