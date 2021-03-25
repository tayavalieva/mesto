let popup = document.querySelector(".popup-edit");
let popupAddPhoto = document.querySelector(".popup-add-photo");
console.log(popup);

console.log(popupAddPhoto);

let openPopupButton = document.querySelector(".profile__edit-button");
const openAddPhotoPopupButton = document.querySelector(".profile__add-button");

let closePopupButton = document.querySelector(".popup__close-button");
const closePopupAddPhotoButton = document.querySelector(
  ".popup-add-photo-close"
);
let popupOverlay = document.querySelector(".popup__overlay");
let formElement = document.querySelector(".popup__form");

//current values
let currentName = document.querySelector(".profile__header");
let currentJob = document.querySelector(".profile__caption");

//input elements
let nameInput = document.querySelector(".popup__input_type_name");
let jobInput = document.querySelector(".popup__input_type_job");

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopup() {
  popup.classList.add("popup_opened");
  //fill popup form inputs with current values
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}

function openPopupAddPhoto() {
  popupAddPhoto.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function closePopupAddPhoto() {
  popupAddPhoto.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup();
}

openPopupButton.addEventListener("click", openPopup);
openAddPhotoPopupButton.addEventListener("click", openPopupAddPhoto);
closePopupButton.addEventListener("click", closePopup);
closePopupAddPhotoButton.addEventListener("click", closePopupAddPhoto);
popupOverlay.addEventListener("click", closePopup);
formElement.addEventListener("submit", formSubmitHandler);
