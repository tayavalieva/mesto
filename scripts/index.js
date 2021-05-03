import { initialCards } from "./initial-сards.js";
import { Card } from "./card.js";
import { SELECTORS } from "./selectors.js";
import { FormValidator } from "./FormValidator.js";

//popups
const popupEditProfile = document.querySelector(".popup-edit");
const popupAddPhoto = document.querySelector(".popup-add-photo");
export const popupImage = document.querySelector(".popup-image");

const openPopupEditButton = document.querySelector(".profile__edit-button");
const openAddPhotoPopupButton = document.querySelector(".profile__add-button");

const closePopupButton = popupEditProfile.querySelector(".popup__close-button");
const closePopupAddPhotoButton = popupAddPhoto.querySelector(
  ".popup__close-button"
);
const closePopupImageButton = popupImage.querySelector(".popup__close-button");

const formElement = document.querySelector(".popup__form");
const elementsList = document.querySelector(".elements");

//current values
const currentName = document.querySelector(".profile__header");
const currentJob = document.querySelector(".profile__caption");
//input elements
const nameInput = document.querySelector(".popup__input_type_name");

const jobInput = document.querySelector(".popup__input_type_job");

//popup image
const addPhotoForm = popupAddPhoto.querySelector(".popup__form");
const addPhotoInputTitle = addPhotoForm.querySelector(
  ".popup__input_type_place"
);
const addPhotoInputLink = addPhotoForm.querySelector(".popup__input_type_link");

export const popupImg = popupImage.querySelector(".popup-image__image");
export const popupImgCaption = popupImage.querySelector(
  ".popup-image__caption"
);

const CARD_TEMPLATE_SELECTOR = "card-template";

const addPhotoFormHandler = (e) => {
  e.preventDefault();

  const card = new Card(
    addPhotoInputLink.value,
    addPhotoInputTitle.value,
    CARD_TEMPLATE_SELECTOR
  );
  const cardElement = card.generateCard();
  elementsList.prepend(cardElement);

  closePopup(popupAddPhoto);
};

addPhotoForm.addEventListener("submit", addPhotoFormHandler);

const activeEscHandler = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) closePopup(openedPopup);
  }
};

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", activeEscHandler);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", activeEscHandler);
}

function formEditSubmitHandler(e) {
  e.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

formElement.addEventListener("submit", formEditSubmitHandler);

openPopupEditButton.addEventListener("click", () => {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
  nameInput.dispatchEvent(new CustomEvent("input"));
  jobInput.dispatchEvent(new CustomEvent("input"));
  openPopup(popupEditProfile);
});

openAddPhotoPopupButton.addEventListener("click", () => {
  addPhotoInputTitle.value = "";
  addPhotoInputLink.value = "";
  addPhotoInputTitle.dispatchEvent(new CustomEvent("input"));
  addPhotoInputLink.dispatchEvent(new CustomEvent("input"));
  openPopup(popupAddPhoto);
});

//Overlay click closes popup
document.querySelectorAll(".popup").forEach((popup) => {
  popup
    .querySelector(".popup__overlay")
    .addEventListener("click", () => closePopup(popup));
});

closePopupButton.addEventListener("click", () => closePopup(popupEditProfile));

closePopupAddPhotoButton.addEventListener("click", () =>
  closePopup(popupAddPhoto)
);

closePopupImageButton.addEventListener("click", () => closePopup(popupImage));

const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((form) => {
    const formValidator = new FormValidator(selectors, form);
    formValidator.enableValidation();
  });
};

enableValidation(SELECTORS);

initialCards.forEach((item) => {
  const card = new Card(item.image, item.name, CARD_TEMPLATE_SELECTOR);
  const cardElement = card.generateCard();
  elementsList.prepend(cardElement);
});
