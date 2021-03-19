let popup = document.querySelector(".popup");

let openPopupButton = document.querySelector(".profile__edit-button");
let closePopupButton = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".popup__form");

//current values
let currentName = document.querySelector(".profile__header");
let currentJob = document.querySelector(".profile__caption");

//input elements
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");

function openPopup() {
  popup.classList.add("popup_opened");
  //fill popup form inputs with current values
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup();
}

openPopupButton.addEventListener("click", openPopup);
closePopupButton.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
