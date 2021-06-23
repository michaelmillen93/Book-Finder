"use strict";

///API KEY/URL PATH/ELEMENT SELECTORS
const URL_PATH = "https://openlibrary.org/search.json?";

const btnSearch = document.getElementById("btnSearch");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const searchForm = document.getElementById("search-form");

///FUNCTIONS

//Fetch book data from api based on search term
const searchBooks = async function (term) {
  try {
    const res = await fetch(`${URL_PATH}q=${term}`);
    const data = await res.json();

    displayData(data);
  } catch (err) {
    console.error(err);
  }
};

//Function to add list of data to DOM
const displayData = function (data) {
  resultsContainer.innerHTML = `
  <ul class="results">
  ${data.docs
    .map(
      (title) => `
  <li class="results-result"><span><strong>${title.title}</strong> - ${
        title.author_name ? title.author_name?.[0] : "N/A"
      }</span> | ${title.publish_date?.[0]}</li>
  `
    )
    .join("")}
  </ul>
  `;
};

///EVENT LISTENERS
btnSearch.addEventListener("click", (e) => {
  e.preventDefault();

  const input = searchInput.value.trim();

  if (!input) return;
  searchBooks(input);
});
