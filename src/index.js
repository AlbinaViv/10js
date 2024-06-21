import Notiflix from "notiflix";

import { fetchBreeds, fetchCatByBreed } from "./api-key";

const selectEl = document.querySelector("#selectElement");
const loaderEl = document.querySelector(".loaderr");
const catInfo = document.querySelector(".cat-info");

fetchBreeds()
  .then((res) => {
    optionMarkup(res.data);
    selectEl.removeAttribute("hidden");
  })
  .catch((err) => Notiflix.Notify.warning(err.messege))
  .finally(() => loaderEl.classList.add("is-hidden"));

function optionMarkup(data) {
  const optionsArr = data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join("");
  selectEl.insertAdjacentHTML("beforeend", optionsArr);
}

selectEl.addEventListener("change", getInfo);

// fetchCatByBreed(id)
//   .than(({ id }) => console.log(id))
//   .catch((err) => err.messege);

function getInfo(e) {
  loaderEl.classList.remove("is-hidden");
  catInfo.innerHTML = "";

  fetchCatByBreed(e.target.value)
    .then((res) => markupCatInfo(res.data))
    .catch((error) => {
      Notiflix.Notify.failure(
        "Oops! Something went wrong! Try reloading the page!"
      );
      selectEl.setAttribute("hidden", true);
    })
    .finally(() => {
      loaderEl.classList.add("is-hidden");
    });
}

function markupCatInfo(data) {
  const { url } = data[0];
  const { name, description, temperament } = data[0].breeds[0];
  const catInfoMarkup = `<img class="cat-info" src="${url}" alt="${name}" width="300" height="200"/> <div class="container"><h1>${name}</h1><p>${description}</p><p><b>Temperament: </b>${temperament}</p></div>`;
  catInfo.innerHTML = catInfoMarkup;
}
